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
        //
        Schema::table('diagnosis', function(Blueprint $table){
            $table->boolean("step_5")->nullable(true)->change();
            $table->boolean("stator")->nullable(true)->change();
            $table->boolean("rotor")->nullable(true)->change();
            $table->boolean("exciter")->nullable(true)->change();
            $table->integer("prediction")->nullable(true)->change();
            $table->integer("manpower")->nullable(true)->change();
            $table->boolean("materials")->nullable(true)->change();
            $table->string("description")->nullable(true)->change();
            $table->integer("kVa")->nullable(true)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
