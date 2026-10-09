<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Site\BlogController;
use App\Http\Controllers\Site\CaseSubmissionController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\DirectSupportController;
use App\Http\Controllers\Site\DonationController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\LegalController;
use App\Http\Controllers\Site\NewsletterController;
use App\Http\Controllers\Site\ProgrammeController;
use App\Http\Controllers\Site\TechnicalAssistanceController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/empower-her-wellness', [ProgrammeController::class, 'show'])->defaults('programme', 'empower-her-wellness')->name('programme.empower-her-wellness');
Route::get('/disability-inclusion', [ProgrammeController::class, 'show'])->defaults('programme', 'disability-inclusion')->name('programme.disability-inclusion');
Route::get('/digital-literacy', [ProgrammeController::class, 'show'])->defaults('programme', 'digital-literacy')->name('programme.digital-literacy');
Route::get('/special-projects', [ProgrammeController::class, 'show'])->defaults('programme', 'special-projects')->name('programme.special-projects');

Route::get('/technical-assistance', [TechnicalAssistanceController::class, 'show'])->name('technical-assistance');
Route::post('/technical-assistance', [TechnicalAssistanceController::class, 'store'])->name('technical-assistance.store');

Route::get('/direct-support', [DirectSupportController::class, 'index'])->name('direct-support');

Route::get('/post-your-case', [CaseSubmissionController::class, 'index'])->name('post-your-case');
Route::post('/post-your-case', [CaseSubmissionController::class, 'store'])->name('post-your-case.store');

Route::get('/donations', [DonationController::class, 'show'])->name('donations');
Route::post('/donations', [DonationController::class, 'store'])->name('donations.store');

Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{blog}', [BlogController::class, 'show'])->name('blogs.show');

Route::get('/contact-us', [ContactController::class, 'index'])->name('contact');
Route::post('/contact-us', [ContactController::class, 'store'])->name('contact.store');

Route::get('/terms-and-conditions', [LegalController::class, 'terms'])->name('terms');
Route::get('/privacy-policy', [LegalController::class, 'privacy'])->name('privacy');

Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
