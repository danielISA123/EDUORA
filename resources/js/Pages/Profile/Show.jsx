import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Show({ auth, profile }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile Details</h2>}
        >
            <Head title="Profile Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            {/* Profile Picture */}
                            {profile.profile_picture_url && (
                                <div className="mb-6">
                                    <img 
                                        src={profile.profile_picture_url}
                                        alt={profile.full_name}
                                        className="w-32 h-32 rounded-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Basic Info */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h3 className="font-semibold">Full Name</h3>
                                    <p>{profile.full_name}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Education</h3>
                                    <p>{profile.education_level} - {profile.school_name}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Major</h3>
                                    <p>{profile.major}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Graduation Year</h3>
                                    <p>{profile.graduation_year}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            {auth.user.id === profile.user_id && (
                                <div className="flex justify-end space-x-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => window.location = route('profiles.edit', profile.id)}
                                    >
                                        Edit Profile
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}