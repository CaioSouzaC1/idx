<?php

use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::controller(BookController::class)->group(function () {
    Route::post('/', 'store');
    Route::delete('/{id}', action: 'destroy');
    Route::put('/{id}', action: 'update');
    Route::get('/{id}', 'show');
    Route::get('/', 'index');
})->middleware(['user.type:admin']);
