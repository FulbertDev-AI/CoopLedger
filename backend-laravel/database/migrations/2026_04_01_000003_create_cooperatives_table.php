<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('cooperatives', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('contract_address')->unique()->nullable();
            $table->string('voting_contract_address')->nullable();
            $table->string('region')->nullable();
            $table->bigInteger('total_balance')->default(0);
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('cooperatives');
    }
};
