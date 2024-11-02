<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class UserHasReadBook extends Model
{
    use HasUuids;

    protected $table = "user_has_read_books";
    protected $fillable = [
        'book_id',
        'user_id',
        'percentage'
    ];
}
