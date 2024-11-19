import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-medium">
                                    Welcome back, {auth.user.name}!
                                </h3>
                                <p className="text-gray-600">
                                    Manage your profile and activities here.
                                </p>
                            </div>

                            {/* Menu cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Offerings Card */}
                                <Card>
                                    <CardContent className="p-4">
                                        <h4 className="font-medium mb-2">Offerings</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Explore the available offerings and services.
                                        </p>
                                        <Link href="/offerings">
                                            <Button>
                                                View Offerings
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Profile Card */}
                                <Card>
                                    <CardContent className="p-4">
                                        <h4 className="font-medium mb-2">Your Profile</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {auth.user.profile 
                                                ? 'View and edit your profile information'
                                                : 'Create your profile to get started'
                                            }
                                        </p>
                                        <Link href={auth.user.profile 
                                            ? '/profile/edit'
                                            : '/profile/create'
                                        }>
                                            <Button>
                                                {auth.user.profile ? 'Edit Profile' : 'Create Profile'}
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Settings Card */}
                                <Card>
                                    <CardContent className="p-4">
                                        <h4 className="font-medium mb-2">Settings</h4>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Update your account settings and preferences.
                                        </p>
                                        <Link href="/settings">
                                            <Button>
                                                Update Settings
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
