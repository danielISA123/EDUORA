import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links }) {
    // Don't render if there's only 1 page
    if (links.length <= 3) return null;

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            {links.map((link, key) => {
                // Skip if prev/next and it's disabled to avoid double arrows
                if ((link.label === '&laquo; Previous' || link.label === 'Next &raquo;') && !link.url) {
                    return null;
                }

                return (
                    <Link
                        key={key}
                        href={link.url ?? '#'}
                        className={`
                            px-4 py-2 rounded-md text-sm
                            ${!link.url && 'opacity-50 cursor-not-allowed'}
                            ${link.active ? 
                                'bg-blue-500 text-white' : 
                                'text-gray-700 hover:bg-gray-100'
                            }
                            flex items-center
                        `}
                        preserveScroll
                    >
                        {link.label === '&laquo; Previous' ? (
                            <ChevronLeft className="w-4 h-4" />
                        ) : link.label === 'Next &raquo;' ? (
                            <ChevronRight className="w-4 h-4" />
                        ) : (
                            link.label
                        )}
                    </Link>
                );
            })}
        </div>
    );
}