<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\TutorController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OfferingsController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\TutorDashboardController;
use App\Http\Controllers\StudentDashboardController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

// Broadcasting Auth Route
Route::post('/broadcasting/auth', function (Request $request) {
    return Broadcast::auth($request);
});

// Welcome/Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => [
            'user' => auth()?->user()
        ],
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

// Public Pages (No Auth Required)
Route::controller(PageController::class)->group(function () {
    $publicPages = ['about', 'help', 'terms', 'privacy', 'faq', 'contact'];
    
    foreach ($publicPages as $page) {
        Route::get('/' . $page, function () use ($page) {
            $data = [
                'auth' => [
                    'user' => auth()?->user()
                ],
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
            ];

            // Add lastUpdated for specific pages
            if (in_array($page, ['terms', 'privacy'])) {
                $data['lastUpdated'] = '2024-11-19';
            }

            return Inertia::render("Pages/" . ucfirst($page), $data);
        })->name($page);
    }
});

// Become a Tutor (Public)
Route::get('/become-tutor', function () {
    return Inertia::render('Pages/BecomeTutor', [
        'auth' => [
            'user' => auth()?->user()
        ],
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('become-tutor');

// Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard Routes with Role-based Redirection
    Route::get('/dashboard', function (Request $request) {
        try {
            $user = $request->user();
            
            if (!$user) {
                return redirect('/login');
            }

            $defaultStats = [
                'totalAssignments' => 0,
                'activeTasks' => 0,
                'completedTasks' => 0,
                'totalSpent' => 0,
                'activeOfferings' => [],
                'recentActivities' => [],
                'recentMessages' => []
            ];

            switch ($user->role) {
                case 'student':
                    return redirect()->route('student.dashboard');
                case 'tutor':
                    return redirect()->route('tutor.dashboard');
                default:
                    return Inertia::render('Dashboard', [
                        'stats' => $defaultStats,
                        'auth' => ['user' => $user]
                    ]);
            }
        } catch (\Exception $e) {
            Log::error('Dashboard redirect error: ' . $e->getMessage());
            return redirect()->route('home')->with('error', 'Unable to access dashboard.');
        }
    })->name('dashboard');

    // Student Routes
    Route::group([
        'prefix' => 'student',
        'as' => 'student.',
        'middleware' => ['auth', 'verified', 'role:student']
    ], function () {
        Route::get('/dashboard', [StudentDashboardController::class, 'index'])
            ->name('dashboard');

        // Additional student routes
        Route::get('/assignments', [StudentDashboardController::class, 'assignments'])
            ->name('assignments');
    });

    // Tutor Routes
    Route::group([
        'prefix' => 'tutor',
        'as' => 'tutor.',
        'middleware' => ['auth', 'verified', 'role:tutor']
    ], function () {
        Route::get('/dashboard', [TutorDashboardController::class, 'index'])
            ->name('dashboard');
            
        // Additional tutor routes
        Route::get('/assignments', [TutorDashboardController::class, 'assignments'])
            ->name('assignments');
    });

    // Offerings Routes with Role Checks
    Route::prefix('offerings')->group(function () {
        // Public offering routes (accessible to all authenticated users)
        Route::controller(OfferingsController::class)->group(function () {
            Route::get('/', 'index')->name('offerings.index');
            Route::get('/{offering}', 'show')->name('offerings.show');
        });

        // Student-specific offering routes
        Route::middleware('role:student')->controller(OfferingsController::class)->group(function () {
            Route::get('/create', 'create')->name('offerings.create');
            Route::post('/', 'store')->name('offerings.store');
            Route::get('/{offering}/edit', 'edit')->name('offerings.edit');
            Route::put('/{offering}', 'update')->name('offerings.update');
            Route::delete('/{offering}', 'destroy')->name('offerings.destroy');
        });

        // Tutor-specific offering routes
        Route::middleware('role:tutor')->controller(OfferingsController::class)->group(function () {
            Route::post('/{offering}/accept', 'accept')->name('offerings.accept');
            Route::post('/{offering}/complete', 'complete')->name('offerings.complete');
        });
    });

    // Messages Routes with Better Organization
    Route::prefix('messages')->group(function () {
        Route::controller(MessagesController::class)->group(function () {
            // Basic message routes
            Route::get('/', 'index')->name('messages.index');
            Route::get('/unread', 'unread')->name('messages.unread');
            
            // Offering-specific messages
            Route::prefix('offering/{offering}')->group(function () {
                Route::get('/', 'offeringMessages')->name('messages.offering');
                Route::post('/', 'store')->name('messages.store');
                Route::get('/history', 'history')->name('messages.history');
            });

            // Message actions
            Route::post('{message}/read', 'markAsRead')->name('messages.markAsRead');
            Route::delete('{message}', 'destroy')->name('messages.destroy');
        });
    });

    // Notifications with Enhanced Features
    Route::prefix('notifications')->group(function () {
        Route::controller(NotificationController::class)->group(function () {
            // Basic notification routes
            Route::get('/', 'index')->name('notifications.index');
            Route::get('/unread', 'unread')->name('notifications.unread');
            
            // Notification actions
            Route::post('/{notification}/read', 'markAsRead')->name('notifications.markAsRead');
            Route::post('/read-all', 'markAllAsRead')->name('notifications.markAllAsRead');
            Route::delete('/{notification}', 'destroy')->name('notifications.destroy');
            
            // Notification preferences
            Route::get('/preferences', 'preferences')->name('notifications.preferences');
            Route::put('/preferences', 'updatePreferences')->name('notifications.preferences.update');
        });
    });

    // Support System Routes
    Route::prefix('support')->group(function () {
        Route::controller(SupportController::class)->group(function () {
            // Support pages
            Route::get('/payment', 'payment')->name('support.payment');
            Route::get('/safety', 'safety')->name('support.safety');
            Route::get('/report', 'report')->name('support.report');
            
            // Ticket system
            Route::get('/tickets', 'tickets')->name('support.tickets.index');
            Route::get('/tickets/create', 'createTicket')->name('support.tickets.create');
            Route::post('/tickets', 'storeTicket')->name('support.tickets.store');
            Route::get('/tickets/{ticket}', 'showTicket')->name('support.tickets.show');
            
            // Contact form
            Route::post('/contact', 'submitContactForm')->name('support.contact.submit');
            
            // FAQ and Knowledge Base
            Route::get('/faq/{category?}', 'faq')->name('support.faq');
            Route::get('/kb', 'knowledgeBase')->name('support.kb');
            Route::get('/kb/{article}', 'showArticle')->name('support.kb.article');
        });
    });

    // Profile Management Routes
    Route::prefix('profile')->group(function () {
        Route::controller(ProfileController::class)->group(function () {
            // Basic profile routes
            Route::get('/', 'edit')->name('profile.edit');
            Route::patch('/', 'update')->name('profile.update');
            Route::delete('/', 'destroy')->name('profile.destroy');
            
            // Advanced settings
            Route::get('/settings', 'settings')->name('profile.settings');
            Route::patch('/settings', 'updateSettings')->name('profile.settings.update');
            
            // Security settings
            Route::get('/security', 'security')->name('profile.security');
            Route::patch('/security', 'updateSecurity')->name('profile.security.update');
            Route::post('/2fa/enable', 'enable2FA')->name('profile.2fa.enable');
            Route::post('/2fa/disable', 'disable2FA')->name('profile.2fa.disable');
            
            // Notification preferences
            Route::get('/notifications', 'notificationPreferences')
                ->name('profile.notifications');
            Route::patch('/notifications', 'updateNotificationPreferences')
                ->name('profile.notifications.update');
        });
    });

    // User Profiles Management with Enhanced Security
    Route::prefix('profiles')->group(function () {
        Route::controller(UserProfileController::class)->group(function () {
            // Basic profile views
            Route::get('/', 'index')
                ->middleware('role:admin')
                ->name('profiles.index');
            Route::get('/{profile}', 'show')->name('profiles.show');
            
            // Profile management (Admin only)
            Route::middleware('role:admin')->group(function () {
                Route::post('/', 'store')->name('profiles.store');
                Route::put('/{profile}', 'update')->name('profiles.update');
                Route::delete('/{profile}', 'destroy')->name('profiles.destroy');
                Route::post('/{profile}/update-status', 'updateStatus')
                    ->name('profiles.update-status');
                Route::post('/{profile}/verify', 'verify')
                    ->name('profiles.verify');
            });
            
            // Profile actions (Owner or Admin)
            Route::middleware('can:manage,profile')->group(function () {
                Route::get('/{profile}/edit', 'edit')->name('profiles.edit');
                Route::put('/{profile}/settings', 'updateSettings')
                    ->name('profiles.settings.update');
            });
        });
    });

    // Tutor Management System
    Route::prefix('tutors')->group(function () {
        // Public tutor routes
        Route::controller(TutorController::class)->group(function () {
            Route::get('/', 'index')->name('tutors.index');
            Route::get('/{tutor}', 'show')->name('tutors.show');
            Route::get('/search', 'search')->name('tutors.search');
        });

        // Protected tutor routes
        Route::middleware('auth')->group(function () {
            Route::controller(TutorController::class)->group(function () {
                // Tutor registration
                Route::get('/register', 'create')->name('tutors.create');
                Route::post('/register', 'store')->name('tutors.store');
                
                // Tutor-specific routes
                Route::middleware('role:tutor')->group(function () {
                    Route::get('/dashboard', [TutorDashboardController::class, 'index'])
                        ->name('tutor.dashboard');
                    Route::get('/profile/edit', 'edit')->name('tutors.edit');
                    Route::put('/profile', 'update')->name('tutors.update');
                    Route::get('/earnings', 'earnings')->name('tutors.earnings');
                    Route::get('/schedule', 'schedule')->name('tutors.schedule');
                });
                
                // Admin-only routes
                Route::middleware('role:admin')->group(function () {
                    Route::get('/verification', 'verificationPage')
                        ->name('tutors.verification');
                    Route::put('/{tutor}/verify', 'verify')->name('tutors.verify');
                    Route::delete('/{tutor}', 'destroy')->name('tutors.destroy');
                    Route::get('/reports', 'reports')->name('tutors.reports');
                });
            });
        });
    });
});

// API Routes with Enhanced Security
Route::prefix('api')->middleware('auth:sanctum')->group(function () {
    // Broadcasting Authentication
    Route::post('/broadcasting/auth', function (Request $request) {
        try {
            return Broadcast::auth($request);
        } catch (\Exception $e) {
            Log::error('Broadcasting auth error: ' . $e->getMessage());
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    })->middleware('auth');

    // Real-time Updates
    Route::prefix('realtime')->group(function () {
        Route::post('/presence', function (Request $request) {
            return response()->json(['status' => 'connected']);
        });
        Route::post('/typing', function (Request $request) {
            broadcast(new UserTyping($request->user()))->toOthers();
            return response()->json(['status' => 'ok']);
        });
    });

    // API Resources
    Route::apiResources([
        'offerings' => OfferingsController::class,
        'messages' => MessagesController::class,
        'notifications' => NotificationController::class,
    ]);

    // Additional API Endpoints
    Route::get('/user/stats', [StudentDashboardController::class, 'stats']);
    Route::get('/tutor/stats', [TutorDashboardController::class, 'stats']);
});

// Error Handling Routes
Route::prefix('errors')->group(function () {
    Route::get('/403', function () {
        return Inertia::render('Errors/403', [
            'auth' => [
                'user' => auth()?->user()
            ]
        ]);
    })->name('error.403');

    Route::get('/404', function () {
        return Inertia::render('Errors/404', [
            'auth' => [
                'user' => auth()?->user()
            ]
        ]);
    })->name('error.404');

    Route::get('/500', function () {
        return Inertia::render('Errors/500', [
            'auth' => [
                'user' => auth()?->user()
            ]
        ]);
    })->name('error.500');
});

// Fallback Route with Enhanced Error Handling
Route::fallback(function (Request $request) {
    if ($request->expectsJson()) {
        return response()->json(['message' => 'Not Found'], 404);
    }

    return Inertia::render('Errors/404', [
        'auth' => [
            'user' => auth()?->user()
        ],
        'previousUrl' => url()->previous(),
        'currentUrl' => url()->current()
    ]);
});

// Include Authentication Routes
require __DIR__.'/auth.php';
