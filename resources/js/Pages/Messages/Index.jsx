import React, { useState, useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Paperclip, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Index({ auth, offering, messages }) {
    const messagesEndRef = useRef(null);
    const [attachments, setAttachments] = useState([]);
    const { data, setData, post, processing, reset } = useForm({
        content: '',
        attachments: []
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        
        // Subscribe to Pusher channel
        const channel = window.Echo.join(`offering.${offering.id}`)
            .listen('MessageSent', (e) => {
                // Handle new message
                messages.data.push(e.message);
                scrollToBottom();
            });

        return () => {
            channel.stopListening();
        };
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('messages.store', offering.id), {
            onSuccess: () => {
                reset('content');
                setAttachments([]);
            }
        });
    };

    const handleFileChange = (e) => {
        setData('attachments', e.target.files);
        setAttachments(Array.from(e.target.files));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Chat - ${offering.title}`} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Card className="h-[calc(100vh-200px)] flex flex-col">
                        {/* Chat Header */}
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-semibold">{offering.title}</h2>
                            <p className="text-sm text-gray-500">
                                Chat with {auth.user.id === offering.user.id ? offering.tutor.name : offering.user.name}
                            </p>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.data.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.user_id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] ${
                                        message.user_id === auth.user.id 
                                            ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg' 
                                            : 'bg-gray-100 rounded-r-lg rounded-tl-lg'
                                    } p-3`}>
                                        <p className="text-sm mb-1">{message.content}</p>
                                        
                                        {/* Attachments */}
                                        {message.attachments?.length > 0 && (
                                            <div className="space-y-1 mt-2">
                                                {message.attachments.map((attachment, index) => (
                                                    <a
                                                        key={index}
                                                        href={`/storage/${attachment}`}
                                                        target="_blank"
                                                        className="block text-xs underline"
                                                    >
                                                        {attachment.split('/').pop()}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                        
                                        <div className="text-xs mt-1 opacity-70">
                                            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t">
                            <form onSubmit={handleSubmit} className="flex items-end gap-2">
                                <div className="flex-1">
                                    <textarea
                                        value={data.content}
                                        onChange={e => setData('content', e.target.value)}
                                        className="w-full rounded-lg border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 transition"
                                        rows="3"
                                        placeholder="Type your message..."
                                    />
                                    
                                    {/* Attachment Preview */}
                                    {attachments.length > 0 && (
                                        <div className="mt-2 space-y-1">
                                            {attachments.map((file, index) => (
                                                <div key={index} className="text-sm text-gray-600">
                                                    {file.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => document.getElementById('file-upload').click()}
                                    >
                                        <Paperclip className="h-4 w-4" />
                                    </Button>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    
                                    <Button 
                                        type="submit" 
                                        disabled={processing || (!data.content && !attachments.length)}
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
