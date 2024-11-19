<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Offering;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Events\MessageSent;

class MessagesController extends Controller
{
    public function index(Offering $offering)
    {
        $this->authorize('view', $offering);

        $messages = $offering->messages()
            ->with('user')
            ->latest()
            ->paginate(50);

        // Mark unread messages as read
        $offering->messages()
            ->where('user_id', '!=', auth()->id())
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return Inertia::render('Messages/Index', [
            'offering' => $offering->load('user', 'tutor'),
            'messages' => $messages
        ]);
    }

    public function store(Request $request, Offering $offering)
    {
        $this->authorize('view', $offering);

        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'attachments.*' => 'sometimes|file|max:10240'
        ]);

        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('chat-attachments', 'public');
                $attachments[] = $path;
            }
        }

        $message = $offering->messages()->create([
            'user_id' => auth()->id(),
            'content' => $validated['content'],
            'attachments' => $attachments
        ]);

        // Broadcast message event for real-time updates
        broadcast(new MessageSent($message))->toOthers();

        return back();
    }

    public function markAsRead(Message $message)
    {
        $this->authorize('view', $message->offering);
        
        if ($message->user_id !== auth()->id()) {
            $message->markAsRead();
        }

        return response()->json(['success' => true]);
    }

    public function destroy(Message $message)
    {
        $this->authorize('delete', $message);

        // Delete attachments
        if (!empty($message->attachments)) {
            foreach ($message->attachments as $attachment) {
                Storage::disk('public')->delete($attachment);
            }
        }

        $message->delete();

        return back()->with('success', 'Message deleted successfully.');
    }
}