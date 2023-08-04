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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('order', 150)->unique()->nullable();
            $table->string('client_name', 100)->nullable();
            $table->unsignedBigInteger('client_phone')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['в работе', 'отказано', 'подтверждено'])->default('в работе');
            $table->string('partner_id', 25)->nullable();
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
