import React from 'react';

const statusConfigs = {
    pending: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'Pending'
    },
    open: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'Open'
    },
    accepted: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Accepted'
    },
    completed: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label: 'Completed'
    },
    cancelled: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Cancelled'
    }
};

export default function StatusBadge({ status }) {
    const config = statusConfigs[status] || statusConfigs.pending;

    return (
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
            {config.label}
        </span>
    );
}