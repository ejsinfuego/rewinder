<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $rewinder = Role::where('id', 3)->first();
        $client = Role::where('id', 2)->first();
        $admin = Role::where('id', 1)->first();

        $client->givePermissionTo('client');
        $admin->givePermissionTo('admin');
        $rewinder->givePermissionTo('rewinder');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
