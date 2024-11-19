import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/Components/ui/card';
import { Clock, DollarSign, User, Tag } from 'lucide-react';
import { formatDistance } from 'date-fns';

export default function OfferingFeed({ initialOfferings = [] }) {
    const [offerings, setOfferings] = useState(initialOfferings);

    useEffect(() => {
        // Subscribe to real-time updates
        const channel = window.Echo.channel('offerings');
        
        channel.listen('.offering.created', (data) => {
            setOfferings(prev => [data.offering, ...prev]);
        });

        channel.listen('.offering.updated', (data) => {
            setOfferings(prev => prev.map(offering => 
                offering.id === data.offering.id ? data.offering : offering
            ));
        });

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="space-y-4">
            <AnimatePresence>
                {offerings.map((offering) => (
                    <motion.div
                        key={offering.id}
                        layout
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={cardVariants}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        <Card className="p-4 hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">{offering.title}</h3>
                                    <p className="text-gray-600 line-clamp-2">{offering.description}</p>
                                    
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {formatDistance(new Date(offering.deadline), new Date(), { addSuffix: true })}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4" />
                                            Rp {offering.budget.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {offering.user.name}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        offering.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        offering.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {offering.status.charAt(0).toUpperCase() + offering.status.slice(1)}
                                    </span>

                                    {offering.tags?.length > 0 && (
                                        <div className="flex gap-1">
                                            {offering.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                                >
                                                    <Tag className="w-3 h-3 mr-1" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Progress indicator */}
                            {offering.progress !== undefined && (
                                <div className="mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <motion.div
                                            className="bg-blue-500 h-1.5 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${offering.progress}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}