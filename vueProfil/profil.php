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
    <script src="../assets/js/api.js" defer></script>

<title>Profil</title>
</head>
<body>
    <!-- Inclure le fichier "menu.php" -->
    <?php include 'menu.php' ?>

    <!-- Afficher un titre de bienvenue avec le nom de l'utilisateur actuellement authentifié -->
    <h1 class="text-center mt-4  p-3 border fw-bold border-5">Bonjour <?= $_SESSION['auth']->nom; ?>, bienvenue sur ta page profil !</h1>

  <!-- Section pour afficher les films favoris -->
    <div class="container mt-5">
        <h2 class="text-center mb-4">Vos films favoris :</h2>
        <?php
            // Vérifiez si l'ID du film favori est présent dans la session
            if (isset($_SESSION['favorite_movie_id'])) {
                $favoriteMovieId = $_SESSION['favorite_movie_id'];

                // Construire l'URL de l'API IMDB avec l'ID du film
                $api_url = "https://api.themoviedb.org/3/movie/{$favoriteMovieId}?api_key=edc1d88b66a6b7fa654097547e23d577";

                // JavaScript pour récupérer les données du film en utilisant fetchDataFromServer
                echo "<script>";
                echo "fetchDataFromServer('$api_url', function(data) {";
                echo "  console.log(data);"; // Afficher les données récupérées dans la console pour le débogage
                echo "});";
                echo "</script>";
            } else {
                echo '<p>Aucun film favori trouvé.</p>';
            }
        ?>
    </div>
</body>
</html>
