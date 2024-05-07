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
        Schema::create('diagnosis', function (Blueprint $table) {
            $table->id("diagnosis_id");
            $table->boolean("step_1");
            $table->boolean("step_2");
            $table->boolean("step_3");
            $table->boolean("step_4");
            $table->boolean("step_5")->nullable(true);
            $table->boolean("stator")->nullable(true);
            $table->boolean("rotor")->nullable(true);
            $table->boolean("exciter")->nullable(true);
            $table->string("result");
            $table->integer("prediction")->nullable(true);
            $table->integer("manpower")->nullable(true);
            $table->boolean("materials")->nullable(true);
            $table->foreignId("generator_id")->references("id")->on("generators")->nullable(true);
            $table->string("description")->nullable(true);
            $table->integer("kVa")->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnosis');
    }
};
