<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="node_modules/bootstrap-icons/font/bootstrap-icons.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="./favicon.svg" type="image/svg+xml">
    <title>Connexion</title>
</head>
<body>
    <div class="container-fluid p-0">

    <?php require_once 'include/menu.php' ?>

    <section class="p-5">
        <h1>Connexion</h1>

        <!-- Message de Session -->
        <?php if (isset($_SESSION['flash'])) : ?>
            <?php foreach ($_SESSION['flash'] as $type => $message) : ?>
                <div class="ms-1 me-3 alert alert-<?= $type; ?>">
                    <?= $message; ?>
                </div>
            <?php endforeach; ?>
            <?php unset($_SESSION['flash']); ?>
        <?php endif; ?>
        <!-- Fin de message de Session -->

        <form method="post" action="action/login.php">
            <label for="mail">Email:</label>
            <input type="email" name="mail" required><br><br>
            <label for="password">Mot de passe:</label>
            <input type="password" name="password" required><br><br>
            <input type="submit" name="submit" value="Se connecter">
        </form>
    </section>
        
    </div>
</body>
</html>