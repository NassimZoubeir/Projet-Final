<?php 
session_start();
require_once "../include/db.php";

if(isset($_POST['submit'])){

    $errors = array();
    //nom d'utilisateur conditions et implémentation dans la base de données (utilisation d'une Regex n'autorisant que les lettres minuscules et majuscules)

    if (empty($_POST['nom']) || !preg_match('/^[a-zA-Z]+$/', $_POST['nom'])) {

        $errors['nom'] = "Votre nom n'est pas valide, il ne doit contenir que des majuscules et ou minuscules";
    }

    // email conditions et implémentation dans la base de données (utilisation de filter_var())

    if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {

        $errors['email'] = "votre email n'est pas valide";

    } else { // Requête pour vérifier si le compte mail existe déja ou non dans la base de données

        $req = $pdo->prepare('SELECT id_Utilisateur FROM utilisateur WHERE email = ?');
        $req->execute([$_POST['email']]);
        $user = $req->fetch();

        if ($user) { // si existant
            $errors['email'] = 'Cet e-mail existe déjà';
        };
    }

    if(empty($errors)){

        // récupération des valeurs de champs de formulaire
        $nom = htmlspecialchars($_POST['nom']) ;
        $email = htmlspecialchars($_POST['email']) ;
        $password = $_POST['mp'];

        // cryptage du mot de passe
        $passHash = password_hash($password, PASSWORD_BCRYPT);

        // Préparation de la requête d'insertion
        $query = "INSERT INTO utilisateur (nom, email, mp, isActive, role) VALUES (:nom, :email, :mp, :isActive, :role)";
        $statement = $pdo->prepare($query);

        // Liaison entre les colonnes et leurs valeurs
        $statement->bindParam(':nom', $nom);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':mp', $passHash, PDO::PARAM_STR, 255);
        $statement->bindValue(':isActive', 1); // Nouvel utilisateur activé par défaut
        $statement->bindValue(':role', 2); // Nouvel utilisateur avec le rôle d'utilisateur par défaut

        // Execution pour insertion en base de données
        $statement->execute();

        $_SESSION['flash']['success'] = 'Votre compte a bien été créé merci de vous connecter';

        // Récupérer l'ID de l'utilisateur nouvellement inscrit
        $userID = $pdo->lastInsertId();

        header('Location: ../connexion.php');
        
        exit();
    }
}
?>