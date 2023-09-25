<?php
// Démarre une session pour utiliser les variables de session
session_start();

// Inclut le fichier contenant la connexion à la base de données
require_once '../include/db.php';

if (!empty($_POST['mail']) && !empty($_POST['password'])) {
    
    $req = $pdo->prepare("SELECT * FROM `utilisateur` WHERE `utilisateur`.`email` = ?");
    // Prépare une requête pour récupérer les données utilisateur en fonction de l'email
    $req->execute([$_POST['mail']]);
    // Exécute la requête en utilisant l'email fourni dans le formulaire
    $user = $req->fetch();
    // Récupère la première ligne de résultat
    if ($user) {
        if ($user->isActive == 0) {
            // Vérifie si le compte utilisateur est désactivé
            $_SESSION['flash']['danger'] = 'Votre compte a été désactivé. Veuillez contacter l\'administrateur.';
            header('Location: ../connexion.php');
            exit();
        }

        if (password_verify($_POST['password'], $user->mp)) {
            // Vérifie si le mot de passe fourni correspond au mot de passe haché stocké en base de données
            $_SESSION['auth'] = $user;

            if (intval($user->role) == 3) {
                // Utilisateur a le rôle ADMIN
                $_SESSION['admin'] = true;
                $_SESSION['flash']['success'] = 'Vous êtes maintenant connecté en tant qu\'administrateur';
                header('Location: ../vueAdmin/admin.php');
                exit();
            } elseif (intval($user->role) == 2) {
                // Utilisateur a le rôle USER
                $_SESSION['flash']['success'] = 'Vous êtes maintenant connecté en tant qu\'utilisateur';
                header('Location: ../vueProfil/profil.php');
                exit();
            } else {
                // Utilisateur sans rôle approprié
                $_SESSION['flash']['danger'] = 'Vous n\'avez pas les droits d\'accès';
            }
        } else {
            // Mot de passe incorrect
            $_SESSION['flash']['danger'] = 'Identifiant ou mot de passe incorrect';
        }
    } else {
        // Aucun utilisateur trouvé avec l'email fourni
        $_SESSION['flash']['danger'] = 'Identifiant ou mot de passe incorrect';
    }
} else {
    // Données manquantes
    $_SESSION['flash']['danger'] = 'Veuillez remplir tous les champs';
}

// Redirection vers la page de connexion en cas d'erreur ou si les données sont manquantes
header('Location: ../connexion.php');
exit();
?>
