import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { motion } from 'framer-motion';
import OfferingFeed from '@/Components/OfferingFeed';
import { 
    BookOpen, 
    Clock, 
    CheckCircle, 
    DollarSign,
    Plus,
    Search,
    MessageCircle,
    History 
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import ProgressTracker from '@/Components/ProgressTracker';
import { useToast } from '@/Hooks/useToast';

export default function Student({ auth, stats }) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState(stats);
    const [isConnected, setIsConnected] = useState(true);
    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 5;

    useEffect(() => {
        // Initial loading simulation
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Real-time updates setup
        const channel = window.Echo.private(`student.${auth.user.id}`)
            .listen('.dashboard.updated', (e) => {
                switch (e.type) {
                    case 'offering_updated':
                        setDashboardStats(prevStats => ({
                            ...prevStats,
                            activeOfferings: prevStats.activeOfferings.map(offering =>
                                offering.id === e.data.offering_id
                                    ? { ...offering, ...e.data.updates }
                                    : offering
                            )
                        }));
                        break;
                        
                    case 'new_message':
                        setDashboardStats(prevStats => ({
                            ...prevStats,
                            recentMessages: [e.data.message, ...prevStats.recentMessages].slice(0, 5)
                        }));
                        break;
                        
                    case 'new_activity':
                        setDashboardStats(prevStats => ({
                            ...prevStats,
                            recentActivities: [e.data.activity, ...prevStats.recentActivities].slice(0, 10)
                        }));
                        break;
                        
                    case 'stats_updated':
                        setDashboardStats(prevStats => ({
                            ...prevStats,
                            ...e.data.stats
                        }));
                        break;
                }
            })
            .subscribed(() => {
                setIsConnected(true);
                toast({
                    title: "Connected",
                    description: "Real-time updates enabled",
                    variant: "success"
                });
            })
            .error(() => {
                setIsConnected(false);
                if (retryCount < maxRetries) {
                    setRetryCount(prev => prev + 1);
                    toast({
                        title: "Connection Error",
                        description: "Attempting to reconnect...",
                        variant: "warning"
                    });
                } else {
                    toast({
                        title: "Connection Failed",
                        description: "Please refresh the page",
                        variant: "destructive"
                    });
                }
            });

        return () => {
            channel.stopListening('.dashboard.updated');
        };
    }, [auth.user.id, retryCount, toast]);

  // Loading skeleton component
    if (isLoading) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Quick Stats Loading */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>

                        {/* Active Offerings Loading */}
                        <div className="mb-8">
                            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // Main content
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Connection Status Indicator */}
                    {!isConnected && (
                        <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                            Connection issues detected. Some features may be limited.
                        </div>
                    )}

                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {auth.user.name}!
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Here's what's happening with your learning activities.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Assignments</p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {dashboardStats?.totalAssignments || 0}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <BookOpen className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Active Tasks</p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {dashboardStats?.activeTasks || 0}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-yellow-100 rounded-full">
                                        <Clock className="w-6 h-6 text-yellow-600" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Completed</p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {dashboardStats?.completedTasks || 0}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Spent</p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            Rp {dashboardStats?.totalSpent?.toLocaleString() || '0'}
                                        </h3>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-full">
                                        <DollarSign className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    >
                        <QuickActionButton
                            icon={Plus}
                            label="New Assignment"
                            href="/offerings/create"
                            bgColor="bg-blue-500"
                        />
                        <QuickActionButton
                            icon={Search}
                            label="Find Tutor"
                            href="/tutors"
                            bgColor="bg-purple-500"
                        />
                        <QuickActionButton
                            icon={MessageCircle}
                            label="Messages"
                            href="/messages"
                            bgColor="bg-green-500"
                        />
                        <QuickActionButton
                            icon={History}
                            label="History"
                            href="/history"
                            bgColor="bg-orange-500"
                        />
                    </motion.div>

                    {/* Progress Tracking Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Progress Tracker - 2 columns */}
                        <div className="md:col-span-2">
                            <ProgressTracker 
                                assignments={dashboardStats.activeOfferings || []}
                            />
                        </div>

                        {/* Recent Activities - 1 column */}
                        <div>
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
                                <div className="space-y-4">
                                    {dashboardStats.recentActivities?.map((activity, index) => (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start space-x-3"
                                        >
                                            <div className={`p-2 rounded-full ${
                                                activity.type === 'offering_created' ? 'bg-blue-100 text-blue-600' :
                                                activity.type === 'offering_accepted' ? 'bg-green-100 text-green-600' :
                                                activity.type === 'payment_made' ? 'bg-purple-100 text-purple-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                {activity.type === 'offering_created' && <Plus className="w-4 h-4" />}
                                                {activity.type === 'offering_accepted' && <CheckCircle className="w-4 h-4" />}
                                                {activity.type === 'payment_made' && <DollarSign className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-900">{activity.message}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(activity.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Active Offerings Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mb-8"
                    >
                        <h2 className="text-2xl font-semibold mb-4">Active Offerings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {dashboardStats?.activeOfferings?.map((offering) => (
                                <Card key={offering.id} className="hover:shadow-lg transition-shadow">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-lg font-semibold">
                                                <Link 
                                                    href={`/offerings/${offering.id}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {offering.title}
                                                </Link>
                                            </h3>
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                offering.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                offering.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {offering.status.charAt(0).toUpperCase() + offering.status.slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{offering.description}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <span className="flex items-center text-sm text-gray-500">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {formatDistance(new Date(offering.deadline), new Date(), { addSuffix: true })}
                                                </span>
                                                <span className="flex items-center text-sm text-gray-500">
                                                    <DollarSign className="w-4 h-4 mr-1" />
                                                    Rp {offering.budget.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {(!dashboardStats?.activeOfferings || dashboardStats.activeOfferings.length === 0) && (
                                <div className="col-span-2 text-center py-8">
                                    <p className="text-gray-500">No active offerings yet.</p>
                                    <Link
                                        href="/offerings/create"
                                        className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                                    >
                                        Create your first offering
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Recent Activities & Messages Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Recent Activities */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="md:col-span-2"
                        >
                            <Card className="h-full">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
                                    <div className="space-y-6">
                                        {dashboardStats?.recentActivities?.map((activity, index) => (
                                            <div key={activity.id} className="flex items-start">
                                                <div className={`p-2 rounded-full mr-4 ${
                                                    activity.type === 'offering_created' ? 'bg-blue-100 text-blue-600' :
                                                    activity.type === 'offering_accepted' ? 'bg-green-100 text-green-600' :
                                                    activity.type === 'payment_made' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {activity.type === 'offering_created' && <Plus className="w-5 h-5" />}
                                                    {activity.type === 'offering_accepted' && <CheckCircle className="w-5 h-5" />}
                                                    {activity.type === 'payment_made' && <DollarSign className="w-5 h-5" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-800">{activity.message}</p>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {formatDistance(new Date(activity.created_at), new Date(), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {(!dashboardStats?.recentActivities || dashboardStats.recentActivities.length === 0) && (
                                            <div className="text-center py-4">
                                                <p className="text-gray-500">No recent activities</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                        
                        {/* Messages Preview */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            <Card className="h-full">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-semibold">Messages</h2>
                                        <Link 
                                            href="/messages" 
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                        >
                                            View all
                                        </Link>
                                    </div>
                                    <div className="space-y-4">
                                        {dashboardStats?.recentMessages?.map((message) => (
                                            <div key={message.id} className="flex items-start">
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <span className="text-gray-600 font-medium">
                                                            {message.sender.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {message.sender.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 line-clamp-1">
                                                        {message.content}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {formatDistance(new Date(message.created_at), new Date(), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        {(!dashboardStats?.recentMessages || dashboardStats.recentMessages.length === 0) && (
                                            <div className="text-center py-4">
                                                <p className="text-gray-500">No messages yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Live Offerings Section */}
                        <div className="mt-8">
                            <Card className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Live Offerings</h2>
                                    <Link 
                                        href="/offerings"
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        View All
                                    </Link>
                                </div>
                                <OfferingFeed initialOfferings={dashboardStats.activeOfferings} />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Quick Action Button Component
function QuickActionButton({ icon: Icon, label, href, bgColor }) {
    return (
        <Link
            href={href}
            className={`${bgColor} text-white p-4 rounded-lg hover:opacity-90 transition-opacity`}
        >
            <div className="flex items-center space-x-3">
                <Icon className="w-6 h-6" />
                <span className="font-medium">{label}</span>
            </div>
        </Link>
    );
}
