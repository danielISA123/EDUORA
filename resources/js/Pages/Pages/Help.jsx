import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Search, 
    Book, 
    DollarSign, 
    Shield, 
    Users, 
    MessageSquare,
    LifeBuoy,
    FileText,
    AlertCircle
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Help() {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        {
            id: 'getting-started',
            icon: Book,
            title: 'Getting Started',
            description: 'Learn the basics of using Eduora',
            articles: [
                'How to Create an Account',
                'Setting Up Your Profile',
                'Finding the Right Tutor'
            ],
            color: 'blue'
        },
        {
            id: 'payments',
            icon: DollarSign,
            title: 'Payments & Billing',
            description: 'Everything about payments and pricing',
            articles: [
                'Payment Methods',
                'Refund Policy',
                'Pricing Structure'
            ],
            color: 'green'
        },
        {
            id: 'security',
            icon: Shield,
            title: 'Account Security',
            description: 'Keep your account safe and secure',
            articles: [
                'Two-Factor Authentication',
                'Password Guidelines',
                'Security Best Practices'
            ],
            color: 'purple'
        },
        {
            id: 'tutoring',
            icon: Users,
            title: 'Tutoring Sessions',
            description: 'Learn about tutoring process',
            articles: [
                'Scheduling Sessions',
                'Communication Guidelines',
                'Rating System'
            ],
            color: 'orange'
        }
    ];

    const popularArticles = [
        {
            title: 'How to Submit an Assignment',
            views: '2.5k',
            category: 'Getting Started',
            icon: FileText
        },
        {
            title: 'Payment Protection Guide',
            views: '1.8k',
            category: 'Payments',
            icon: Shield
        },
        {
            title: 'Communication Guidelines',
            views: '1.2k',
            category: 'Tutoring',
            icon: MessageSquare
        }
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Help Center" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <LifeBuoy className="w-16 h-16 text-white/80 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-white mb-4">
                            How can we help you?
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Search our knowledge base or browse categories below to find answers
                        </p>
                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Help Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className={`w-12 h-12 rounded-lg bg-${category.color}-100 flex items-center justify-center mb-4`}>
                                    <Icon className={`w-6 h-6 text-${category.color}-600`} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {category.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {category.description}
                                </p>
                                <ul className="space-y-2">
                                    {category.articles.map((article, idx) => (
                                        <li key={idx}>
                                            <a href="#" className="text-blue-600 hover:text-blue-700 text-sm flex items-center">
                                                <ChevronRight className="w-4 h-4 mr-1" />
                                                {article}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Popular Articles Section */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {popularArticles.map((article, index) => {
                            const Icon = article.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <Icon className="w-8 h-8 text-blue-600 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span className="mr-4">{article.category}</span>
                                        <span>{article.views} views</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Need More Help Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-blue-50 rounded-2xl p-8 text-center">
                    <AlertCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Still Need Help?
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                        Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Contact Support
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}