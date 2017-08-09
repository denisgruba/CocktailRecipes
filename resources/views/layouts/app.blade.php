<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <title>Ocasta</title>

    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="/css/app.css">
</head>
<body>
    <div id="app">
        <navigation-bar></navigation-bar>
        <div ></div>
        <main>
            <transition name="fade">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </main>
    </div>
    <script src="/js/app.js"></script>
</body>
</html>
