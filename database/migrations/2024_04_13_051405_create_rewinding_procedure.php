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
        Schema::create('rewinding_procedure', function (Blueprint $table) {
            $table->id("procedure_id");
            $table->foreignId("diagnosis_id")->references("diagnosis_id")->on("diagnosis")->nullable(true);
            $table->string("step");
            $table->string("description");
            $table->string("image");
            $table->string("comment");
            $table->foreignId("user_id")->references("id")->on("users")->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rewinding_procedure');
    }
};
