import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { 
    Menu, 
    Bell, 
    MessageCircle, 
    ChevronDown, 
    Search,
    LogOut,
    User,
    Settings,
    HelpCircle
} from 'lucide-react';

export default function Authenticated({ auth = {}, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    
    // Provide default values if auth.user is not available
    const user = auth?.user || {};
    const userName = user?.name || 'Guest';
    
    const navigation = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Offerings', href: '/offerings' },
        { name: 'Tutors', href: '/tutors' },
    ];

    const userNavigation = [
        { name: 'Your Profile', href: '/profile', icon: User },
        { name: 'Settings', href: '/profile/settings', icon: Settings },
        { name: 'Help Center', href: '/help', icon: HelpCircle },
    ];

    // Footer Links
    const footerLinks = {
        quickLinks: [
            { name: 'About Us', href: '/about' },
            { name: 'Help Center', href: '/help' },
            { name: 'Terms & Conditions', href: '/terms' },
            { name: 'Find Assignments', href: '/assignments' },
            { name: 'Find Tutors', href: '/tutors' },
            { name: 'Become a Tutor', href: '/become-tutor' }
        ],
        support: [
            { name: 'Contact Us', href: '/contact' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Payment Support', href: '/support/payment' },
            { name: 'Safety Guidelines', href: '/support/safety' },
            { name: 'Report an Issue', href: '/report' }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo & Main Navigation */}
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {navigation.map((item) => (
                                    <NavLink 
                                        key={item.name}
                                        href={item.href}
                                        active={route().current(item.href)}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-xl px-4 hidden lg:flex items-center">
                            <div className="w-full relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full rounded-full bg-gray-50 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Right Navigation */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            {/* Notifications */}
                            <button className="relative p-2 text-gray-600 hover:text-gray-900">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                    2
                                </span>
                            </button>

                            {/* Messages */}
                            <button className="relative p-2 text-gray-600 hover:text-gray-900">
                                <MessageCircle className="h-6 w-6" />
                                <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                                    3
                                </span>
                            </button>

                            {/* User Menu */}
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                                    <span className="text-sm font-medium text-gray-600">
                                                        {userName.charAt(0)}
                                                    </span>
                                                </div>
                                                {userName}

                                                <ChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {userNavigation.map((item) => (
                                            <Dropdown.Link 
                                                key={item.name} 
                                                href={item.href}
                                                className="flex items-center"
                                            >
                                                <item.icon className="mr-2 h-4 w-4 text-gray-500" />
                                                {item.name}
                                            </Dropdown.Link>
                                        ))}
                                        <Dropdown.Link 
                                            href={route('logout')} 
                                            method="post" 
                                            as="button"
                                            className="flex items-center"
                                        >
                                            <LogOut className="mr-2 h-4 w-4 text-gray-500" />
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} sm:hidden`}>
                    <div className="pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <ResponsiveNavLink
                                key={item.name}
                                href={item.href}
                                active={route().current(item.href)}
                            >
                                {item.name}
                            </ResponsiveNavLink>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Eduora</h3>
                            <p className="text-gray-600 mb-4">
                                Connecting students with expert tutors for better learning outcomes.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
                                Quick Links
                            </h3>
                            <ul className="space-y-2">
                                {footerLinks.quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
                                Support
                            </h3>
                            <ul className="space-y-2">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-600 hover:text-gray-900 transition-colors duration-150"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-4">
                                Stay Updated
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Subscribe to our newsletter for the latest updates.
                            </p>
                            <form className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-600 text-sm">
                                © {new Date().getFullYear()} Eduora. All rights reserved.
                            </p>
                            <div className="mt-4 md:mt-0">
                                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm mx-3">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm mx-3">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}