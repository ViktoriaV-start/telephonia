<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta name="csrf_token" content="{{ csrf_token() }}" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Админ | Добавить сотрудника</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    {{--    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />--}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite('resources/js/createUser.jsx')
</head>
<body style="background-color: rgb(243 244 246)">
<div id="root" style="display: flex; flex-direction: column; height: 100%;"></div>
</body>
</html>
