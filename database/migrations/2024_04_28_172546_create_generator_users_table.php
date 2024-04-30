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
        Schema::create('generator_users', function (Blueprint $table) {
            $table->unsignedBigInteger('generator_id');
            $table->unsignedBigInteger('user_id');
            $table->string('status')->default('pending');
            $table->id();
            $table->timestamps();

            $table->foreign('generator_id')->references('id')->on('generators');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generator_users');
    }
};
