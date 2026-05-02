<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('vote_records', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vote_id');
            $table->string('user_address');
            $table->boolean('choice');
            $table->timestamp('voted_at')->useCurrent();
            $table->foreign('vote_id')->references('id')->on('votes')->onDelete('cascade');
            $table->unique(['vote_id', 'user_address']);
        });
    }
    public function down() {
        Schema::dropIfExists('vote_records');
    }
};
