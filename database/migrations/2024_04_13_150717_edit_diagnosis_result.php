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
        Schema::table('diagnosis_result', function(Blueprint $table){
            $table->dropColumn('manpower');
            $table->dropColumn('materials');

        });

        Schema::table('diagnosis', function(Blueprint $table){
            $table->integer('manpower');
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
