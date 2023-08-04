<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

const AGENT = 'agent';
const MANAGER = 'manager';

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'order',
        'client_name',
        'client_phone',
        'description',
        'status',
        'updated_at',
        'partner_id',
        'user_id',
    ];

    public function getAllApplications($search, $column, $order): object
    {
      return $this->query()
                  ->leftJoin('users', 'users.id', '=', 'applications.user_id')
                  ->select('applications.*',
                           'users.surname',
                           'users.first_name',
                           'users.second_name',
                           'users.phone')
                  ->where(function ($w) use ($search) {
                    $w->orWhere('applications.client_name', 'like', '%' . $search . '%')
                      ->orWhere('applications.order', 'like', '%' . $search . '%')
                      ->orWhere('applications.client_phone', 'like', '%' . $search . '%')
                      ->orWhere('applications.description', 'like', '%' . $search . '%')
                      ->orWhere('applications.status', 'like', '%' . $search . '%')
                      ->orWhere('applications.created_at', 'like', '%' . $search . '%')
                      ->orWhere('applications.partner_id', 'like', '%' . $search . '%')
                      ->orWhere('users.surname', 'like', '%' . $search . '%')
                      ->orWhere('users.first_name', 'like', '%' . $search . '%')
                      ->orWhere('users.phone', 'like', '%' . $search . '%')
                      ->orWhere('applications.id', 'like', '%' . $search . '%');
              })
                  ->orderBy($column, $order);
    }

    public function getManagerApplications($search, $column, $order, $adminId): object
    {
        return $this->query()
            ->join('users', 'users.id', '=', 'applications.user_id')
            ->select('applications.*',
                'users.surname',
                'users.first_name',
                'users.second_name',
                'users.phone')
            ->where(function ($w) use ($search) {
                $w->orWhere('applications.client_name', 'like', '%' . $search . '%')
                    ->orWhere('applications.order', 'like', '%' . $search . '%')
                    ->orWhere('applications.client_phone', 'like', '%' . $search . '%')
                    ->orWhere('applications.description', 'like', '%' . $search . '%')
                    ->orWhere('applications.status', 'like', '%' . $search . '%')
                    ->orWhere('applications.created_at', 'like', '%' . $search . '%')
                    ->orWhere('applications.partner_id', 'like', '%' . $search . '%')
                    ->orWhere('users.surname', 'like', '%' . $search . '%')
                    ->orWhere('users.first_name', 'like', '%' . $search . '%')
                    ->orWhere('users.phone', 'like', '%' . $search . '%')
                    ->orWhere('applications.id', 'like', '%' . $search . '%');
            })
            ->orderBy($column, $order)
            ->having('applications.user_id', '=', $adminId);
    }

    public function getAllApplicationsToPaginate($pageNumber, $search, $column, $order, $perPages, $adminRole, $adminId): object
    {
        if($adminRole === MANAGER) {
            return $this->getManagerApplications($search, $column, $order, $adminId)
                ->paginate($perPage = $perPages, $columns = ['*'], $pageName = 'users', $page = $pageNumber);
        }
        return $this->getAllApplications($search, $column, $order)
            ->paginate($perPage = $perPages, $columns = ['*'], $pageName = 'users', $page = $pageNumber);

    }

    public function rules(): array
    {
        return [
            'order'              => 'string|nullable|min:11|max:75',
            'client_name'        => 'required|min:2|max:100',
            'client_phone'       => 'required|digits_between:10,11',
            'description'        => 'nullable|min:1|max:1500',
            'status'             => [
                                    'required',
                                    Rule::in(['в работе', 'отказано', 'подтверждено'])
                                    ],
            'partner_id'         => 'required|min:5|max:25',
            'user_id'            => 'nullable|exists:App\Models\User,id',
        ];
    }

    public function rulesDescription(): array
    {
        return [
            'description'        => 'nullable|min:1|max:1500',
        ];
    }

    public function attributeNames():array
    {
        return [
            'order'              => 'Заявка на телефонный номер',
            'client_name'        => 'ФИО',
            'client_phone'       => 'Телефон',
            'description'        => 'Комментарий',
            'status'             => 'Статус',
            'partner_id'         => 'ID партнера',
            'user_id'            => 'Сотрудник'
        ];
    }
}
