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
            $table->boolean("step_5");
            $table->boolean("stator");
            $table->boolean("rotor");
            $table->boolean("exciter");
            $table->string("result");
            $table->integer("prediction");
            $table->foreignId("generator_id")->references("id")->on("generators")->nullable(true);
            $table->string("description")->nullable(true);
            $table->integer("kVa")->nullable(true);
            $table->timestamps();
        });

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
        Schema::dropIfExists('diagnosis');
    }
};
