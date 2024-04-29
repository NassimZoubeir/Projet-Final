'use strict';

// Clé d'API pour accéder aux données du serveur
const api_key = "edc1d88b66a6b7fa654097547e23d577";
// URL de base pour les images provenant de tmdb.org
const imageBaseUrl = 'https://image.tmdb.org/t/p/';

/**
 * Fonction pour récupérer des données depuis un serveur en utilisant l'URL spécifiée
 * et transmet le résultat sous forme de données JSON à la fonction de rappel (callback).
 * @param {string} url - L'URL du serveur à interroger.
 * @param {function} callback - La fonction de rappel qui traitera les données récupérées.
 * @param {any} optionalParam - Paramètre optionnel à transmettre à la fonction de rappel.
 */
const fetchDataFromServer = function(url, callback, optionalParam) {
    // Effectue une requête fetch vers l'URL spécifiée
    fetch(url)
        .then(response => response.json()) // Convertit la réponse en JSON
        .then(data => callback(data, optionalParam)); // Appelle la fonction de rappel avec les données récupérées
}

// Exporter la clé d'API, l'URL de base et la fonction
export { imageBaseUrl, api_key, fetchDataFromServer };

