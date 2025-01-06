import React from 'react';

export default function SkeletonLoader() {
    return (
        <div className="flex flex-col gap-4">
            <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
    );
}
