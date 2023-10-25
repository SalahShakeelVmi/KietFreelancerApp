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
        Schema::table('project_users', function (Blueprint $table) {
            $table->string('position')->nullable()->after('project_id');
            $table->string('index')->nullable()->after('position');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('project_users', function (Blueprint $table) {
            $table->dropColumn('position');
            $table->dropColumn('index');
        });
    }
};
