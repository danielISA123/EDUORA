import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    MessageCircle, 
    Mail, 
    Phone, 
    MapPin, 
    Clock,
    AlertCircle,
    Send,
    CheckCircle,
    HelpCircle
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const categories = [
        { id: 'general', label: 'General Inquiry' },
        { id: 'technical', label: 'Technical Support' },
        { id: 'billing', label: 'Billing & Payments' },
        { id: 'report', label: 'Report an Issue' },
        { id: 'feedback', label: 'Platform Feedback' },
        { id: 'partnership', label: 'Partnership Inquiry' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
            setSuccess(true);
            setForm({
                name: '',
                email: '',
                subject: '',
                category: '',
                message: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Contact Us" />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <MessageCircle className="w-16 h-16 text-white/80 mx-auto mb-6" />
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            We're here to help. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                    >
                        <Mail className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                        <p className="text-gray-600">support@eduora.com</p>
                        <p className="text-sm text-gray-500 mt-1">24/7 Support</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                    >
                        <Clock className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                        <p className="text-gray-600">Monday - Friday</p>
                        <p className="text-sm text-gray-500 mt-1">9:00 AM - 6:00 PM WIB</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
                    >
                        <MapPin className="w-8 h-8 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Location</h3>
                        <p className="text-gray-600">Jakarta, Indonesia</p>
                        <p className="text-sm text-gray-500 mt-1">Head Office</p>
                    </motion.div>
                </div>

                {/* Contact Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
                        >
                            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">
                                        Thank you for contacting us. We'll get back to you soon.
                                    </p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Form fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="What is this about?"
                                        />
                                    </div>

                                    {/* Category Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={form.category}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.id}>
                                                    {category.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Message Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center ${
                                            submitting 
                                                ? 'bg-blue-400 cursor-not-allowed' 
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        } transition-colors duration-200`}
                                    >
                                        {submitting ? (
                                            <>
                                                <svg 
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle 
                                                        className="opacity-25" 
                                                        cx="12" 
                                                        cy="12" 
                                                        r="10" 
                                                        stroke="currentColor" 
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path 
                                                        className="opacity-75" 
                                                        fill="currentColor" 
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>

                    {/* FAQ Sidebar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
                    >
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <HelpCircle className="w-5 h-5 mr-2" />
                            Common Questions
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                    What is your response time?
                                </h4>
                                <p className="text-sm text-gray-600">
                                    We typically respond to all inquiries within 24 hours during business days.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                    How can I track my issue?
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Once submitted, you'll receive a ticket number via email to track your inquiry.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2">
                                    Need urgent help?
                                </h4>
                                <p className="text-sm text-gray-600">
                                    For urgent matters, please contact our support hotline available 24/7.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <a 
                                href="/help" 
                                className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                            >
                                Visit our Help Center
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}