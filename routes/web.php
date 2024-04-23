<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GeneratorController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/testFormula', [GeneratorController::class,'store'])->middleware(['auth', 'verified'])->name('testFormula');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::post('/testFormula', [GeneratorController::class, 'store'])->name('testFormula');
    Route::get('/diagnosisResult/{generator}/show', [GeneratorController::class, 'show'])->name('generator.show');
    Route::get('/dashboard', [GeneratorController::class, 'index'])->name('dashboard');
    Route::get('/generatorForm', function(){
        return Inertia::render('GeneratorFormPage');
    })->name('generatorForm');
    Route::post('approve/{generator}', [GeneratorController::class, 'approve'])->name('generator.approve');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
