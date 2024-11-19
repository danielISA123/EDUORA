import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/Components/ui/card';
import { DollarSign, Users, BookOpen, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ auth, stats, activeOfferings }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl">Tutor Dashboard</h2>}
        >
            <Head title="Tutor Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Earnings</p>
                                    <p className="text-2xl font-bold mt-1">Rp {stats.totalEarnings.toLocaleString()}</p>
                                </div>
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">+{stats.monthlyEarnings}% vs last month</p>
                        </Card>

                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Students Helped</p>
                                    <p className="text-2xl font-bold mt-1">{stats.studentsHelped}</p>
                                </div>
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Lifetime total</p>
                        </Card>

                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Completed Tasks</p>
                                    <p className="text-2xl font-bold mt-1">{stats.completedTasks}</p>
                                </div>
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <BookOpen className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{stats.completionRate}% completion rate</p>
                        </Card>

                        <Card className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Average Rating</p>
                                    <p className="text-2xl font-bold mt-1">{stats.averageRating}/5.0</p>
                                </div>
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Star className="w-6 h-6 text-yellow-600" />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">From {stats.totalReviews} reviews</p>
                        </Card>
                    </div>

                    {/* Active Offerings */}
                    <h3 className="text-lg font-semibold mb-4">Active Offerings</h3>
                    <div className="space-y-4">
                        {activeOfferings.map((offering) => (
                            <Card key={offering.id} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-semibold mb-2">{offering.title}</h4>
                                        <p className="text-gray-600 mb-4">{offering.description}</p>
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                Deadline: {new Date(offering.deadline).toLocaleDateString()}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                Budget: Rp {offering.budget.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        onClick={() => window.location.href = route('offerings.show', offering.id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </Card>
                        ))}
                        
                        {activeOfferings.length === 0 && (
                            <Card className="p-6 text-center text-gray-500">
                                No active offerings at the moment.
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}