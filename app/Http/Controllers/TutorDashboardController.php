<?php

namespace App\Http\Controllers;

use App\Models\Offering;
use App\Models\TutorProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TutorDashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified', 'role:tutor']);
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $tutorProfile = $user->tutorProfile;

        // Get stats
        $stats = $this->getTutorStats($tutorProfile);

        // Get active offerings
        $activeOfferings = $this->getActiveOfferings($tutorProfile);

        return Inertia::render('Tutor/Dashboard', [
            'stats' => $stats,
            'activeOfferings' => $activeOfferings
        ]);
    }

    private function getTutorStats(TutorProfile $tutorProfile)
    {
        $currentMonth = now()->startOfMonth();
        $lastMonth = $currentMonth->copy()->subMonth();

        // Calculate monthly earnings
        $currentMonthEarnings = $tutorProfile->earnings()
            ->where('created_at', '>=', $currentMonth)
            ->sum('amount');

        $lastMonthEarnings = $tutorProfile->earnings()
            ->whereBetween('created_at', [$lastMonth, $currentMonth])
            ->sum('amount');

        $monthlyGrowth = $lastMonthEarnings > 0 
            ? (($currentMonthEarnings - $lastMonthEarnings) / $lastMonthEarnings) * 100 
            : 0;

        // Get completion stats
        $totalTasks = $tutorProfile->submissions()->count();
        $completedTasks = $tutorProfile->submissions()
            ->where('status', 'completed')
            ->count();

        return [
            'totalEarnings' => $tutorProfile->total_earnings,
            'monthlyEarnings' => round($monthlyGrowth, 1),
            'studentsHelped' => $tutorProfile->submissions()
                ->distinct('offering_id')
                ->count('user_id'),
            'completedTasks' => $completedTasks,
            'completionRate' => $totalTasks > 0 
                ? round(($completedTasks / $totalTasks) * 100, 1) 
                : 0,
            'averageRating' => round($tutorProfile->average_rating, 1),
            'totalReviews' => $tutorProfile->total_reviews
        ];
    }

    private function getActiveOfferings(TutorProfile $tutorProfile)
    {
        return Offering::whereIn('status', ['pending', 'open'])
            ->where(function ($query) use ($tutorProfile) {
                // Filter by tutor's subjects/expertise
                $query->whereJsonContains('subjects', $tutorProfile->subjects)
                    ->orWhere('expertise_level', '<=', $tutorProfile->expertise_level);
            })
            ->latest()
            ->take(5)
            ->get();
    }
}