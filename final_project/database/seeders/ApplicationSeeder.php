<?php

namespace Database\Seeders;

use App\Models\Application;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

const AGENT_ID = "Kk3sh9SUGNCUDxOue7K6";

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Application::factory()
            ->count(15)
            ->create();

        DB::table('applications')->insert($this->getApplications());
    }

    private function getApplications():array {
        return [

            [
                'order'              => '8(800) 111-22-33',
                'client_name'        => 'Леонидов Сергей Алексеевич',
                'client_phone'       => 89165233263,
                'description'        => 'Перезвонить 01.07',
                'status'             => 'в работе',
                'partner_id'         => AGENT_ID,
                'user_id'            => 1
            ],
            [
                'order'              => '8(800) 222-32-32, 8(804) 745-11-11, 8(985) 323-22-22',
                'client_name'        => 'Коршунов Олег Иванович',
                'client_phone'       => 89165523878,
                'description'        => 'Предоставить полную информацию по ценам на серебрянные городские номера',
                'status'             => 'в работе',
                'partner_id'         => AGENT_ID,
                'user_id'            => 2
            ],

        ];
    }
}
