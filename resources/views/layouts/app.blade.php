<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Ocasta</title>

        <!-- Styles -->
        <link rel="stylesheet" type="text/css" href="/css/app.css">
    </head>
    <body>
        <div id="app">
            <router-link to="/">Home</router-link>
            <router-link to="/List">List</router-link>

            <router-view></router-view>
        </div>
        <script src="/js/app.js"></script>
    </body>
</html>
