<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $model = new User;
        $agent_id = $model->select('agent_id')->where('agent_id', 'LIKE', null)->first()->value('agent_id');
        return [
            'order'       => fake()->biasedNumberBetween(88000000000, 88049999999),
            'client_name'        => fake('ru_RU')->name(),
            'client_phone'       => fake()->biasedNumberBetween(10000000000, 99999999999),
            'description' => fake('ru_RU')->text,
            'status'      => fake()->randomElement(['в работе', 'отказано', 'подтверждено']),
            'partner_id'  => $agent_id,
            'user_id'    => fake()->biasedNumberBetween(1, 7),
            'created_at'  => now(),
            'updated_at'  => now(),
        ];
    }
}

