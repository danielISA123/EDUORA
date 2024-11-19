import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select } from '@/Components/ui/select';
import { FileText, X } from 'lucide-react';

export default function Edit({ auth, tutor }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        expertise_level: tutor.expertise_level || '',
        bio: tutor.bio || '',
        subjects: tutor.subjects || [],
        hourly_rate: tutor.hourly_rate || '',
        university: tutor.university || '',
        degree: tutor.degree || '',
        major: tutor.major || '',
        gpa: tutor.gpa || '',
        graduation_year: tutor.graduation_year || '',
        student_card: null,
        transcript: null,
        certificates: null,
        available_times: tutor.available_times || {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        },
        teaching_preferences: tutor.teaching_preferences || {
            mode: [],
            group_size: [],
            level: []
        }
    });

    const [subjectInput, setSubjectInput] = useState('');
    const [showCurrentFiles, setShowCurrentFiles] = useState({
        student_card: true,
        transcript: true,
        certificates: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tutors.update', tutor.id), {
            _method: 'PUT'
        });
    };

    const addSubject = () => {
        if (subjectInput.trim() && !data.subjects.includes(subjectInput.trim())) {
            setData('subjects', [...data.subjects, subjectInput.trim()]);
            setSubjectInput('');
        }
    };

    const removeSubject = (subject) => {
        setData('subjects', data.subjects.filter(s => s !== subject));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Tutor Profile</h2>}
        >
            <Head title="Edit Tutor Profile" />

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

                                    {/* Subjects */}
                                    <div>
                                        <Label>Subjects</Label>
                                        <div className="flex gap-2 mb-2">
                                            <Input
                                                value={subjectInput}
                                                onChange={e => setSubjectInput(e.target.value)}
                                                placeholder="Add a subject"
                                            />
                                            <Button type="button" onClick={addSubject}>
                                                Add
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {data.subjects.map((subject, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                                                >
                                                    {subject}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSubject(subject)}
                                                        className="ml-2"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
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

                                {/* Academic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Academic Information</h3>
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

                                {/* Documents */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Documents</h3>
                                    
                                    {/* Student Card */}
                                    <div>
                                        <Label htmlFor="student_card">Student Card (KTM)</Label>
                                        {showCurrentFiles.student_card && tutor.student_card_url && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <FileText className="w-4 h-4 text-gray-600" />
                                                <span className="text-sm text-gray-600">Current file</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCurrentFiles(prev => ({...prev, student_card: false}))}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                        <Input
                                            type="file"
                                            id="student_card"
                                            onChange={e => setData('student_card', e.target.files[0])}
                                            error={errors.student_card}
                                        />
                                    </div>

                                    {/* Other document fields follow same pattern... */}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
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