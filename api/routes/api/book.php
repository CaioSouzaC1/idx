<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::middleware(['user.type:admin'])->controller(BookController::class)->group(function () {
    Route::post('/', 'store');
    Route::delete('/{id}', action: 'destroy');
    Route::put('/{id}', action: 'update');
});

Route::controller(BookController::class)->group(function () {
    Route::get('/most-read', action: 'mostRead');
    Route::get('/most-finished', action: 'mostFinished');
    Route::get('/{id}', 'show');
    Route::get('/', action: 'index');
});