<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta name="csrf_token" content="{{ csrf_token() }}" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Edit page</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
{{--    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />--}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

    
</head>
<body class="h-full">
    @if ($errors->any())
        <div class="alert alert-danger">
            <strong>Error!</strong>
            <ul>
                @foreach ($errors->all() as $error)
                    <li></li>
                @endforeach
            </ul>
        </div>
    @endif
{{-- <a href="{{ route('managers.edit', $user->id) }}">1111</a> --}}
    {{-- {{ dump(route('users.update')) }}; --}}

    
    {{-- {{ route('managers.update', $user->id) }} --}}
 
    <form method="post" action="">
        @method('patch')
        @csrf
        <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input value="{{ $user->name }}" 
                type="text" 
                class="form-control" 
                name="name" 
                placeholder="Name" required>

            @if ($errors->has('name'))
                <span class="text-danger text-left">{{ $errors->first('name') }}</span>
            @endif
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input value="{{ $user->email }}"
                type="email" 
                class="form-control" 
                name="email" 
                placeholder="Email address" required>

            @if ($errors->has('email'))
                <span class="text-danger text-left">{{ $errors->first('email') }}</span>
            @endif
        </div>
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input value="{{ $user->username }}"
                type="text" 
                class="form-control" 
                name="username" 
                placeholder="Username" required>
            @if ($errors->has('username'))
                <span class="text-danger text-left">{{ $errors->first('username') }}</span>
            @endif
        </div>

        <button type="submit" class="btn btn-primary">Update</button>
    </form>

    </body>
</html>
