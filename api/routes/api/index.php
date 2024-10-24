<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(base_path('/routes/api/auth.php'));
Route::prefix('/category')->group(base_path('/routes/api/category.php'));
