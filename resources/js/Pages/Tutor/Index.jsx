import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    GraduationCap,
    Star,
    Clock,
    DollarSign
} from 'lucide-react';

export default function Index({ auth, tutors }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Available Tutors
                    </h2>
                    {auth.user.role === 'tutor' && !auth.user.tutorProfile && (
                        <Link href={route('tutors.create')}>
                            <Button>Register as Tutor</Button>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Tutors" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        {tutors.data.map((tutor) => (
                            <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        {tutor.student_card_url ? (
                                            <img
                                                src={tutor.student_card_url}
                                                alt={tutor.user.name}
                                                className="w-24 h-24 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                                <GraduationCap className="w-12 h-12 text-gray-400" />
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{tutor.user.name}</h3>
                                            <p className="text-gray-600">{tutor.expertise_level}</p>
                                            
                                            <div className="mt-2 grid grid-cols-2 gap-2">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <BookOpen className="w-4 h-4 mr-1" />
                                                    {tutor.subjects?.length || 0} Subjects
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                                                    {tutor.average_rating || 'No ratings'}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {tutor.completed_tasks} Tasks
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <DollarSign className="w-4 h-4 mr-1" />
                                                    Rp {tutor.hourly_rate?.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <Link 
                                            href={route('tutors.show', tutor.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Button variant="outline">View Profile</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}