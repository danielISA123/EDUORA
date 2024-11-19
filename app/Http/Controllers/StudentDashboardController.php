<?php

namespace App\Http\Controllers;

use App\Models\Offering;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class StudentDashboardController extends Controller
{
    public function index(Request $request)
    {
        try {
            $user = $request->user();
            
            if (!$user) {
                throw new \Exception('User not authenticated');
            }

            // Get cached stats or calculate new ones with error handling
            $stats = Cache::remember("student.dashboard.{$user->id}", 300, function () use ($user) {
                $stats = [
                    'totalAssignments' => 0,
                    'activeTasks' => 0,
                    'completedTasks' => 0,
                    'totalSpent' => 0,
                    'activeOfferings' => [],
                    'recentActivities' => [],
                    'recentMessages' => []
                ];

                if (method_exists($user, 'offerings')) {
                    $stats['totalAssignments'] = $user->offerings()->count() ?? 0;
                    $stats['activeTasks'] = $user->offerings()
                        ->whereIn('status', ['pending', 'accepted'])
                        ->count() ?? 0;
                    $stats['completedTasks'] = $user->offerings()
                        ->where('status', 'completed')
                        ->count() ?? 0;
                    $stats['totalSpent'] = $user->offerings()
                        ->where('status', 'completed')
                        ->sum('budget') ?? 0;

                    // Active Offerings with Progress
                    $stats['activeOfferings'] = $user->offerings()
                        ->whereIn('status', ['pending', 'accepted'])
                        ->with(['tutor:id,name', 'messages'])
                        ->latest()
                        ->take(4)
                        ->get()
                        ->map(function ($offering) {
                            return [
                                'id' => $offering->id,
                                'title' => $offering->title,
                                'status' => $offering->status,
                                'deadline' => $offering->deadline,
                                'progress' => $this->calculateProgress($offering),
                                'tutor' => $offering->tutor,
                                'budget' => $offering->budget,
                                'is_overdue' => Carbon::parse($offering->deadline)->isPast(),
                                'messages_count' => $offering->messages->count(),
                                'last_activity' => $offering->last_activity_at ?? $offering->updated_at
                            ];
                        });

                    // Enhanced Recent Activities
                    $stats['recentActivities'] = $this->getEnhancedActivities($user);
                }

                // Recent Messages with Preview - only if Message model exists
                if (class_exists('App\Models\Message')) {
                    $stats['recentMessages'] = Message::where(function($query) use ($user) {
                        $query->where('sender_id', $user->id)
                            ->orWhere('receiver_id', $user->id);
                    })
                    ->with(['sender:id,name', 'offering:id,title'])
                    ->latest()
                    ->take(5)
                    ->get()
                    ->map(function ($message) {
                        return [
                            'id' => $message->id,
                            'content' => Str::limit($message->content, 100),
                            'sender' => $message->sender,
                            'offering' => $message->offering,
                            'created_at' => $message->created_at,
                            'is_read' => !is_null($message->read_at)
                        ];
                    });
                }

                return $stats;
            });

            return Inertia::render('Dashboard/Student', [
                'stats' => $stats
            ]);

        } catch (\Exception $e) {
            Log::error('Error in StudentDashboardController@index: ' . $e->getMessage());
            
            // Return basic dashboard with empty stats
            return Inertia::render('Dashboard/Student', [
                'stats' => [
                    'totalAssignments' => 0,
                    'activeTasks' => 0,
                    'completedTasks' => 0,
                    'totalSpent' => 0,
                    'activeOfferings' => [],
                    'recentActivities' => [],
                    'recentMessages' => []
                ]
            ]);
        }
    }

    private function calculateProgress(Offering $offering)
    {
        try {
            $progress = 0;
            
            if ($offering->status === 'completed') {
                return 100;
            }

            if ($offering->status === 'accepted') {
                $progress += 40; // Base progress for accepted status
                
                // Add progress based on messages/activity
                $messagesCount = $offering->messages->count();
                $progress += min($messagesCount * 5, 30); // Up to 30% based on communication
                
                // Consider time progress
                $totalDuration = Carbon::parse($offering->created_at)->diffInHours($offering->deadline);
                $elapsed = Carbon::parse($offering->created_at)->diffInHours(now());
                $timeProgress = min(($elapsed / $totalDuration) * 30, 30); // Up to 30% based on time
                
                $progress += $timeProgress;
            } else {
                // Pending status
                $progress = 20; // Base progress for creation
            }

            return min(round($progress), 99); // Never show 100% unless completed

        } catch (\Exception $e) {
            Log::error('Error in calculateProgress: ' . $e->getMessage());
            return 0;
        }
    }

    private function getEnhancedActivities($user)
    {
        try {
            $activities = [];
            
            // Get recent offerings with enhanced details
            $recentOfferings = $user->offerings()
                ->with(['tutor:id,name', 'messages'])
                ->latest()
                ->take(5)
                ->get();

            foreach ($recentOfferings as $offering) {
                $activities[] = [
                    'id' => 'offering_'.$offering->id,
                    'type' => 'offering_created',
                    'message' => "Created new offering: {$offering->title}",
                    'details' => [
                        'budget' => $offering->budget,
                        'deadline' => $offering->deadline,
                    ],
                    'created_at' => $offering->created_at
                ];

                if ($offering->status === 'accepted') {
                    $activities[] = [
                        'id' => 'accepted_'.$offering->id,
                        'type' => 'offering_accepted',
                        'message' => "Offering '{$offering->title}' was accepted by {$offering->tutor->name}",
                        'details' => [
                            'tutor' => $offering->tutor->only(['id', 'name']),
                            'accepted_at' => $offering->updated_at
                        ],
                        'created_at' => $offering->updated_at
                    ];
                }

                if ($offering->status === 'completed') {
                    $activities[] = [
                        'id' => 'completed_'.$offering->id,
                        'type' => 'payment_made',
                        'message' => "Payment made for '{$offering->title}'",
                        'details' => [
                            'amount' => $offering->budget,
                            'completed_at' => $offering->updated_at
                        ],
                        'created_at' => $offering->updated_at
                    ];
                }

                // Add significant message activities
                $significantMessages = $offering->messages()
                    ->where('created_at', '>', now()->subDays(7))
                    ->whereRaw('LENGTH(content) > ?', [100])
                    ->limit(2)
                    ->get();

                foreach ($significantMessages as $message) {
                    $activities[] = [
                        'id' => 'message_'.$message->id,
                        'type' => 'significant_update',
                        'message' => "New update on '{$offering->title}'",
                        'details' => [
                            'preview' => Str::limit($message->content, 100),
                            'from' => $message->sender->name
                        ],
                        'created_at' => $message->created_at
                    ];
                }
            }

            // Sort activities by created_at and take most recent
            return collect($activities)
                ->sortByDesc('created_at')
                ->take(10)
                ->values()
                ->all();

        } catch (\Exception $e) {
            Log::error('Error in getEnhancedActivities: ' . $e->getMessage());
            return [];
        }
    }
}