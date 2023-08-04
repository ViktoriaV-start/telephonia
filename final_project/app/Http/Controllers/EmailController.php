<?php

namespace App\Http\Controllers;

class EmailController extends Controller
{
    public function SendMail($to, $from, $title, $message): bool
    {
        $to = $to ?? 'contact@mail.ru';
        $from = $from ?? 'no-reply@teleport.ru';
        $title = $title ?? 'Смена пароля';
        $message = $message ?? 'Здесь тело сообщения';

        return $this->mail_utf8($to, $from, $title, $message);
    }


    function mail_utf8($to, $from, $subject, $message): bool
    {
        ini_set('sendmail_from', 'no-reply@teleport.ru');

        $subjectHead = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=utf-8\r\n";
        $headers .= "From:TELEPORT<$from>" . "\r\n";

        return mail($to, $subjectHead, $message, $headers, '-f no-reply@teleport.ru');
    }
}
