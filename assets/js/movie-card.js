'use strict';

import { imageBaseUrl } from "./api.js";

/**
 * Fonction pour créer une carte de film
 * @param {object} movie - Les informations sur le film.
 * @returns {HTMLElement} - L'élément HTML représentant la carte du film.
 */
export function createMovieCard(movie) {

    const {
        poster_path,
        title,
        vote_average,
        release_date,
        id
    } = movie;

    // Créer un élément de carte de film
    const card = document.createElement("div");
    card.classList.add("movie-card");

    // Remplir le contenu de la carte avec les données du film
    card.innerHTML = `
    <figure class="poster-box card-banner">
        <img src="${imageBaseUrl}w342${poster_path}" alt="${title}" class="img-cover" loading="lazy">
    </figure>

    <h4 class="title">${title}</h4>

    <div class="meta-list">
        <div class="meta-item">
            <img src="./assets/images/star.png" width="20" height="20" loading="lazy" alt="note">
            <span class="span">${vote_average.toFixed(1)}</span>
        </div>

        <div class="card-badge">${release_date.split("-")[0]}</div>
    </div>

    <a href="./detail.html" class="card-btn" title="${title}" onclick="getMovieDetail(${id})"></a>
    `;

    return card;
}
// Récupérer tous les boutons "Ajouter aux favoris"
const addToFavoritesButtons = document.querySelectorAll("[data-movie-id]");

// Ajouter un écouteur d'événement à chaque bouton
addToFavoritesButtons.forEach(button => {
    button.addEventListener("click", function() {
        // Récupérer l'ID du film à partir de l'attribut data
        const movieId = button.dataset.movieId;

        // Stocker l'ID du film dans la session des favoris de l'utilisateur (vous pouvez utiliser une autre méthode ici, comme une requête AJAX)
        sessionStorage.setItem('favorite_movie_id', movieId);
    });
});
