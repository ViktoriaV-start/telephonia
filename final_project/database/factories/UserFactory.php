<?php

namespace Database\Factories;

use App\Http\Controllers\EmailController;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $data = [
            'surname' => fake('ru_RU')->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Str::random(15), // password
            'remember_token' => Str::random(10),
            'first_name' => fake('ru_RU')->firstName(),
            'second_name'   => fake('ru_RU')->firstName(),
            'phone'       => fake()->phoneNumber(),
            'agent_id'    => Str::random(20),
            'manager_id'  => null,
            'role'        => 'manager',
            'status'      => 1,
            'created_at'  => now(),
            'updated_at'  => now(),
        ];

        $message =  [
            'name' => $data['surname'] . ' ' . $data['first_name'] . ' ' . $data['second_name'],
            'password' => $data['password'],
            'email' =>  $data['email'],
        ];

        $mail = new EmailController;

        $mail->SendMail($data['email'], 'no-reply@teleport.ru', 'Регистрация на портале Телепорт', json_encode($message));

        return $data;
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
//    public function unverified(): static
//    {
//        return $this->state(fn (array $attributes) => [
//            'email_verified_at' => null,
//        ]);
//    }
}
