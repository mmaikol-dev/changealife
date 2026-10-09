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
        Schema::create('support_cases', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('location');
            $table->string('county');
            $table->decimal('amount_needed', 12, 2);
            $table->decimal('amount_raised', 12, 2)->default(0);
            $table->string('status')->default('open');
            $table->string('gender')->nullable();
            $table->string('age_range')->nullable();
            $table->json('categories');
            $table->json('tags')->nullable();
            $table->string('image')->nullable();
            $table->boolean('featured')->default(false);
            $table->timestamp('posted_at')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('county');
            $table->index('featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('support_cases');
    }
};
