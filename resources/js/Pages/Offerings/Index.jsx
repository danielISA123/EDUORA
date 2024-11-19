import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Clock, DollarSign, FileText } from 'lucide-react';
import { formatDistance } from 'date-fns';

export default function Index({ auth, offerings }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl">Offerings</h2>}
        >
            <Head title="Offerings" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold">All Offerings</h1>
                        {auth.user.role === 'student' && (
                            // Ganti dari Button dengan asChild
                            <Link
                                href="/offerings/create"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Create New Offering
                            </Link>
                        )}
                    </div>

                    <div className="space-y-4">
                        {offerings.data.map((offering) => (
                            <Card key={offering.id} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            <Link 
                                                href={`/offerings/${offering.id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                {offering.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 mb-4">{offering.description}</p>
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {formatDistance(new Date(offering.deadline), new Date(), { addSuffix: true })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <DollarSign className="w-4 h-4" />
                                                Rp {offering.budget.toLocaleString()}
                                            </span>
                                            {offering.attachments?.length > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <FileText className="w-4 h-4" />
                                                    {offering.attachments.length} files
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                            {
                                                'pending': 'bg-yellow-100 text-yellow-800',
                                                'open': 'bg-blue-100 text-blue-800',
                                                'accepted': 'bg-green-100 text-green-800',
                                                'completed': 'bg-gray-100 text-gray-800',
                                                'cancelled': 'bg-red-100 text-red-800'
                                            }[offering.status]
                                        }`}>
                                            {offering.status.charAt(0).toUpperCase() + offering.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination bisa ditambahkan di sini */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}