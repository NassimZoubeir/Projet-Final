<?php
session_start();
$bdd = new PDO('mysql:host=localhost:8889;dbname=film;', 'root', 'root');

// Vérifie si l'utilisateur est connecté et a le rôle d'administrateur
if (!isset($_SESSION['auth']) || intval($_SESSION['auth']->role) !== 3) {
    header('Location: ../connexion.php');
    exit();
}
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
    <title>Admin</title>
</head>
<script>
    function confirmDelete(userId) {
  var confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
  if (confirmDelete) {
    window.location.href = "supprimer.php?id=" + userId;
  }
}
</script>
<body>
    <?php include 'menu.php'; ?>

    <div class="container mt-5">
        <h1 class="text-center">Bienvenue sur la page Administrateur</h1>
        <br><br>
        <?php 
        $recupUsers = $bdd->query('SELECT * FROM utilisateur');
        while ($user = $recupUsers->fetch()) {
        ?>
        <div class="d-flex justify-content-between align-items-center mb-3">
            <p><?=  $user['nom'];?></p>
            <button onclick="confirmDelete(<?= $user['id_Utilisateur'] ?>)" class="btn btn-danger">Supprimer le membre</button>
            <?php if ($user['isActive'] == 1): ?>
                <a href="desactiver.php?id=<?= $user['id_Utilisateur'] ?>" class="btn btn-warning text-white">Désactiver le membre</a>
            <?php else: ?>
                <a href="activer.php?id=<?= $user['id_Utilisateur'] ?>" class="btn btn-success text-white">Activer le membre</a>
            <?php endif; ?>
        </div>
        <?php
        }
        ?>
    </div>
</body>

</html>
