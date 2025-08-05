<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ValidationController;

Route::middleware('throttle:10,1')->group(function () {
    Route::get('/check-username', [ValidationController::class, 'checkUsername']);
    Route::get('/check-email', [ValidationController::class, 'checkEmail']);
});
