<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('campaigns', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->decimal('target_amount', 12, 2);
        $table->decimal('collected_amount', 12, 2)->default(0);
        $table->date('end_date');
        $table->text('description');
        $table->enum('category',
         [
            'التعليم','صحه','ماء','غذاء','ايتام','اخري'
         ]);
        $table->enum('status', ['فعالة','منتهية'])->default('فعالة');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
