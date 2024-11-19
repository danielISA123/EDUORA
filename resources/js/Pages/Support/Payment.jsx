import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    DollarSign, 
    CreditCard, 
    Calendar, 
    Shield, 
    AlertCircle,
    HelpCircle,
    ArrowRight,
    ChevronDown,
    ChevronsRight
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function PaymentSupport() {
    const [activeGuide, setActiveGuide] = useState(null);
    const [activeIssue, setActiveIssue] = useState(null);

    const paymentGuides = [
        {
            id: 'qris',
            title: 'QRIS Payment Guide',
            icon: CreditCard,
            steps: [
                'Open your mobile banking or e-wallet app',
                'Scan the QRIS code displayed on the payment page',
                'Verify the payment amount and merchant name',
                'Confirm payment using your PIN/authentication method',
                'Wait for payment confirmation',
                'Check your dashboard for payment status'
            ]
        },
        {
            id: 'refund',
            title: 'Refund Process',
            icon: DollarSign,
            steps: [
                'Go to the specific offering in your dashboard',
                'Click "Request Refund" button',
                'Fill in the refund reason form',
                'Submit your request',
                'Wait for admin review (24-48 hours)',
                'Receive refund confirmation'
            ]
        },
        {
            id: 'escrow',
            title: 'Escrow System',
            icon: Shield,
            steps: [
                'Make payment for an offering',
                'Funds are held securely in escrow',
                'Tutor completes the work',
                'Review and approve the submission',
                'Funds are released to tutor',
                'Transaction completed'
            ]
        }
    ];

    const commonIssues = [
        {
            id: 'failed',
            title: 'Payment Failed',
            solutions: [
                'Check your internet connection',
                'Verify sufficient balance',
                'Ensure payment method is active',
                'Try a different payment method',
                'Contact your bank if issue persists'
            ]
        },
        {
            id: 'pending',
            title: 'Payment Stuck on Pending',
            solutions: [
                'Wait for 15-30 minutes',
                'Check transaction history in your banking app',
                'Refresh your dashboard',
                'Do not make duplicate payments',
                'Contact support if status doesn\'t update'
            ]
        },
        {
            id: 'refund-delay',
            title: 'Refund Delays',
            solutions: [
                'Refunds typically process in 3-5 business days',
                'Check refund status in your dashboard',
                'Ensure bank details are correct',
                'Contact support for status updates',
                'Provide transaction ID when inquiring'
            ]
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Payment Support" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <DollarSign className="w-16 h-16 text-white/80 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Payment Support Center
                        </h1>
                        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                            Everything you need to know about payments, refunds, and our escrow system.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <QuickActionCard 
                        title="Payment Status"
                        description="Check your payment status"
                        icon={Calendar}
                        link="/dashboard/payments"
                        color="blue"
                    />
                    <QuickActionCard 
                        title="Request Refund"
                        description="Start refund process"
                        icon={DollarSign}
                        link="/refund/new"
                        color="green"
                    />
                    <QuickActionCard 
                        title="Contact Support"
                        description="Get help with payments"
                        icon={HelpCircle}
                        link="/contact"
                        color="purple"
                    />
                </div>
            </div>

            {/* Payment Guides */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Payment Guides</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {paymentGuides.map((guide, index) => {
                        const Icon = guide.icon;
                        return (
                            <motion.div
                                key={guide.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
                                    activeGuide === guide.id ? 'ring-2 ring-blue-500' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 rounded-lg p-3 mr-4">
                                            <Icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {guide.title}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setActiveGuide(
                                            activeGuide === guide.id ? null : guide.id
                                        )}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <ChevronDown 
                                            className={`w-5 h-5 transform transition-transform duration-200 ${
                                                activeGuide === guide.id ? 'rotate-180' : ''
                                            }`} 
                                        />
                                    </button>
                                </div>
                                
                                {activeGuide === guide.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        {guide.steps.map((step, stepIndex) => (
                                            <div 
                                                key={stepIndex}
                                                className="flex items-start"
                                            >
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5 text-sm font-medium">
                                                    {stepIndex + 1}
                                                </div>
                                                <p className="text-gray-600">{step}</p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Common Issues */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Common Issues & Solutions</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {commonIssues.map((issue, index) => (
                            <motion.div
                                key={issue.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-sm border border-gray-200"
                            >
                                <button
                                    onClick={() => setActiveIssue(
                                        activeIssue === issue.id ? null : issue.id
                                    )}
                                    className="w-full px-6 py-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <AlertCircle className="w-5 h-5 text-orange-500 mr-3" />
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {issue.title}
                                        </h3>
                                    </div>
                                    <ChevronDown 
                                        className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                                            activeIssue === issue.id ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {activeIssue === issue.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="px-6 pb-4"
                                    >
                                        <ul className="space-y-3">
                                            {issue.solutions.map((solution, solutionIndex) => (
                                                <li 
                                                    key={solutionIndex}
                                                    className="flex items-start text-gray-600"
                                                >
                                                    <ChevronsRight className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                                    <span>{solution}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Support Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-blue-50 rounded-2xl p-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Still Need Help?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Our payment support team is available 24/7 to assist you with any payment-related issues.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                Contact Support
                            </button>
                            <button className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                View FAQ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Quick Action Card Component
function QuickActionCard({ title, description, icon: Icon, link, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-lg shadow-md p-6 relative overflow-hidden transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
        >
            <div className={`absolute right-0 top-0 w-24 h-24 bg-${color}-100 rounded-bl-full -mr-8 -mt-8`} />
            <div className="relative">
                <Icon className={`w-8 h-8 text-${color}-500 mb-4`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <a 
                    href={link}
                    className={`inline-flex items-center text-${color}-600 hover:text-${color}-700`}
                >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2" />
                </a>
            </div>
        </motion.div>
    );
}