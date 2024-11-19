import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select } from '@/Components/ui/select';

export default function Form({ auth, profile = null, isEditing = false }) {
    const { data, setData, post, put, processing, errors, progress } = useForm({
        full_name: profile?.full_name || '',
        phone_number: profile?.phone_number || '',
        address: profile?.address || '',
        gender: profile?.gender || '',
        birth_date: profile?.birth_date || '',
        education_level: profile?.education_level || '',
        school_name: profile?.school_name || '',
        major: profile?.major || '',
        graduation_year: profile?.graduation_year || '',
        profile_picture: null,
        notification_enabled: profile?.notification_enabled ?? true,
        language_preference: profile?.language_preference || 'id'
    });

    const [previewUrl, setPreviewUrl] = useState(profile?.profile_picture_url || null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('profiles.update', profile.id));
        } else {
            post(route('profiles.store'));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_picture', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {isEditing ? 'Edit Profile' : 'Create Profile'}
                </h2>
            }
        >
            <Head title={isEditing ? 'Edit Profile' : 'Create Profile'} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Profile Picture */}
                                <div className="space-y-2">
                                    <Label htmlFor="profile_picture">Profile Picture</Label>
                                    <div className="flex items-center gap-4">
                                        {previewUrl && (
                                            <img 
                                                src={previewUrl} 
                                                alt="Profile Preview"
                                                className="w-20 h-20 rounded-full object-cover"
                                            />
                                        )}
                                        <Input
                                            id="profile_picture"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            error={errors.profile_picture}
                                        />
                                    </div>
                                    {progress && (
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div 
                                                className="bg-blue-600 h-2.5 rounded-full" 
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                    )}
                                </div>

                                {/* Basic Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="full_name">Full Name</Label>
                                        <Input
                                            id="full_name"
                                            value={data.full_name}
                                            onChange={e => setData('full_name', e.target.value)}
                                            error={errors.full_name}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone_number">Phone Number</Label>
                                        <Input
                                            id="phone_number"
                                            value={data.phone_number}
                                            onChange={e => setData('phone_number', e.target.value)}
                                            error={errors.phone_number}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Select
                                            id="gender"
                                            value={data.gender}
                                            onChange={e => setData('gender', e.target.value)}
                                            error={errors.gender}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="birth_date">Birth Date</Label>
                                        <Input
                                            id="birth_date"
                                            type="date"
                                            value={data.birth_date}
                                            onChange={e => setData('birth_date', e.target.value)}
                                            error={errors.birth_date}
                                        />
                                    </div>
                                </div>

                                {/* Education Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="education_level">Education Level</Label>
                                        <Select
                                            id="education_level"
                                            value={data.education_level}
                                            onChange={e => setData('education_level', e.target.value)}
                                            error={errors.education_level}
                                        >
                                            <option value="">Select Level</option>
                                            <option value="smp">SMP</option>
                                            <option value="sma">SMA</option>
                                            <option value="university">University</option>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="school_name">School Name</Label>
                                        <Input
                                            id="school_name"
                                            value={data.school_name}
                                            onChange={e => setData('school_name', e.target.value)}
                                            error={errors.school_name}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="major">Major</Label>
                                        <Input
                                            id="major"
                                            value={data.major}
                                            onChange={e => setData('major', e.target.value)}
                                            error={errors.major}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="graduation_year">Graduation Year</Label>
                                        <Input
                                            id="graduation_year"
                                            type="number"
                                            min="1900"
                                            max="2100"
                                            value={data.graduation_year}
                                            onChange={e => setData('graduation_year', e.target.value)}
                                            error={errors.graduation_year}
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <textarea
                                        id="address"
                                        className="w-full rounded-md border border-gray-200 p-3"
                                        rows="3"
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                    ></textarea>
                                    {errors.address && (
                                        <p className="text-sm text-red-500">{errors.address}</p>
                                    )}
                                </div>

                                {/* Preferences */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="language_preference">Language Preference</Label>
                                        <Select
                                            id="language_preference"
                                            value={data.language_preference}
                                            onChange={e => setData('language_preference', e.target.value)}
                                            error={errors.language_preference}
                                        >
                                            <option value="id">Indonesia</option>
                                            <option value="en">English</option>
                                        </Select>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="notification_enabled"
                                            checked={data.notification_enabled}
                                            onChange={e => setData('notification_enabled', e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <Label htmlFor="notification_enabled">Enable Notifications</Label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6"
                                    >
                                        {processing ? 'Saving...' : (isEditing ? 'Update Profile' : 'Create Profile')}
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