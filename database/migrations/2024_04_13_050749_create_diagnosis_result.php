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
        Schema::create('diagnosis_result', function (Blueprint $table) {
            $table->id();
            $table->foreignId("diagnosis_id")->references("diagnosis_id")->on("diagnosis");
            $table->string("result");
            $table->boolean("stator");
            $table->boolean("rotor");
            $table->boolean("exciter");
            $table->integer('manpower');
            $table->boolean("materials");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnosis_result');
    }
};
