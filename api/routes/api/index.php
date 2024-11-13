<?php

use App\Builder\ReturnApi;
use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(base_path('/routes/api/auth.php'));
Route::prefix('/category')->group(base_path('/routes/api/category.php'));
Route::prefix('/book')->group(base_path('/routes/api/book.php'));
Route::prefix('/read')->group(base_path('/routes/api/read.php'));


Route::get('/test', function () {
    return ReturnApi::success([
        'test' => true
    ]);
});