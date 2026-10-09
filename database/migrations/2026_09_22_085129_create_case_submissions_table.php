<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('case_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('nominee_name');
            $table->string('age_range');
            $table->string('gender');
            $table->string('location');
            $table->string('phone');
            $table->text('challenge');
            $table->string('category');
            $table->string('tag')->nullable();
            $table->string('support_type')->default('one_time');
            $table->decimal('amount_needed', 12, 2)->nullable();
            $table->string('nominator_name');
            $table->string('relationship');
            $table->string('nominator_phone')->nullable();
            $table->string('nominator_email');
            $table->boolean('consent_accuracy')->default(false);
            $table->boolean('consent_nominee')->default(false);
            $table->boolean('consent_story')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_submissions');
    }
};
