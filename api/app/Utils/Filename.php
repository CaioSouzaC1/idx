<?php

namespace App\Utils;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class Filename
{
    public static function formatImageName(UploadedFile $file): string
    {
        return Str::uuid() . time() . str_replace(' ', '_', $file->getClientOriginalName());
    }
}
