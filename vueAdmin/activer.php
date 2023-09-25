<?php
session_start(); // Démarrer la session

$bdd = new PDO('mysql:host=localhost:8889;dbname=film', 'root' , 'root');
// Connexion à la base de données MySQL avec PDO

if(isset($_GET['id']) && !empty($_GET['id'])) {
    // Vérifier si l'identifiant est défini dans le paramètre GET et s'il n'est pas vide

    $getid = $_GET['id'];
    // Récupérer la valeur de l'identifiant depuis le paramètre GET

    $recupUser = $bdd->prepare('SELECT * FROM utilisateur WHERE id_Utilisateur = ?');
    // Préparer une requête pour sélectionner l'utilisateur correspondant à l'identifiant fourni
    $recupUser->execute(array($getid));
    // Exécuter la requête en remplaçant le paramètre par la valeur de l'identifiant

    if($recupUser->rowCount() > 0) {
        // Vérifier s'il y a au moins une ligne résultat de la requête (l'utilisateur existe)
        $activerUser = $bdd->prepare('UPDATE utilisateur SET isActive = 1 WHERE id_Utilisateur = ?');
        // Préparer une requête pour mettre à jour le champ isActive de l'utilisateur à 1
        $activerUser->execute(array($getid));
        // Exécuter la requête en remplaçant le paramètre par la valeur de l'identifiant

        header('Location: admin.php');
        exit();
    } else {
        echo "Aucun utilisateur n'a été trouvé";
    }
} else {
    echo "L'identifiant n'a pas été récupéré";
}
?>
