import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, Book, HelpCircle } from 'lucide-react';

export default function ProfileMenu({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        {
            icon: User,
            label: 'My Profile',
            href: '/profile',
        },
        {
            icon: Book,
            label: 'My Offerings',
            href: '/offerings',
        },
        {
            icon: Settings,
            label: 'Settings',
            href: '/settings',
        },
        {
            icon: HelpCircle,
            label: 'Help Center',
            href: '/help',
        },
        {
            icon: LogOut,
            label: 'Log Out',
            href: '/logout',
            method: 'post',
        }
    ];

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
            >
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                        {user?.name?.charAt(0)}
                    </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                    {user?.name}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200"
                        >
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-200">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                {menuItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            method={item.method || 'get'}
                                            as="button"
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            <Icon className="h-4 w-4 mr-3 text-gray-500" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}