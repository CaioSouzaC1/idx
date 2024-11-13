<?php

use App\Http\Controllers\UserHasReadBookController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth.api'])->controller(UserHasReadBookController::class)->group(function () {
    Route::post('/', 'store');
    Route::delete('/{id}', action: 'destroy');
    Route::put('/', action: 'update');
    Route::get('/{id}', 'show');
    Route::get('/', 'index');
});
