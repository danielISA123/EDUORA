<?php

namespace Tests\Unit;

use App\Services\FileUploadService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FileUploadServiceTest extends TestCase
{
    protected $fileUploadService;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');
        $this->fileUploadService = new FileUploadService();
    }

    public function test_can_upload_file()
    {
        // Create fake file using Laravel's testing helpers
        $file = UploadedFile::fake()->image('test.jpg', 100, 100);
        
        $path = $this->fileUploadService->upload($file, 'test');
        
        Storage::disk('public')->assertExists($path);
    }

    public function test_can_delete_file()
    {
        // Upload a test file first
        $file = UploadedFile::fake()->image('test.jpg', 100, 100);
        $path = $this->fileUploadService->upload($file, 'test');
        
        // Test deletion
        $result = $this->fileUploadService->delete($path);
        
        $this->assertTrue($result);
        Storage::disk('public')->assertMissing($path);
    }

    public function test_can_get_file_url()
    {
        // Upload a test file first
        $file = UploadedFile::fake()->image('test.jpg', 100, 100);
        $path = $this->fileUploadService->upload($file, 'test');
        
        $url = $this->fileUploadService->getUrl($path);
        
        $this->assertNotNull($url);
        $this->assertStringContainsString('/storage/', $url);
    }

    public function test_delete_returns_false_for_null_path()
    {
        $result = $this->fileUploadService->delete(null);
        $this->assertFalse($result);
    }

    public function test_get_url_returns_null_for_null_path()
    {
        $url = $this->fileUploadService->getUrl(null);
        $this->assertNull($url);
    }
}