import React from 'react';
import { Link } from '@inertiajs/react';
import { Search, MessageCircle } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import ProfileMenu from '@/Components/ProfileMenu';
import NotificationDropdown from '@/Components/NotificationDropdown';

export default function Header({ user }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left section - Logo & Search */}
                    <div className="flex items-center flex-1">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-blue-600">Eduora</span>
                        </Link>
                        
                        <div className="ml-8 flex-1 max-w-2xl">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for assignments, tutors, or subjects..."
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Right section - Navigation & Profile */}
                    <div className="flex items-center space-x-6">
                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link 
                                href="/offerings"
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            >
                                Offerings
                            </Link>
                            <Link 
                                href="/tutors"
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            >
                                Find Tutors
                            </Link>
                        </nav>

                        {/* Notifications & Messages */}
                        <div className="flex items-center space-x-4">
                            {/* Notifications Dropdown */}
                            <NotificationDropdown 
                                notifications={[
                                    {
                                        id: 1,
                                        type: 'success',
                                        message: 'Your offering has been accepted by a tutor',
                                        read: false,
                                        created_at: new Date()
                                    },
                                    {
                                        id: 2,
                                        type: 'deadline',
                                        message: 'Assignment deadline in 24 hours',
                                        read: true,
                                        created_at: new Date(Date.now() - 86400000)
                                    }
                                ]} 
                            />

                            {/* Messages Button */}
                            <Link href="/messages">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative"
                                >
                                    <MessageCircle className="h-5 w-5 text-gray-600" />
                                    {/* Message Counter - Show only if there are unread messages */}
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                                        3
                                    </span>
                                </Button>
                            </Link>
                        </div>

                        {/* Profile Menu - Now using the new ProfileMenu component */}
                        <ProfileMenu user={user} />
                    </div>
                </div>
            </div>

            {/* Mobile Navigation - Show on small screens */}
            <div className="sm:hidden border-t border-gray-200">
                <div className="px-4 py-3 space-y-1">
                    <Link 
                        href="/offerings"
                        className="block py-2 text-base text-gray-600 hover:text-gray-900"
                    >
                        Offerings
                    </Link>
                    <Link 
                        href="/tutors"
                        className="block py-2 text-base text-gray-600 hover:text-gray-900"
                    >
                        Find Tutors
                    </Link>
                </div>
            </div>
        </header>
    );
}