import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import FileUpload from '@/Components/FileUpload';
import { motion } from 'framer-motion';

export default function Create({ auth, errors: serverErrors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        attachments: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('budget', data.budget);
        formData.append('deadline', data.deadline);
        
        // Append each file to FormData
        if (data.attachments.length > 0) {
            data.attachments.forEach((file, index) => {
                formData.append(`attachments[${index}]`, file);
            });
        }

        post('/offerings', {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                // Optionally show success message
            },
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Offering" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="py-12"
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Create New Offering</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Fill in the details below to create a new offering for tutors.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Title
                                    <span className="text-red-500">*</span>
                                </label>
                                <TextInput
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="Enter a clear, descriptive title"
                                    required
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            {/* Description Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Describe your requirements in detail"
                                    required
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Budget & Deadline Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Budget (Rp)
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <TextInput
                                        type="number"
                                        value={data.budget}
                                        onChange={e => setData('budget', e.target.value)}
                                        className="mt-1 block w-full"
                                        placeholder="Enter your budget"
                                        min="0"
                                        required
                                    />
                                    <InputError message={errors.budget} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Deadline
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <TextInput
                                        type="datetime-local"
                                        value={data.deadline}
                                        onChange={e => setData('deadline', e.target.value)}
                                        className="mt-1 block w-full"
                                        min={new Date().toISOString().slice(0, 16)}
                                        required
                                    />
                                    <InputError message={errors.deadline} className="mt-2" />
                                </div>
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Attachments
                                </label>
                                <FileUpload
                                    onUpload={(files) => setData('attachments', files)}
                                    error={errors.attachments}
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    Upload any relevant files or documents (max 10MB each)
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    {processing ? 'Creating...' : 'Create Offering'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </motion.div>
        </AuthenticatedLayout>
    );
}