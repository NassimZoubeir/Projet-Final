'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";

/**
 * Fonction pour gérer la fonctionnalité de recherche
 */
export function search() {

    const searchWrapper = document.querySelector("[search-wrapper]");
    const searchField = document.querySelector("[search-field]");

    // Créer une boîte de résultat de recherche
    const searchResultModal = document.createElement("div");
    searchResultModal.classList.add("search-modal");
    document.querySelector("main").appendChild(searchResultModal);

    let searchTimeout;

    searchField.addEventListener("input", function() {
        if (!searchField.value.trim()) {
            // Cacher la boîte de résultat si le champ de recherche est vide
            searchResultModal.classList.remove("active");
            searchWrapper.classList.remove("searching");
            clearTimeout(searchTimeout);
            return;
        }

        // Ajouter une classe pour indiquer la recherche en cours
        searchWrapper.classList.add("searching");
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(function() {

            // Récupérer les films correspondant à la recherche depuis le serveur
            fetchDataFromServer(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchField.value}&language=fr&page=1&include_adult=false`, 
            function({ results: movieList }) {

                // Retirer la classe de recherche en cours
                searchWrapper.classList.remove("searching");

                // Afficher la boîte de résultat de recherche
                searchResultModal.classList.add("active");
                searchResultModal.innerHTML = ""; // Supprimer les anciens résultats

                searchResultModal.innerHTML = `
                <p class="label">Résultats pour</p>
                <h1 class="heading">${searchField.value}</h1>
                <div class="movie-list">
                    <div class="grid-list"></div>
                </div>
                `;

                // Ajouter les cartes de film correspondantes aux résultats
                for (const movie of movieList) {
                    const movieCard = createMovieCard(movie);

                    searchResultModal.querySelector(".grid-list").appendChild(movieCard);
                }
            });
        }, 500);
    });
}