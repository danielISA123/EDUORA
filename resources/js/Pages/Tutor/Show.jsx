import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import {
    BookOpen,
    GraduationCap,
    Star,
    Clock,
    DollarSign,
    FileText,
    Award,
    Calendar,
    CheckCircle,
    XCircle
} from 'lucide-react';

export default function Show({ auth, tutor }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tutor Profile
                    </h2>
                    {auth.user.id === tutor.user_id && (
                        <Link href={route('tutors.edit', tutor.id)}>
                            <Button variant="outline">Edit Profile</Button>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title={`${tutor.user.name} - Tutor Profile`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Left Column - Basic Info */}
                        <div className="space-y-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        {tutor.student_card_url ? (
                                            <img
                                                src={tutor.student_card_url}
                                                alt={tutor.user.name}
                                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                                                <GraduationCap className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}
                                        <h3 className="text-xl font-semibold">{tutor.user.name}</h3>
                                        <p className="text-gray-600">{tutor.expertise_level}</p>
                                        
                                        <div className="mt-4 flex justify-center items-center">
                                            <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                            <span className="font-medium">{tutor.average_rating || 'No ratings yet'}</span>
                                            <span className="text-gray-400 ml-1">({tutor.total_reviews} reviews)</span>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            <div className="text-center">
                                                <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                                                <p className="text-sm text-gray-600">{tutor.completed_tasks} Tasks</p>
                                            </div>
                                            <div className="text-center">
                                                <DollarSign className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                                                <p className="text-sm text-gray-600">Rp {tutor.hourly_rate?.toLocaleString()}/hr</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Verification Status */}
                            <Card>
                                <CardContent className="p-6">
                                    <h4 className="font-medium mb-4">Verification Status</h4>
                                    <div className="flex items-center">
                                        {tutor.is_verified ? (
                                            <>
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                                <div>
                                                    <p className="text-green-500 font-medium">Verified Tutor</p>
                                                    <p className="text-sm text-gray-600">
                                                        Verified on {new Date(tutor.verified_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-5 h-5 text-gray-400 mr-2" />
                                                <div>
                                                    <p className="text-gray-600 font-medium">
                                                        {tutor.verification_status.charAt(0).toUpperCase() + 
                                                        tutor.verification_status.slice(1)}
                                                    </p>
                                                    {tutor.verification_note && (
                                                        <p className="text-sm text-gray-600">{tutor.verification_note}</p>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Detailed Info */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Bio */}
                            <Card>
                                <CardContent className="p-6">
                                    <h4 className="font-medium mb-4">About Me</h4>
                                    <p className="text-gray-600 whitespace-pre-line">{tutor.bio}</p>
                                </CardContent>
                            </Card>

                            {/* Academic Background */}
                            <Card>
                                <CardContent className="p-6">
                                    <h4 className="font-medium mb-4">Academic Background</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">University</p>
                                            <p className="font-medium">{tutor.university}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Degree</p>
                                            <p className="font-medium">{tutor.degree}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Major</p>
                                            <p className="font-medium">{tutor.major}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">GPA</p>
                                            <p className="font-medium">{tutor.gpa}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Subjects & Teaching Preferences */}
                            <Card>
                                <CardContent className="p-6">
                                    <h4 className="font-medium mb-4">Teaching Details</h4>
                                    
                                    {/* Subjects */}
                                    <div className="mb-6">
                                        <h5 className="text-sm text-gray-600 mb-2">Subjects</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {tutor.subjects?.map((subject, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Teaching Preferences */}
                                    <div>
                                        <h5 className="text-sm text-gray-600 mb-2">Teaching Preferences</h5>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-sm font-medium">Mode</p>
                                                <ul className="text-sm text-gray-600">
                                                    {tutor.teaching_preferences?.mode?.map((mode, index) => (
                                                        <li key={index}>{mode}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Group Size</p>
                                                <ul className="text-sm text-gray-600">
                                                    {tutor.teaching_preferences?.group_size?.map((size, index) => (
                                                        <li key={index}>{size.replace('_', ' ')}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">Level</p>
                                                <ul className="text-sm text-gray-600">
                                                    {tutor.teaching_preferences?.level?.map((level, index) => (
                                                        <li key={index}>{level}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}