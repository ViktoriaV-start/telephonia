<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'surname',
        'email',
        'password',
        'first_name',
        'second_name',
        'phone',
        'role',
        'status',
        'agent_id',
//        'manager_id',
//        'created_at',
//        'updated_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = \Hash::make($password);
    }

    public function getAllManagers($search, $column, $order): object
    {
        return $this->select('surname', 'email', 'first_name', 'second_name',
            'phone', 'role', 'status', 'agent_id', 'manager_id', 'created_at', 'updated_at', 'id')
            ->where(function ($w) use ($search) {
                $w->orWhere('surname', 'like', '%'. $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('first_name', 'like', '%' . $search . '%')
                    ->orWhere('second_name', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('role', 'like', '%' . $search . '%')
                    ->orWhere('status', 'like', '%' . $search . '%')
                    ->orWhere('agent_id', 'like', '%' . $search . '%')
                    ->orWhere('manager_id', 'like', '%' . $search . '%')
                    ->orWhere('created_at', 'like', '%' . $search . '%')
                    ->orWhere('updated_at', 'like', '%' . $search . '%')
                    ->orWhere('id', 'like', '%' . $search . '%');
            })
            ->orderBy($column, $order);
    }

    public function getAllManagersToPaginate($pageNumber, $search, $column, $order, $perPages): object
    {
        return $this->getAllManagers($search, $column, $order)
            ->paginate($perPage = $perPages, $columns = ['*'], $pageName = 'users', $page = $pageNumber);
    }

    public function rules(): array
    {
        return [
            'surname' => 'required|min:2|max:20',
            'email' => 'required|email:rfc,dns',
            'email_verified_at' => 'nullable|date',
            'password' => 'required|min:3|max:30',
            'remember_token' => 'nullable|min:10|max:100',
            'first_name' => 'nullable|min:3|max:30',
            'second_name' => 'nullable|min:2|max:30',
            'phone' => 'nullable|min:2|max:25',
            'agent_id' => 'nullable|min:5|max:25',
            'manager_id' => 'nullable|min:5|max:25',
            'role' => 'nullable|min:5|max:20',
            'status' => 'nullable|min:1|max:5',
        ];
    }

    public function rulesForEditUser(): array
    {
        return [
            'surname' => 'required|min:2|max:20',
            'email' => 'required',
            'first_name' => 'nullable|min:3|max:30',
            'phone' => 'nullable|min:2|max:25',
            'agent_id' => 'nullable|min:5|max:25',
            'manager_id' => 'nullable|min:5|max:25',
            'role' => 'nullable|min:5|max:20',
            'status' => 'nullable|min:1|max:5',
        ];
    }

    public function attributeNames():array
    {
        return [
            'surname' => 'Фамилия',
            'email' => 'Электронная почта',
            'password' => 'Пароль',
            'first_name' => 'Имя',
            'second_name' => 'Отчество',
            'phone' => 'Телефон',
            'agent_id' => 'ID агента',
            'manager_id' => 'ID менеджера',
            'role' => 'Роль',
            'status' => 'Статус',
        ];
    }

}
