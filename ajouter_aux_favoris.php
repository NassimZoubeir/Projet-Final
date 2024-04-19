<?php
session_start();

// Vérifiez si l'utilisateur est connecté
if (!isset($_SESSION['auth'])) {
    // Rediriger vers la page de connexion ou afficher un message d'erreur
    header("Location: connexion.php");
    exit();
}

// Vérifiez si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['addToFavorites'])) {
    // Récupérer l'ID du film à partir de la requête POST (vous devrez ajuster ceci en fonction de votre structure HTML)
    $movieId = $_POST['movieId'];

    // Ajouter le film aux favoris de l'utilisateur connecté (vous pouvez utiliser une base de données pour stocker cette information)

    // Rediriger vers la page de profil de l'utilisateur après avoir ajouté le film aux favoris
    header("Location:./vueProfil/profil.php");
    exit();
} else {
    // Rediriger vers une page d'erreur ou afficher un message d'erreur
    header("Location: erreur.php");
    exit();
}
?>
