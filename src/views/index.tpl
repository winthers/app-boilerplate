
<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="">

    <!-- Mobile stuff -->
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-capable"           content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style"  content="black" />
    
    <title><!-- @echo pageTitle --></title>

    <link rel="stylesheet" href="assets/css/main.css" />


<!-- @if production=false -->
    
    <!-- livereload
    ****************** -->
    <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>

    <!-- Core dependencies
    ******************************* -->
    <script type="text/javascript" src="../src/js/lib/jquery.1.9.1.js"></script>
    <script type="text/javascript" src="../src/js/lib/underscore.1.5.2.js"></script>
    <script type="text/javascript" src="../src/js/lib/backbone.1.0.0.js"></script>
    <script type="text/javascript" src="../src/js/lib/backbone.marionette.1.1.0.js"></script>


    <!-- lib configurations -->
    <script type="text/javascript" src="../src/js/app/config/marionette/render/render.js"></script>




    <!-- JST:Template Bootstrapping
    ******************************** -->
    <script type="text/javascript" src="assets/js/templates.js"></script>

    <!-- application files -->
    <script src="../src/js/app/app.js"></script>


<!-- @endif -->


<!-- @if production=true -->
    <script type="text/javascript" src="js/templates.js"></script>
    <script type="text/javascript" src="js/lib.js"></script>
    <script type="text/javascript" src="js/app.js"></script>
<!-- @endif -->
</head>

<body>
    
    <!-- Define your custom stuff here -->

</body>
