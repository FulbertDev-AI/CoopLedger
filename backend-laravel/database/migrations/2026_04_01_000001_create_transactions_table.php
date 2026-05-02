<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('blockchain_hash')->unique()->nullable();
            $table->string('author_address');
            $table->text('description')->nullable();
            $table->bigInteger('amount');
            $table->string('category', 50)->nullable();
            $table->dateTime('transaction_date')->nullable();
            $table->boolean('confirmed')->default(false);
            $table->unsignedBigInteger('cooperative_id')->nullable();
            $table->timestamps();
            $table->index('category');
            $table->index('transaction_date');
        });
    }
    public function down() {
        Schema::dropIfExists('transactions');
    }
};
