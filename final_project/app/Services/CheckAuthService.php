<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class CheckAuthService
{
    public function checkAuth()
    {
        if (Auth::user()) {
            $user = Auth::user();
            return [
                'status' => true,
                'name' => $user['first_name'],
                'surname' => $user['surname'],
                'id' => $user['id'],
                'role' => $user['role'],
                'agentId' => $user['agent_id'],
                'adminData' => $user,
            ];
        } else {
            return ['status' => false];
        }
    }
}

