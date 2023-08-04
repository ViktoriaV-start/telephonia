<?php

namespace App\Repositories;


use App\Models\Application;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use mysql_xdevapi\DatabaseObject;

class ApplicationRepository
{
    public function getRelation($fieldId): Model {
        return User::query()->where('id', '=', $fieldId)->first();
    }
}
