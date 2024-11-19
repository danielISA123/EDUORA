import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users, Target, Book, Award, ChevronRight } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function About() {
    return (
        <AuthenticatedLayout>
            <Head title="About Us" />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Empowering Education Through Connection
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            We're bridging the gap between students and expert tutors to create
                            meaningful learning experiences.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform skew-y-1"></div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <StatsCard
                            number="10,000+"
                            label="Active Students"
                            icon={Users}
                            delay={0.1}
                        />
                        <StatsCard
                            number="1,000+"
                            label="Expert Tutors"
                            icon={Target}
                            delay={0.2}
                        />
                        <StatsCard
                            number="50,000+"
                            label="Assignments Completed"
                            icon={Book}
                            delay={0.3}
                        />
                        <StatsCard
                            number="98%"
                            label="Satisfaction Rate"
                            icon={Award}
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600">
                            To make quality education accessible to everyone by connecting students 
                            with the right tutors and providing them with the tools they need to succeed.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="Quality Education"
                            description="We ensure all our tutors are verified experts in their fields"
                            delay={0.1}
                        />
                        <FeatureCard
                            title="Accessible Learning"
                            description="24/7 access to educational resources and support"
                            delay={0.2}
                        />
                        <FeatureCard
                            title="Safe Environment"
                            description="Secure platform with verified users and protected payments"
                            delay={0.3}
                        />
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-white">
                {/* Team content will be added here */}
            </div>
        </AuthenticatedLayout>
    );
}

function StatsCard({ number, label, icon: Icon, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center"
        >
            <Icon className="w-8 h-8 mx-auto mb-4 text-blue-500" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{number}</h3>
            <p className="text-gray-600">{label}</p>
        </motion.div>
    );
}

function FeatureCard({ title, description, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-100"
        >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
            <div className="mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-600 inline-flex items-center">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </a>
            </div>
        </motion.div>
    );
}