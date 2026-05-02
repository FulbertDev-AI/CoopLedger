<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('blockchain_id')->nullable();
            $table->text('description')->nullable();
            $table->bigInteger('amount')->nullable();
            $table->integer('votes_for')->default(0);
            $table->integer('votes_against')->default(0);
            $table->dateTime('deadline')->nullable();
            $table->boolean('executed')->default(false);
            $table->string('result', 50)->nullable();
            $table->unsignedBigInteger('cooperative_id')->nullable();
            $table->timestamps();
            $table->index('deadline');
            $table->index('executed');
        });
    }
    public function down() {
        Schema::dropIfExists('votes');
    }
};
