import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';

export default function Index({ auth, profiles }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profiles</h2>}
        >
            <Head title="Profiles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {profiles.data.length === 0 ? (
                                <div className="text-center text-gray-500 py-8">
                                    No profiles found.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {profiles.data.map((profile) => (
                                        <Card key={profile.id}>
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-lg mb-2">
                                                            {profile.full_name}
                                                        </h3>
                                                        <p className="text-gray-600 mb-3">
                                                            {profile.education_level}
                                                            {profile.school_name && ` - ${profile.school_name}`}
                                                        </p>
                                                        <div className="flex gap-2">
                                                            <Badge variant={profile.is_verified ? "success" : "secondary"}>
                                                                {profile.is_verified ? "Verified" : "Pending"}
                                                            </Badge>
                                                            <Badge variant="outline">
                                                                {profile.role}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <Link
                                                            href={route('profiles.show', profile.id)}
                                                            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                                                        >
                                                            View Profile
                                                        </Link>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}