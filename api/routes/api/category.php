<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;


Route::controller(CategoryController::class)->group(function () {
    Route::post('/', 'store');
    Route::delete('/{id}', action: 'destroy');
    Route::put('/{id}', action: 'update');
})->middleware(['user.type:admin']);

Route::controller(CategoryController::class)->group(function () {
    Route::get('/most-read', action: 'mostRead');
    Route::get('/{id}', 'show');
    Route::get('/', 'index');
});
