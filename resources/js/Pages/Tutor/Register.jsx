import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select } from '@/Components/ui/select';

export default function Register({ auth }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        expertise_level: '',
        bio: '',
        subjects: [],
        hourly_rate: '',
        university: '',
        degree: '',
        major: '',
        gpa: '',
        graduation_year: '',
        student_card: null,
        transcript: null,
        certificates: [],
        available_times: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        },
        teaching_preferences: {
            mode: [],
            group_size: [],
            level: []
        }
    });

    const [subjectInput, setSubjectInput] = useState('');

    const addSubject = () => {
        if (subjectInput.trim() && !data.subjects.includes(subjectInput.trim())) {
            setData('subjects', [...data.subjects, subjectInput.trim()]);
            setSubjectInput('');
        }
    };

    const removeSubject = (subject) => {
        setData('subjects', data.subjects.filter(s => s !== subject));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tutors.store'));
    };

    const handleTimeChange = (day, time, checked) => {
        const times = [...data.available_times[day]];
        if (checked) {
            times.push(time);
        } else {
            const index = times.indexOf(time);
            if (index > -1) times.splice(index, 1);
        }
        setData('available_times', {
            ...data.available_times,
            [day]: times
        });
    };

    const handlePreferenceChange = (category, value, checked) => {
        const prefs = [...data.teaching_preferences[category]];
        if (checked) {
            prefs.push(value);
        } else {
            const index = prefs.indexOf(value);
            if (index > -1) prefs.splice(index, 1);
        }
        setData('teaching_preferences', {
            ...data.teaching_preferences,
            [category]: prefs
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Register as Tutor</h2>}
        >
            <Head title="Register as Tutor" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Basic Information</h3>
                                    
                                    <div>
                                        <Label htmlFor="expertise_level">Expertise Level</Label>
                                        <Select
                                            id="expertise_level"
                                            value={data.expertise_level}
                                            onChange={e => setData('expertise_level', e.target.value)}
                                            error={errors.expertise_level}
                                        >
                                            <option value="">Select Level</option>
                                            <option value="Undergraduate">Undergraduate</option>
                                            <option value="Graduate">Graduate</option>
                                            <option value="Professional">Professional</option>
                                        </Select>
                                        {errors.expertise_level && (
                                            <p className="text-sm text-red-600">{errors.expertise_level}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            className="w-full rounded-md border border-gray-200 p-3"
                                            value={data.bio}
                                            onChange={e => setData('bio', e.target.value)}
                                            rows="4"
                                        />
                                        {errors.bio && (
                                            <p className="text-sm text-red-600">{errors.bio}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="hourly_rate">Hourly Rate (Rp)</Label>
                                        <Input
                                            type="number"
                                            id="hourly_rate"
                                            value={data.hourly_rate}
                                            onChange={e => setData('hourly_rate', e.target.value)}
                                            error={errors.hourly_rate}
                                        />
                                    </div>
                                </div>

                                {/* Academic Background */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Academic Background</h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="university">University</Label>
                                            <Input
                                                id="university"
                                                value={data.university}
                                                onChange={e => setData('university', e.target.value)}
                                                error={errors.university}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="degree">Degree</Label>
                                            <Input
                                                id="degree"
                                                value={data.degree}
                                                onChange={e => setData('degree', e.target.value)}
                                                error={errors.degree}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="major">Major</Label>
                                            <Input
                                                id="major"
                                                value={data.major}
                                                onChange={e => setData('major', e.target.value)}
                                                error={errors.major}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="gpa">GPA</Label>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                id="gpa"
                                                value={data.gpa}
                                                onChange={e => setData('gpa', e.target.value)}
                                                error={errors.gpa}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Documents Upload */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Required Documents</h3>
                                    
                                    <div>
                                        <Label htmlFor="student_card">Student Card (KTM)</Label>
                                        <Input
                                            type="file"
                                            id="student_card"
                                            onChange={e => setData('student_card', e.target.files[0])}
                                            error={errors.student_card}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="transcript">Academic Transcript</Label>
                                        <Input
                                            type="file"
                                            id="transcript"
                                            onChange={e => setData('transcript', e.target.files[0])}
                                            error={errors.transcript}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="certificates">Additional Certificates</Label>
                                        <Input
                                            type="file"
                                            id="certificates"
                                            multiple
                                            onChange={e => setData('certificates', Array.from(e.target.files))}
                                            error={errors.certificates}
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Application'}
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