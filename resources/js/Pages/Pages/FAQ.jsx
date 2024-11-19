import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Book, DollarSign, Shield, Users } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function FAQ() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openQuestion, setOpenQuestion] = useState(null);

    const categories = [
        { id: 'all', name: 'All Questions', icon: Book },
        { id: 'payments', name: 'Payments', icon: DollarSign },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'tutoring', name: 'Tutoring', icon: Users },
    ];

    const faqItems = [
        {
            category: 'payments',
            question: 'How does the payment system work?',
            answer: 'Our platform uses a secure escrow system. When you create an offering, the payment is held safely until the work is completed and approved. We support various payment methods including bank transfers and digital wallets.',
        },
        {
            category: 'payments',
            question: 'What happens if I'm not satisfied with the work?',
            answer: 'We have a satisfaction guarantee policy. If you're not satisfied with the work, you can request revisions. If issues persist, our support team will help mediate and may issue a refund if necessary.',
        },
        {
            category: 'security',
            question: 'How do you verify tutors?',
            answer: 'We have a comprehensive verification process for tutors including academic credential verification, identity checks, and a review of their expertise. Tutors must also maintain high ratings to continue on the platform.',
        },
        {
            category: 'tutoring',
            question: 'How do I choose the right tutor?',
            answer: 'You can review tutor profiles, ratings, and specializations. We also provide detailed reviews from previous students. Additionally, you can chat with tutors before making a decision.',
        },
        // Add more FAQ items here
    ];

    const filteredFAQs = faqItems.filter(item => 
        (activeCategory === 'all' || item.category === activeCategory) &&
        (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <AuthenticatedLayout>
            <Head title="FAQ - Frequently Asked Questions" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-6">
                            How can we help you?
                        </h1>
                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for answers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.button
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`p-4 rounded-lg border ${
                                    activeCategory === category.id 
                                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                                } transition-all duration-200`}
                            >
                                <Icon className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-sm font-medium">{category.name}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                                className="w-full text-left p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                                            openQuestion === index ? 'rotate-180' : ''
                                        }`}
                                    />
                                </div>
                                <AnimatePresence>
                                    {openQuestion === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <p className="mt-4 text-gray-600">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* No Results */}
                {filteredFAQs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            No results found. Try adjusting your search.
                        </p>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}