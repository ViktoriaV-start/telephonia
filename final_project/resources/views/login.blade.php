<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="utf-8">
    <meta name="csrf_token" content="{{ csrf_token() }}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Авторизация</title>

    @viteReactRefresh
    @vite('resources/js/login.jsx')
</head>

<body>
    <div id="root"></div>
</body>


</html>
