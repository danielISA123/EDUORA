import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    FileText, 
    Shield, 
    Users, 
    AlertCircle, 
    DollarSign, 
    Scale,
    BookOpen,
    MessageSquare 
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Terms() {
    const lastUpdated = "November 19, 2024";

    const sections = [
        {
            id: 'acceptance',
            icon: FileText,
            title: 'Acceptance of Terms',
            content: [
                {
                    type: 'paragraph',
                    text: 'By accessing and using Eduora, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.',
                },
                {
                    type: 'important',
                    text: 'These terms constitute a legally binding agreement between you and Eduora.'
                }
            ]
        },
        {
            id: 'user-responsibilities',
            icon: Users,
            title: 'User Responsibilities',
            content: [
                {
                    type: 'paragraph',
                    text: 'As a user of Eduora, you agree to:',
                },
                {
                    type: 'list',
                    items: [
                        'Provide accurate and complete information when creating your account',
                        'Maintain the confidentiality of your account credentials',
                        'Use the platform in compliance with all applicable laws and regulations',
                        'Respect the intellectual property rights of others',
                        'Maintain professional and respectful communication',
                        'Not engage in any fraudulent or deceptive activities'
                    ]
                }
            ]
        },
        {
            id: 'services',
            icon: BookOpen,
            title: 'Services',
            content: [
                {
                    type: 'paragraph',
                    text: 'Eduora provides an online platform connecting students with tutors for educational assistance:',
                },
                {
                    type: 'list',
                    items: [
                        'Assignment help and tutoring services',
                        'Secure communication channels',
                        'Payment processing and escrow services',
                        'Educational resource sharing',
                        'Review and rating system'
                    ]
                }
            ]
        },
        {
            id: 'payments',
            icon: DollarSign,
            title: 'Payment Terms',
            content: [
                {
                    type: 'paragraph',
                    text: 'Our payment terms ensure fair and secure transactions:',
                },
                {
                    type: 'list',
                    items: [
                        'All payments are processed through our secure payment system',
                        'Funds are held in escrow until work is completed and approved',
                        'Platform fees are deducted from each transaction',
                        'Refunds are processed according to our refund policy',
                        'Users are responsible for applicable taxes'
                    ]
                }
            ]
        },
        {
            id: 'intellectual-property',
            icon: Shield,
            title: 'Intellectual Property',
            content: [
                {
                    type: 'paragraph',
                    text: 'Intellectual property rights are strictly protected:',
                },
                {
                    type: 'list',
                    items: [
                        'All platform content is protected by copyright',
                        'Users retain rights to their submitted content',
                        'Limited license granted for platform use',
                        'Prohibition of unauthorized content use',
                        'Respect for third-party intellectual property'
                    ]
                }
            ]
        },
        {
            id: 'dispute-resolution',
            icon: Scale,
            title: 'Dispute Resolution',
            content: [
                {
                    type: 'paragraph',
                    text: 'Our dispute resolution process ensures fair treatment:',
                },
                {
                    type: 'list',
                    items: [
                        'Mediation services for user disputes',
                        'Fair and transparent review process',
                        'Evidence-based decision making',
                        'Appeal process for disputed decisions',
                        'Final binding resolution'
                    ]
                }
            ]
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Terms & Conditions" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <FileText className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Terms & Conditions
                        </h1>
                        <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
                            Please read these terms and conditions carefully before using our platform.
                        </p>
                        <p className="text-sm text-gray-400">
                            Last updated: {lastUpdated}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <nav className="flex flex-wrap gap-4">
                        {sections.map((section, index) => (
                            
                                key={section.id}
                                href={`#${section.id}`}
                                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                {index + 1}. {section.title}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-12">
                    {sections.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-sm p-8"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-100 rounded-lg p-3 mr-4">
                                        <Icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {section.content.map((block, idx) => (
                                        <div key={idx}>
                                            {block.type === 'paragraph' && (
                                                <p className="text-gray-600">{block.text}</p>
                                            )}
                                            {block.type === 'list' && (
                                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                                    {block.items.map((item, itemIdx) => (
                                                        <li key={itemIdx}>{item}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {block.type === 'important' && (
                                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                                                    <div className="flex">
                                                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                                                        <p className="text-yellow-700">{block.text}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        );
                    })}
                </div>

                {/* Contact Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 bg-blue-50 rounded-lg p-8 text-center"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Have Questions?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        If you have any questions about our terms and conditions, please contact our support team.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Contact Support
                    </button>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}