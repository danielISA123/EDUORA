import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/Components/ui/card';
import { Clock, DollarSign, FileText, User, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/Components/ui/button';
import { useToast } from '@/Hooks/useToast';

export default function Show({ auth, offering }) {
    const { toast } = useToast();
    const { post, processing } = useForm();
    
    const handleAccept = () => {
        post(route('tutors.offerings.accept', offering.id), {
            onSuccess: () => {
                toast({
                    title: "Success!",
                    description: "Offering accepted successfully.",
                });
            },
            onError: () => {
                toast({
                    title: "Error!",
                    description: "Failed to accept offering.",
                    variant: "destructive",
                });
            },
        });
    };

    // Status badge color handler
    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'accepted': 'bg-green-100 text-green-800',
            'completed': 'bg-blue-100 text-blue-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl">Offering Details</h2>}
        >
            <Head title={offering.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="p-6">
                        <div className="mb-6 flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{offering.title}</h1>
                                <div className="flex items-center text-gray-600">
                                    <User className="w-4 h-4 mr-1" />
                                    <span>Posted by {offering.user.name}</span>
                                </div>
                            </div>
                            <div>
                                <span className={`inline-block px-4 py-2 rounded-full ${getStatusColor(offering.status)}`}>
                                    {offering.status.charAt(0).toUpperCase() + offering.status.slice(1)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
                                <div>
                                    <p className="text-sm text-gray-600">Budget</p>
                                    <p className="font-semibold">Rp {offering.budget.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                                <div>
                                    <p className="text-sm text-gray-600">Deadline</p>
                                    <p className="font-semibold">
                                        {format(new Date(offering.deadline), 'PPP p')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="prose max-w-none mb-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="whitespace-pre-wrap text-gray-700">{offering.description}</p>
                        </div>

                        {offering.attachments?.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                                <div className="space-y-2">
                                    {offering.attachments.map((attachment, index) => (
                                        <a
                                            key={index}
                                            href={`/storage/${attachment}`}
                                            target="_blank"
                                            className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <FileText className="w-5 h-5 text-gray-500 mr-2" />
                                            <span className="text-blue-600 hover:text-blue-800">
                                                {attachment.split('/').pop()}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Accept Button for Tutors */}
                        {auth.user.role === 'tutor' && 
                         offering.status === 'pending' && 
                         auth.user.is_verified && (
                            <div className="mt-6 flex justify-end">
                                <Button
                                    onClick={handleAccept}
                                    disabled={processing}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    {processing ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </div>
                                    ) : (
                                        'Accept Offering'
                                    )}
                                </Button>
                            </div>
                        )}

                        {/* Chat Button - Only show if offering is accepted */}
                        {offering.status === 'accepted' && (
                            <Link
                                href={route('messages.index', offering.id)}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Open Chat
                            </Link>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex justify-between">
                            <Link
                                href={route('offerings.index')}
                                className="text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                ← Back to Offerings
                            </Link>
                            {auth.user.id === offering.user_id && offering.status === 'pending' && (
                                <Link
                                    href={route('offerings.edit', offering.id)}
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Edit Offering →
                                </Link>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
