<?php

namespace App\Http\Controllers;

use App\Services\RedisService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NumbersController extends Controller
{
    private string $url = 'https://partners.mtt.ru/widget_numbers/';

    public function getData($params): string
    {
        $redis = new RedisService();
        if ($redis->existsKey($params)) {
            return $redis->getData($params);
        } else {
            $response = Http::get($this->url . $params)->body();
            $redis->setData($params, $response);
            return $response;
        }
    }
}
