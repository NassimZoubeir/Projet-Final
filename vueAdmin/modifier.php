<?php
session_start(); // Démarrer la session

$bdd = new PDO('mysql:host=localhost:8889;dbname=film', 'root', 'root');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['userId']) && !empty($_POST['userId']) && isset($_POST['newName'])) {
    $userId = $_POST['userId'];
    $newName = $_POST['newName'];

    // Mettre à jour le nom de l'utilisateur
    $modifierNom = $bdd->prepare('UPDATE utilisateur SET nom = ? WHERE id_Utilisateur = ?');
    $modifierNom->execute(array($newName, $userId));

    header('Location: admin.php');
    exit();
} else {
    echo "Erreur lors du traitement du formulaire de modification";
}
