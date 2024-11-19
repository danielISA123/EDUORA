import React from 'react';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import debounce from 'lodash/debounce';

export default function OfferingFilters({ initialFilters = {} }) {
    const { data, setData } = useForm({
        search: initialFilters.search || '',
        status: initialFilters.status || '',
        min_budget: initialFilters.min_budget || '',
        max_budget: initialFilters.max_budget || '',
        sort: initialFilters.sort || 'latest'
    });

    const [showFilters, setShowFilters] = React.useState(false);

    // Debounced search to prevent too many requests
    const debouncedSearch = React.useMemo(
        () => debounce((query) => {
            router.get(
                route('offerings.index'),
                { ...data, search: query },
                { preserveState: true, preserveScroll: true }
            );
        }, 300),
        [data]
    );

    const handleSearch = (e) => {
        setData('search', e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleFilter = () => {
        router.get(
            route('offerings.index'),
            data,
            { preserveState: true }
        );
    };

    const clearFilters = () => {
        setData({
            search: '',
            status: '',
            min_budget: '',
            max_budget: '',
            sort: 'latest'
        });
        router.get(route('offerings.index'));
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Search offerings..."
                    value={data.search}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                {Object.values(data).some(Boolean) && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                    >
                        <X className="h-4 w-4" />
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={data.status}
                            onChange={e => {
                                setData('status', e.target.value);
                                handleFilter();
                            }}
                            className="w-full rounded-md border-gray-300"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="open">Open</option>
                            <option value="accepted">Accepted</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Min Budget
                        </label>
                        <input
                            type="number"
                            value={data.min_budget}
                            onChange={e => {
                                setData('min_budget', e.target.value);
                                handleFilter();
                            }}
                            placeholder="Minimum"
                            className="w-full rounded-md border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Budget
                        </label>
                        <input
                            type="number"
                            value={data.max_budget}
                            onChange={e => {
                                setData('max_budget', e.target.value);
                                handleFilter();
                            }}
                            placeholder="Maximum"
                            className="w-full rounded-md border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sort By
                        </label>
                        <select
                            value={data.sort}
                            onChange={e => {
                                setData('sort', e.target.value);
                                handleFilter();
                            }}
                            className="w-full rounded-md border-gray-300"
                        >
                            <option value="latest">Latest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="budget_high">Highest Budget</option>
                            <option value="budget_low">Lowest Budget</option>
                            <option value="deadline">Deadline</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}