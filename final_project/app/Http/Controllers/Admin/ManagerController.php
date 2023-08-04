<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\EmailController;
use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;
use Illuminate\Support\Facades\DB;

class ManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        return view('admin.managers');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        if(!Auth::user()) return redirect()->route('login');
        return view('admin.managers.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, User $user)
    {
        return match (true){
            $request->post('method') === 'getManagers' => $this->getManagers($request),
            $request->post('method') === 'createUser'  => $this->createUser($request, $user),
            $request->post('method') === 'editUser'    => $this->update($request, $user),
            default => 'break',
         };
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // это метод фактически работает на фронте (реакт), на бэке - update()
        // return view('admin.managers.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id, User $user)
    {
        $validator = Validator::make($request->get('data'), 
                                     $user->rulesForEditUser(), 
                                     [], 
                                     $user->attributeNames());
        
        if($validator->fails()) {
            return [
                'status' => 'error',
                'errors' => $validator->errors(),

            ];
        }

        $manager = User::find($id);
        $manager->first_name = $request->get('data')['first_name'];
        $manager->surname = $request->get('data')['surname'];
        $manager->email = $request->get('data')['email'];
        $manager->phone = $request->get('data')['phone'];
        $manager->agent_id = $request->get('data')['agent_id'];
        $manager->manager_id = $request->get('data')['manager_id'];
        $manager->role = $request->get('data')['role'];
        $manager->status = $request->get('data')['status'];
        if (Auth::user()->role === 'agent') {
            $manager->role = $request->get('data')['role'];
            $manager->agent_id = $request->get('data')['agent_id'];
            $manager->manager_id = $request->get('data')['manager_id'];
        }
        $manager->update();

        // return redirect()->route('managers_index')->with('success','Manager is updated');
        return [
            'status'  => 'ok',
            'message' => 'Manager is updated!',
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    // Получение данных на страницу с пагинацией
    // Параметры -> все необязательные:
    // page: '1' // номер необходимой страницы
    // search: '%',  // значения строки ввода
    // column: 'name' // название сортируемого столбца: 'name', 'email', 'company', 'phone', 'is_integrator', 'created_at', 'agent_id', 'agreement'
    // order: 'asc', // 'asc', 'desc'
    // perPage: '10' // количество строк на странице
    public function getManagers($request)
    {
        $page = $request->post('page') ??  '1';
        $search = $request->post('search') ?? '%';
        $column = $request->post('column') ?? 'surname';
        $order = $request->post('order') ?? 'asc';
        $perPages = $request->post('perPage') ?? '10';

        return (new User())->getAllManagersToPaginate($page, $search, $column, $order, $perPages)->toArray();
    }

    private function createUser(Request $request, User $user) {
        $validator = Validator::make($request['params'], $user->rules(),[], $user->attributeNames());
        if($validator->fails()) {
            return [
                'status' => 'error',
                'errors' => $validator->errors()
            ];
        }

        $newUser = $request['params'];

        try {
            $saveStatus = $user->fill($newUser)->save();
            (new EmailController)->SendMail(null, null, 'регистрация', json_encode($newUser));
            if($saveStatus) {
                return ['status' => 'ok'];
            }
        } catch (\Exception $exception) {
            return ['status' => 'error',
                'message' => $exception->getMessage()
                ];
        }
    }

}

