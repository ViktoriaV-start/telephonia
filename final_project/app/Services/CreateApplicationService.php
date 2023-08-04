<?php

namespace App\Services;

use App\Models\Application;
use Illuminate\Support\Facades\Validator;

class CreateApplicationService
{
    public function createApplication($request)
    {
        $application = new Application;

        $validator = Validator::make($request['params'], $application->rules(), [], $application->attributeNames());

        if($validator->fails()) {
            return [
                'status' => 'error',
                'errors' => $validator->errors()
            ];
        }

        if(!$request['params']['order']){
            $checkingApplication = Application::query()
                ->whereNull('order')
                ->where('client_name', '=', $request['params']['client_name'])
                ->first();

            if($checkingApplication) {
                return [
                    'status' => 'error',
                    'message' => 'Duplicate entry'
                ];
            }
        }

        $newApplication = $request['params'];

        try {
            $saveStatus = $application->fill($newApplication)->save();
            if($saveStatus) {
                return ['status' => 'ok'];
            }
        } catch (\Exception $exception) {

            return [
                'status' => 'error',
                'message' => $exception->getMessage()
            ];
        }
    }
}
