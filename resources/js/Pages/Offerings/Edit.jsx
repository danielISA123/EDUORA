import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/Components/ui/card';
import { 
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import TextInput from '@/Components/TextInput';
import FileInput from '@/Components/FileInput';
import { useToast } from '@/Hooks/useToast';

export default function Edit({ auth, offering }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { success, error } = useToast();
    
    const { data, setData, patch, delete: destroy, processing, errors } = useForm({
        title: offering.title,
        description: offering.description,
        budget: offering.budget,
        deadline: offering.deadline.split('.')[0], // Remove milliseconds
        attachments: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('offerings.update', offering.id), {
            onSuccess: () => {
                success('Offering updated successfully');
            },
            onError: () => {
                error('Failed to update offering. Please try again.');
            }
        });
    };

    const handleDelete = () => {
        destroy(route('offerings.destroy', offering.id), {
            onSuccess: () => {
                success('Offering deleted successfully');
                setShowDeleteDialog(false);
            },
            onError: () => {
                error('Failed to delete offering. Please try again.');
                setShowDeleteDialog(false);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl">Edit Offering</h2>}
        >
            <Head title="Edit Offering" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block font-medium text-gray-700">Title</label>
                                <TextInput
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="mt-1 block w-full"
                                    error={errors.title}
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500"
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-medium text-gray-700">Budget (Rp)</label>
                                    <TextInput
                                        type="number"
                                        value={data.budget}
                                        onChange={e => setData('budget', e.target.value)}
                                        className="mt-1 block w-full"
                                        error={errors.budget}
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700">Deadline</label>
                                    <TextInput
                                        type="datetime-local"
                                        value={data.deadline}
                                        onChange={e => setData('deadline', e.target.value)}
                                        className="mt-1 block w-full"
                                        error={errors.deadline}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700">Attachments</label>
                                {offering.attachments?.length > 0 && (
                                    <div className="mt-2 mb-4 space-y-2">
                                        <p className="text-sm text-gray-500">Current files:</p>
                                        {offering.attachments.map((attachment, index) => (
                                            <div key={index} className="text-sm text-gray-600">
                                                {attachment.split('/').pop()}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <FileInput
                                    onChange={files => setData('attachments', files)}
                                    multiple
                                    accept=".pdf,.doc,.docx,.zip"
                                    error={errors.attachments}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Upload new files to replace existing ones
                                </p>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteDialog(true)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Delete Offering
                                </button>
                                
                                <div className="space-x-4">
                                    <Link
                                        href={route('offerings.show', offering.id)}
                                        className="inline-block px-4 py-2 text-gray-700 hover:text-gray-900"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
                                    >
                                        Update Offering
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Offering</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this offering? This action cannot be undone.
                            All associated files and data will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    );
}
