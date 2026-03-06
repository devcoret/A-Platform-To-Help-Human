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
        Schema::create('donations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
    $table->foreignId('campaign_id')->nullable()->constrained()->onDelete('cascade');
    $table->string('type');
    $table->string('donor_name')->nullable();
    $table->string('phone')->nullable();
    $table->string('city')->nullable();
    $table->text('notes')->nullable();
    $table->string('image')->nullable();
    $table->integer('donation_count')->nullable();
    $table->decimal('amount', 10, 2)->nullable();
    $table->enum('status',['معلقة','مقبولة','مرفوضة'])->default('معلقة');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
