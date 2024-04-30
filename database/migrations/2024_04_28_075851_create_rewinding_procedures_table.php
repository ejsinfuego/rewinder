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
        Schema::create('rewinding_procedures', function (Blueprint $table) {
            $table->id("procedure_id");
            $table->foreignId("generator_id")->references("id")->on("generators")->nullable(true);
            $table->string("step");
            $table->string("description")->nullable();
            $table->string("image")->nullable();
            $table->string("comment")->nullable();
            $table->foreignId("user_id")->references("id")->on("users")->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rewinding_procedures');
    }
};
