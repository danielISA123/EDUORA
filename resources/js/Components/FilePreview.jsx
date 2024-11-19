import React, { useState } from 'react';
import { 
    FileText, 
    Image, 
    File, 
    Download,
    X,
    Eye,
    FileArchive,
    FilePdf 
} from 'lucide-react';
import { Button } from '@/Components/ui/button';

export default function FilePreview({ file, onRemove, canPreview = true }) {
    const [showPreview, setShowPreview] = useState(false);

    const getFileIcon = (mimeType) => {
        if (mimeType.startsWith('image/')) return Image;
        if (mimeType === 'application/pdf') return FilePdf;
        if (mimeType.includes('zip') || mimeType.includes('rar')) return FileArchive;
        if (mimeType.includes('document') || mimeType.includes('msword')) return FileText;
        return File;
    };

    const FileIcon = getFileIcon(file.type);

    const canShowPreview = () => {
        return canPreview && (
            file.type.startsWith('image/') ||
            file.type === 'application/pdf'
        );
    };

    return (
        <div className="relative bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    <FileIcon className="w-8 h-8 text-gray-500" />
                </div>
                
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>

                <div className="flex-shrink-0 space-x-2">
                    {canShowPreview() && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPreview(true)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                    )}
                    
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(URL.createObjectURL(file))}
                        className="text-green-600 hover:text-green-800"
                    >
                        <Download className="w-4 h-4" />
                    </Button>

                    {onRemove && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemove(file)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{file.name}</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPreview(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        
                        <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(90vh - 10rem)' }}>
                            {file.type.startsWith('image/') ? (
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt={file.name}
                                    className="max-w-full h-auto" 
                                />
                            ) : file.type === 'application/pdf' ? (
                                <iframe
                                    src={URL.createObjectURL(file)}
                                    className="w-full h-[70vh]"
                                    title={file.name}
                                />
                            ) : (
                                <div className="text-center py-8">
                                    <FileIcon className="w-16 h-16 mx-auto text-gray-400" />
                                    <p className="mt-4 text-gray-600">
                                        Preview not available for this file type
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}