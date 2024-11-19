import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Shield, 
    Lock, 
    AlertTriangle, 
    Users, 
    Eye, 
    FileCheck,
    MessageSquare,
    Bell,
    ChevronDown,
    CheckCircle,
    XCircle
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Safety() {
    const [activeSection, setActiveSection] = useState(null);

    const guidelines = [
        {
            id: 'account',
            title: 'Account Security',
            icon: Lock,
            color: 'blue',
            guidelines: [
                {
                    do: [
                        'Use a strong, unique password',
                        'Enable two-factor authentication',
                        'Keep your contact information updated',
                        'Log out from shared devices',
                        'Regularly review account activity'
                    ],
                    dont: [
                        'Share your password with anyone',
                        'Use the same password as other sites',
                        'Skip security verification steps',
                        'Leave your account logged in on public devices',
                        'Ignore suspicious activity notifications'
                    ]
                }
            ]
        },
        {
            id: 'communication',
            title: 'Safe Communication',
            icon: MessageSquare,
            color: 'green',
            guidelines: [
                {
                    do: [
                        'Use platform messaging system',
                        'Keep communications professional',
                        'Report inappropriate messages',
                        'Document important conversations',
                        'Respect privacy boundaries'
                    ],
                    dont: [
                        'Share personal contact information',
                        'Communicate outside the platform',
                        'Send personal or sensitive data',
                        'Ignore red flags in communication',
                        'Engage in non-academic discussions'
                    ]
                }
            ]
        },
        {
            id: 'payments',
            title: 'Payment Safety',
            icon: Shield,
            color: 'purple',
            guidelines: [
                {
                    do: [
                        'Use platform payment system only',
                        'Verify transaction details carefully',
                        'Keep payment receipts',
                        'Report payment issues promptly',
                        'Check escrow status regularly'
                    ],
                    dont: [
                        'Make payments outside platform',
                        'Share banking information',
                        'Accept alternative payment methods',
                        'Release payment before verification',
                        'Ignore payment disputes'
                    ]
                }
            ]
        }
    ];

    const reportingSteps = [
        {
            title: 'Identify the Issue',
            description: 'Determine what type of safety concern you are experiencing',
            icon: Eye
        },
        {
            title: 'Gather Evidence',
            description: 'Take screenshots or save relevant messages and information',
            icon: FileCheck
        },
        {
            title: 'Report the Problem',
            description: 'Use our reporting system to submit your concern',
            icon: AlertTriangle
        },
        {
            title: 'Follow Up',
            description: 'Track your report and respond to any requests for information',
            icon: Bell
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Safety Guidelines" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <Shield className="w-16 h-16 text-white/80 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Safety Guidelines
                        </h1>
                        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                            Learn how to stay safe and secure while using our platform.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Safety Alert Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
                    <div className="flex">
                        <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">
                                Important Safety Notice
                            </h3>
                            <p className="mt-2 text-sm text-yellow-700">
                                Always follow these guidelines to ensure a safe experience. Report any suspicious activity immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guidelines Sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-6">
                    {guidelines.map((section, index) => {
                        const Icon = section.icon;
                        return (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                            >
                                <button
                                    onClick={() => setActiveSection(
                                        activeSection === section.id ? null : section.id
                                    )}
                                    className="w-full px-6 py-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <div className={`bg-${section.color}-100 p-3 rounded-lg mr-4`}>
                                            <Icon className={`w-6 h-6 text-${section.color}-600`} />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {section.title}
                                        </h3>
                                    </div>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                                            activeSection === section.id ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {activeSection === section.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="px-6 pb-6"
                                    >
                                    {/* Do's and Don'ts Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                            {/* Do's */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                                    Do's
                                                </h4>
                                                <ul className="space-y-3">
                                                    {section.guidelines[0].do.map((item, idx) => (
                                                        <li 
                                                            key={idx}
                                                            className="flex items-start"
                                                        >
                                                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-600">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Don'ts */}
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                                                    <XCircle className="w-5 h-5 text-red-500 mr-2" />
                                                    Don'ts
                                                </h4>
                                                <ul className="space-y-3">
                                                    {section.guidelines[0].dont.map((item, idx) => (
                                                        <li 
                                                            key={idx}
                                                            className="flex items-start"
                                                        >
                                                            <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                                            <span className="text-gray-600">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Reporting Steps */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">How to Report a Safety Concern</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {reportingSteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                                >
                                    <div className="relative">
                                        {/* Step Number */}
                                        <div className="absolute -top-10 -left-2 text-6xl font-bold text-gray-100">
                                            {index + 1}
                                        </div>
                                        
                                        <div className="relative">
                                            <div className="bg-indigo-100 rounded-lg p-3 inline-block mb-4">
                                                <Icon className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-red-50 rounded-2xl p-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Emergency Support
                        </h2>
                        <p className="text-gray-600 mb-6">
                            If you encounter any immediate safety concerns or suspicious activity, please contact our emergency support team.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                                Contact Emergency Support
                            </button>
                            <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Report Suspicious Activity
                            </button>
                        </div>
                        <p className="mt-4 text-sm text-gray-500">
                            Our safety team is available 24/7 to assist you
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Resource Cards */}
                    <ResourceCard 
                        title="Safety Blog"
                        description="Read our latest articles on platform safety and best practices."
                        link="/blog/safety"
                    />
                    <ResourceCard 
                        title="Safety Webinars"
                        description="Join our monthly safety awareness webinars."
                        link="/webinars"
                    />
                    <ResourceCard 
                        title="Safety FAQ"
                        description="Find answers to common safety questions."
                        link="/faq/safety"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Resource Card Component
function ResourceCard({ title, description, link }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <a 
                href={link}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
            >
                Learn more
                <ChevronDown className="w-4 h-4 ml-1 transform rotate-270" />
            </a>
        </motion.div>
    );
}