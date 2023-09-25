<?php
session_start(); 
?>
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
    <title>Inscription</title>

</head>

<body>
    <div class="container-fluid p-0">
        <?php require_once 'include/menu.php' ?>
        <section class="p-5">
            <h1>Inscription</h1>

            <!-- Message de Session -->
            <?php if (isset($_SESSION['flash'])) : ?>
                <?php foreach ($_SESSION['flash'] as $type => $message) : ?>
                    <div class="ms-1 me-3 alert alert-<?= $type; ?>">
                        <?= $message; ?>
                    </div>
                <?php endforeach; ?>
                <?php unset($_SESSION['flash']); ?>
            <?php endif; ?>

            <form method="post" action="action/register.php" enctype="multipart/form-data">
                <label for="name">Nom:</label>
                <input type="text" name="nom" required><br><br>
                <label for="email">Email:</label>
                <input type="email" name="email" required><br><br>
                <label for="password">Mot de passe:</label>
                <input type="password" name="mp" required><br><br>
                <input type="submit" value="S'inscrire" name="submit">
            </form>

            <!--messages liés au formulaire -->
            <?php if (!empty($errors)) : ?>
                <div class="ms-1 me-3 alert alert-danger">
                    <p>Vous n'avez pas rempli le formulaire correctement</p>
                    <?php foreach ($errors as $error) : ?>
                        <ul>
                            <li><?= $error; ?></li>
                        </ul>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </section>

    </div>             

</body>

</html>