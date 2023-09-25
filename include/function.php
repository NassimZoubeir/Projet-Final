<?php
// Fonction pour afficher le contenu d'une variable de manière lisible
function debug($variable){
    echo '<pre>' . print_r($variable, true) . '</pre>';
}
// Fonction pour restreindre l'accès aux utilisateurs connectés
function logged_only(){

    // Vérifier si la session n'est pas encore démarrée
    if(session_status() == PHP_SESSION_NONE){
        session_start(); // Démarrer la session
    }
    // Vérifier si la clé 'auth' n'est pas définie dans la variable $_SESSION
    if(!isset($_SESSION['auth'])){
        $_SESSION['flash']['danger'] = "Vous n'avez pas le droit d'accéder à cette page";
        // Stocker un message d'erreur dans la variable $_SESSION['flash']['danger']

        header('Location: ../connexion.php'); // Rediriger l'utilisateur vers la page de connexion
        exit(); // Arrêter l'exécution du script
    }
}
