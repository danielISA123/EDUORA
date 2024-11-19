import React from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { formatDistance } from 'date-fns';
import { CheckCircle, XCircle, Bell, Check } from 'lucide-react';
import { FadeIn } from '@/Components/ui/transitions';

export default function NotificationList({ notifications = [], onMarkAsRead, onMarkAllAsRead, show }) {
    const hasUnreadNotifications = notifications.some(n => !n.read_at);

    const getIcon = (type) => {
        switch (type) {
            case 'App\\Notifications\\TutorVerificationApproved':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'App\\Notifications\\TutorVerificationRejected':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Bell className="h-5 w-5 text-blue-500" />;
        }
    };

    const handleActionClick = (e, url) => {
        e.stopPropagation();
        window.location.href = url;
    };

    return (
        <FadeIn show={show}>
            <Card className="w-96 shadow-lg border-gray-200 transform transition-all">
                <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Notifications</h3>
                        {hasUnreadNotifications && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                                onClick={onMarkAllAsRead}
                            >
                                <Check className="h-4 w-4" />
                                Mark all as read
                            </Button>
                        )}
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                                <Bell className="h-8 w-8 text-gray-400 mb-2" />
                                <p>No notifications</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {notifications.map(notification => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
                                            !notification.read_at ? 'bg-blue-50 hover:bg-blue-100' : ''
                                        }`}
                                        onClick={() => onMarkAsRead(notification)}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 transform transition-transform group-hover:scale-110">
                                                {getIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900 line-clamp-2">
                                                    {notification.data.message}
                                                </p>
                                                {notification.data.action_url && (
                                                    <Button
                                                        variant="link"
                                                        className="mt-2 p-0 h-auto text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                                        onClick={(e) => handleActionClick(e, notification.data.action_url)}
                                                    >
                                                        {notification.data.action_text || 'View'}
                                                    </Button>
                                                )}
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {formatDistance(new Date(notification.created_at), new Date(), {
                                                        addSuffix: true
                                                    })}
                                                </p>
                                            </div>
                                            {!notification.read_at && (
                                                <div className="flex-shrink-0">
                                                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </FadeIn>
    );
}