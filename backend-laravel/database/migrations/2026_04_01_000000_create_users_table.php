<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('wallet_address')->unique();
            $table->string('name')->nullable();
            $table->enum('role', ['president', 'treasurer', 'member', 'partner'])->default('member');
            $table->unsignedBigInteger('cooperative_id')->nullable();
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('users');
    }
};
