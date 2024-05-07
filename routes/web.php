<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\RewindingProcedure;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GeneratorController;
use App\Http\Controllers\GeneratorUserController;
use App\Http\Controllers\RewindingProcedureController;

Route::get('/', function () {
    return Inertia::render('HomePage', [
    ]);
})->name('home');

Route::get('/search/{variable}', [GeneratorController::class, 'search'])->name('search');


Route::middleware(['auth', 'verified', 'role:admin|rewinder'])->group(function() {
    Route::get('/approve/{generator}', [GeneratorController::class, 'approve'])->name('generator.approve');
    Route::get('/grantAccess/{generatorUser}', [GeneratorUserController::class, 'approve'])->name('grantAccess');
    Route::post('/testFormula', [GeneratorController::class, 'store'])->name('testFormula');
    Route::get('/generatorForm', [GeneratorController::class, 'generatorForm'])->name('generatorForm');
    Route::post('/generatorUpdate', [RewindingProcedureController::class, 'store'])->name('rewinding.update');
    Route::post('/approveProcedure', [RewindingProcedureController::class, 'approve'])->name('rewinding.approve');
});
Route::middleware(['auth', 'verified'])->group(function () {
    route::get('/rewinder/viewSummary/{generator}', [RewindingProcedureController::class, 'show'])->name('rewinder.viewSummary');
    Route::get('/diagnosisResult/{generator}/show', [GeneratorController::class, 'show'])->name('generator.show');
    Route::get('/dashboard', [GeneratorController::class, 'index'])->name('dashboard');

    Route::get('/accessRequest/{generator}', [GeneratorController::class, 'accessRequest'])->name('accessRequest');

    Route::post('/requestAccess', [GeneratorController::class, 'requestAccess'])->name('requestAccess');

    Route::post('/addComment', [CommentController::class, 'store'])->name('addComment');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
