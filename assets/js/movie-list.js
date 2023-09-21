'use strict';

import { api_key, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

// Récupérer le nom du genre et le paramètre d'URL depuis le stockage local
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

// Appeler la fonction pour créer la barre latérale
sidebar();

let currentPage = 1;
let totalPages = 0;

// Récupérer la liste de films depuis le serveur en fonction du genre et du paramètre d'URL
fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}
&sort_by=popularity.desc&language=fr&include_adult=false&page=${currentPage}&${urlParam}`, function ({results: movieList, total_pages }) {
 
    totalPages = total_pages;

    // Définir le titre de la page en fonction du genre
    document.title = `${genreName} Films - Nassflix`;

    // Créer un élément de liste de films pour le genre
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list", "genre-list");
    movieListElem.ariaLabel = `${genreName} Films`;

    movieListElem.innerHTML = `
    <div class="title-wrapper">
        <h1 class="heading">${genreName}</h1>
    </div>

    <div class="grid-list"></div>

    <button class="btn load-more" load-more>Voir plus</button>
    `;

    /**
     * Ajouter des cartes de films en fonction des éléments récupérés
     */
    for (const movie of movieList) {
        const movieCard = createMovieCard(movie);

        movieListElem.querySelector(".grid-list").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);

    /**
     * Fonctionnalité du bouton "Voir plus"
     */
    document.querySelector("[load-more]").addEventListener("click", function () {

        if (currentPage >= totalPages) {
            this.style.display = "none"; // this == bouton "Voir plus"
            return;
        }
        currentPage++;
        this.classList.add("loading"); // this == bouton "Voir plus"

        // Récupérer plus de films depuis le serveur et les ajouter à la liste
        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=fr&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, ({ results: movieList}) => {
            this.classList.remove("loading"); // this == bouton "Voir plus"

            for (const movie of movieList) {
                const movieCard = createMovieCard(movie);

                movieListElem.querySelector(".grid-list").appendChild(movieCard);
            }
        });
    });
});

// Appeler la fonction de recherche
search();