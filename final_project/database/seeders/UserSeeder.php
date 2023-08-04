<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the user seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->command->info('SEED NEW USER');
        User::factory(5)->create();
        DB::table('users')->insert($this->getAdmin());
    }

    private function getAdmin(): array {
        return [
            [
                'surname' => 'Иванов',
                'email' => 'iv@mail.ru',
                'password' => Hash::make(123),
                'first_name' => 'Иван',
                'second_name' => 'Иванович',
                'phone' => '9161112233',
                'agent_id' => '3hAELmSQBSCJ6IXbH2gp',
                'role' => 'agent',
                'status' => 1
            ],

            [
                'surname' => 'Петров',
                'email' => 'pp@mail.ru',
                'password' => Hash::make(123),
                'first_name' => 'Петр',
                'second_name' => 'Иванович',
                'phone' => '9165557777',
                'agent_id' => '3hAELmSQBSCJ6IXbH2gp',
                'role' => 'manager',
                'status' => 1
            ]
        ];
    }
}
