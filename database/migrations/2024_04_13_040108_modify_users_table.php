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
        Schema::table("users", function(Blueprint $table) {
            $table->string("first_name")->nullable(true);
            $table->string("last_name")->nullable(true);
            $table->string("phone_number")->nullable(true);
            $table->string("employee_id")->nullable(true);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table("users", function(Blueprint $table) {
            $table->dropColumn("first_name");
            $table->dropColumn("last_name");
            $table->dropColumn("phone_number");
            $table->dropColumn("employee_id");
        });
    }
};
