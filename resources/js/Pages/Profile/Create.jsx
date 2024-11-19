import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        education_level: '',
        school_name: '',
        major: '',
        graduation_year: '',
        bio: ''
    });

    const educationLevels = [
        { value: 'SMP', label: 'SMP' },
        { value: 'SMA', label: 'SMA' },
        { value: 'D3', label: 'D3' },
        { value: 'S1', label: 'S1' },
        { value: 'S2', label: 'S2' }
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route('profiles.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Profile</h2>}
        >
            <Head title="Create Profile" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="full_name" value="Full Name" />
                                    <TextInput
                                        id="full_name"
                                        type="text"
                                        name="full_name"
                                        value={data.full_name}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('full_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.full_name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="education_level" value="Education Level" />
                                    <SelectInput
                                        id="education_level"
                                        name="education_level"
                                        value={data.education_level}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('education_level', e.target.value)}
                                        options={educationLevels}
                                        required
                                    />
                                    <InputError message={errors.education_level} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="school_name" value="School/University Name" />
                                    <TextInput
                                        id="school_name"
                                        type="text"
                                        name="school_name"
                                        value={data.school_name}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('school_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.school_name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="major" value="Major/Field of Study" />
                                    <TextInput
                                        id="major"
                                        type="text"
                                        name="major"
                                        value={data.major}
                                        className="mt-1 block w-full"
                                        onChange={e => setData('major', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.major} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="bio" value="Bio" />
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={data.bio}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        rows="4"
                                        onChange={e => setData('bio', e.target.value)}
                                    />
                                    <InputError message={errors.bio} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="ml-4"
                                    >
                                        Create Profile
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}