<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Product management
    Route::resource('products', ProductController::class);
    
    // Customer management
    Route::resource('customers', CustomerController::class);
    
    // Order management
    Route::resource('orders', OrderController::class);
    
    // Reports
    Route::resource('reports', ReportController::class)->only(['index', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
