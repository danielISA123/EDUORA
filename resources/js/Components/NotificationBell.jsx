import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { FadeIn } from '@/Components/ui/transitions';

export default function NotificationBell({ notifications = [], onClick }) {
    const unreadCount = notifications.filter(n => !n.read_at).length;

    return (
        <Button
            variant="ghost"
            className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ease-in-out transform hover:scale-105"
            onClick={onClick}
        >
            <Bell className="h-5 w-5 text-gray-600" />
            <FadeIn show={unreadCount > 0}>
                <div className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs items-center justify-center transform transition-transform duration-200 hover:scale-110">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                </div>
            </FadeIn>
        </Button>
    );
}