<!DOCTYPE html>
<html>
<head>
    <title>Laravel</title>

    <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
    <link href="css/app.css" rel="stylesheet" type="text/css">
    <!-- 1. Load libraries -->
    <!-- 1. Load libraries -->
    <!-- Polyfill(s) for older browsers -->
    <script src="core-js/client/shim.min.js"></script>
    <script src="zone.js/dist/zone.js"></script>
    <script src="reflect-metadata/Reflect.js"></script>
    <script src="systemjs/dist/system.src.js"></script>
    <script src="https://js.pusher.com/3.1/pusher.min.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
        System.config({
            "defaultJSExtensions": true,
            packages: {
                app: {
                    format: 'register',
                    defaultExtension: 'js'
                }
            }
        });


        System.import('main')
            .then(null, console.error.bind(console));
    </script>
</head>
<body class="blue-gradient-background">
<header class="navbar navbar-inverse navbar-default" role="navigation">
    <div class="container navbar-container">
        <div class="navbar-header">
            <div class="navbar-brand">
                <a href="/">
                    TradeTracker
                </a>
            </div>
        </div>

    </div>
</header>
<app></app>
</body>
</html>
 