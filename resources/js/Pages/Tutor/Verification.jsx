import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { FileText, GraduationCap, CheckCircle, XCircle } from 'lucide-react';

export default function Verification({ auth, tutors }) {
    const { data, setData, post, processing } = useForm({
        verification_status: '',
        verification_note: ''
    });

    const verifyTutor = (tutorId, status) => {
        post(route('tutors.verify', tutorId), {
            data: {
                verification_status: status,
                verification_note: data.verification_note
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tutor Verification</h2>}
        >
            <Head title="Tutor Verification" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {tutors.data.map(tutor => (
                            <Card key={tutor.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-6">
                                        {/* Tutor Basic Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <GraduationCap className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">{tutor.user.name}</h3>
                                                    <p className="text-gray-600">{tutor.expertise_level}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <Label>University</Label>
                                                    <p>{tutor.university}</p>
                                                </div>
                                                <div>
                                                    <Label>Major</Label>
                                                    <p>{tutor.major}</p>
                                                </div>
                                                <div>
                                                    <Label>Degree</Label>
                                                    <p>{tutor.degree}</p>
                                                </div>
                                                <div>
                                                    <Label>GPA</Label>
                                                    <p>{tutor.gpa}</p>
                                                </div>
                                            </div>

                                            {/* Documents */}
                                            <div className="space-y-2">
                                                <Label>Submitted Documents</Label>
                                                <div className="flex gap-4">
                                                    {tutor.student_card_url && (
                                                        <a 
                                                            href={tutor.student_card_url}
                                                            target="_blank"
                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                                        >
                                                            <FileText className="w-4 h-4" />
                                                            Student Card
                                                        </a>
                                                    )}
                                                    {tutor.transcript_url && (
                                                        <a 
                                                            href={tutor.transcript_url}
                                                            target="_blank"
                                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                                        >
                                                            <FileText className="w-4 h-4" />
                                                            Transcript
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verification Actions */}
                                        <div className="w-64 space-y-4">
                                            <div className="p-4 rounded-md bg-gray-50">
                                                <Label>Current Status</Label>
                                                <p className={`font-medium ${
                                                    tutor.verification_status === 'approved' 
                                                        ? 'text-green-600' 
                                                        : tutor.verification_status === 'rejected'
                                                        ? 'text-red-600'
                                                        : 'text-gray-600'
                                                }`}>
                                                    {tutor.verification_status.charAt(0).toUpperCase() + 
                                                    tutor.verification_status.slice(1)}
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <textarea
                                                    className="w-full rounded-md border border-gray-200 p-2"
                                                    placeholder="Add verification note..."
                                                    rows="3"
                                                    value={data.verification_note}
                                                    onChange={e => setData('verification_note', e.target.value)}
                                                />
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        onClick={() => verifyTutor(tutor.id, 'approved')}
                                                        disabled={processing}
                                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        onClick={() => verifyTutor(tutor.id, 'rejected')}
                                                        disabled={processing}
                                                        className="flex-1"
                                                    >
                                                        <XCircle className="w-4 h-4 mr-2" />
                                                        Reject
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}