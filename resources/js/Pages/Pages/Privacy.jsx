import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Shield, Lock, UserCheck, Bell, Database, Clock } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Privacy() {
    const lastUpdated = "November 19, 2024";

    const sections = [
        {
            id: 'information-collection',
            icon: Database,
            title: 'Information We Collect',
            content: [
                {
                    type: 'paragraph',
                    text: 'We collect information to provide better services to our users and improve the platform experience:',
                },
                {
                    type: 'list',
                    items: [
                        'Account information (name, email, academic details)',
                        'Profile information you choose to provide',
                        'Transaction and payment data',
                        'Communication data between tutors and students',
                        'Usage data and platform interactions',
                        'Device and browser information'
                    ]
                }
            ]
        },
        {
            id: 'data-usage',
            icon: Lock,
            title: 'How We Use Your Data',
            content: [
                {
                    type: 'paragraph',
                    text: 'Your data is used to:',
                },
                {
                    type: 'list',
                    items: [
                        'Provide and improve our tutoring services',
                        'Process payments and prevent fraud',
                        'Send important notifications about your assignments',
                        'Improve our platform and user experience',
                        'Comply with legal obligations',
                        'Protect the security of our users'
                    ]
                }
            ]
        },
        {
            id: 'data-protection',
            icon: Shield,
            title: 'Data Protection',
            content: [
                {
                    type: 'paragraph',
                    text: 'We implement strong security measures to protect your data:',
                },
                {
                    type: 'list',
                    items: [
                        'End-to-end encryption for sensitive data',
                        'Regular security audits and updates',
                        'Secure payment processing',
                        'Access controls and authentication',
                        'Data backup and recovery systems'
                    ]
                }
            ]
        },
        {
            id: 'user-rights',
            icon: UserCheck,
            title: 'Your Rights',
            content: [
                {
                    type: 'paragraph',
                    text: 'You have the right to:',
                },
                {
                    type: 'list',
                    items: [
                        'Access your personal data',
                        'Correct inaccurate data',
                        'Request data deletion',
                        'Withdraw consent',
                        'Export your data',
                        'Object to data processing'
                    ]
                }
            ]
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Privacy Policy" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
                            We are committed to protecting your privacy and ensuring the security of your personal information.
                        </p>
                        <p className="text-sm text-gray-400">
                            Last updated: {lastUpdated}
                        </p>
                    </motion.div>
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
                        Questions About Your Privacy?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        If you have any questions about our privacy policy or how we handle your data, please don't hesitate to contact us.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Contact Privacy Team
                    </button>
                </motion.div>
            </div>
        </AuthenticatedLayout>
    );
}