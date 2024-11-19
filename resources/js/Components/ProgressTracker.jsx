import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function ProgressTracker({ assignments }) {
    const getStatusColor = (status, deadline) => {
        if (status === 'completed') return 'bg-green-500';
        if (new Date(deadline) < new Date()) return 'bg-red-500';
        return 'bg-yellow-500';
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Assignment Progress</h3>
            <div className="space-y-4">
                {assignments.map((assignment, index) => (
                    <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-medium">{assignment.title}</h4>
                                <div className="flex items-center mt-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>
                                        {new Date(assignment.deadline).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                {assignment.status === 'completed' ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : new Date(assignment.deadline) < new Date() ? (
                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                ) : (
                                    <Clock className="w-5 h-5 text-yellow-500" />
                                )}
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${getStatusColor(assignment.status, assignment.deadline)}`}
                                    style={{ width: `${assignment.progress}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}