import React, { useState, useRef } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function FileUpload({ onUpload, value = [], error }) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (inputFiles) => {
        const newFiles = [...value];
        for (const file of inputFiles) {
            // Prevent duplicate files
            if (!value.find(f => f.name === file.name)) {
                newFiles.push(file);
            }
        }
        onUpload(newFiles);
    };

    const removeFile = (fileToRemove) => {
        const newFiles = value.filter(file => 
            file.name !== fileToRemove.name
        );
        onUpload(newFiles);
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div>
            <form
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
                className="relative"
            >
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                    className="hidden"
                />

                <div
                    className={`
                        p-6 border-2 border-dashed rounded-lg
                        ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                        ${error ? 'border-red-500' : ''}
                        transition-all duration-200 ease-in-out
                    `}
                >
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <UploadCloud className={`w-12 h-12 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                        <div className="flex flex-col items-center text-center">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={onButtonClick}
                                className="relative"
                            >
                                <span>Choose files</span>
                                <span className="mx-2">or drag them here</span>
                            </Button>
                            <p className="text-sm text-gray-500 mt-2">
                                Supported files: PDF, DOC, DOCX, JPG, JPEG, PNG, ZIP
                            </p>
                        </div>
                    </div>
                </div>

                {dragActive && (
                    <div
                        className="absolute inset-0"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    />
                )}
            </form>

            {/* File List */}
            {value.length > 0 && (
                <div className="mt-4 space-y-2">
                    {value.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">{file.name}</span>
                                <span className="text-xs text-gray-400">
                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}