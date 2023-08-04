<?php

namespace App\Services;

use Illuminate\Support\Facades\Redis;
use Mockery\Exception;

class RedisService
{
    public function setData($key,$data)
    {
        try{
            Redis::set($key,$data);
            Redis::setTimeout($key, 7440);
            return 1;
        } catch (Exception $e){
            return $e->getMessage();
        }
    }

    public function getData($key):string
    {
        return Redis::get($key);
    }

    public function existsKey($key):bool
    {
        return Redis::exists($key);
    }

}
