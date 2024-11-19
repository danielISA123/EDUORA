// resources/js/Components/Footer.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { Github, ChevronRight, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Eduora</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            Connecting students with expert tutors for better learning outcomes.
                            Empowering education through collaborative learning.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Help Center</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Terms & Conditions</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/assignments" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Find Assignments</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutors" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Find Tutors</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/become-tutor" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Become a Tutor</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Support */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>FAQ</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Privacy Policy</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/support/payment" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Payment Support</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/support/safety" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Safety Guidelines</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/report" className="text-sm text-gray-600 hover:text-gray-900 group flex items-center transition-colors duration-150">
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                                    <span>Report an Issue</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect & Newsletter */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Subscribe to our newsletter for the latest updates and educational resources.
                        </p>
                        <form className="space-y-3">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-gray-500">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
                            </p>
                        </form>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <p className="text-sm text-gray-500 text-center md:text-left">
                            © {new Date().getFullYear()} Eduora. All rights reserved.
                        </p>
                        <div className="flex justify-center md:justify-end space-x-6">
                            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                                Terms
                            </Link>
                            <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                                Privacy
                            </Link>
                            <Link href="/cookies" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-150">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
