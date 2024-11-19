import React from 'react';
import { UploadCloud } from 'lucide-react';

export default function FileInput({ onChange, multiple = false, accept, error }) {
    const handleChange = (e) => {
        const files = multiple ? e.target.files : e.target.files[0];
        onChange(files);
    };

    return (
        <div>
            <label className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors">
                <input
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    multiple={multiple}
                    accept={accept}
                />
                <div className="flex flex-col items-center">
                    <UploadCloud className="h-12 w-12 text-gray-400" />
                    <span className="mt-2 text-gray-600">
                        {multiple ? 'Drop files here or click to upload' : 'Drop file here or click to upload'}
                    </span>
                    <span className="mt-1 text-sm text-gray-500">
                        {accept ? `Accepted formats: ${accept}` : 'All file types accepted'}
                    </span>
                </div>
            </label>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}