<?php
require '../include/function.php';
require '../include/db.php';
logged_only();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="node_modules/bootstrap-icons/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="../favicon.svg" type="image/svg+xml">

<title>Profil</title>
</head>
<body>
    <!-- Inclure le fichier "menu.php" -->
    <?php include 'menu.php' ?>

    <!-- Afficher un titre de bienvenue avec le nom de l'utilisateur actuellement authentifié -->
    <h1 class="text-center mt-4  p-3 border border-5 bg-light">Bonjour <?= $_SESSION['auth']->nom; ?>, bienvenue sur ta page profil !</h1>
</body>
</html>
