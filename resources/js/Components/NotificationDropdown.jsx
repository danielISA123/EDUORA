import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationDropdown({ notifications = [] }) {
    const [isOpen, setIsOpen] = useState(false);

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'warning':
                return <AlertCircle className="h-5 w-5 text-yellow-500" />;
            case 'deadline':
                return <Clock className="h-5 w-5 text-blue-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="relative">
            {/* Notification Bell */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
                <Bell className="h-6 w-6 text-gray-600" />
                {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200"
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                                <h3 className="text-sm font-semibold">Notifications</h3>
                                <button 
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                    onClick={() => {/* Mark all as read */}}
                                >
                                    Mark all as read
                                </button>
                            </div>

                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 ${!notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'} border-b border-gray-200 last:border-0`}
                                        >
                                            <div className="flex items-start space-x-3">
                                                {getIcon(notification.type)}
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-900">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-gray-500">
                                        No notifications
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}