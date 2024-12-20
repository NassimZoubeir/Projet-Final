'use strict';

import { api_key, imageBaseUrl, fetchDataFromServer } from "./api.js";
import { sidebar } from "./sidebar.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

const movieId = window.localStorage.getItem("movieId");
const pageContent = document.querySelector("[page-content]");

// Initialisation de la barre latérale
sidebar();

// Fonction pour obtenir la liste des genres
const getGenres = function (genreList) {
    const newGenreList = [];
    for (const { name } of genreList) {
        newGenreList.push(name);
    }
    return newGenreList.join(", ");
};

// Fonction pour obtenir la liste des acteurs
const getCasts = function (castList) {
    const newCastList = [];
    for (let i = 0, len = castList.length; i < len && i < 10; i++) {
        const { name } = castList[i];
        newCastList.push(name);
    }
    return newCastList.join(", ");
};

// Fonction pour obtenir la liste des réalisateurs
const getDirectors = function (crewList) {
    const directors = crewList.filter(({ job }) => job === "Director");
    const directorList = [];
    for (const { name } of directors) {
        directorList.push(name);
    }
    return directorList.join(", ");
};

// Fonction pour filtrer les vidéos (trailers et teasers)
const filterVideos = function (videoList) {
    return videoList.filter(({ type, site }) => (type === "Trailer" || type === "Teaser") && site === "YouTube");
};

// Récupération des données du film depuis l'API
fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases&language=fr`, function (movie) {
    // Extraction des données du film
    const {
        backdrop_path,
        poster_path,
        title,
        release_date,
        runtime,
        vote_average,
        releases: { countries: [{ certification }] },
        genres,
        overview,
        casts: { cast, crew },
        videos: { results: videos }
    } = movie;
    
    // Modification du titre de la page
    document.title = `${title} - Nassflix`;

    // Création de l'élément HTML pour les détails du film
    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");

    // Remplissage de l'élément avec les données du film
    movieDetail.innerHTML = `
    <div class="backdrop-image" style="background-image: url(${imageBaseUrl}w1280${backdrop_path || poster_path});"></div>

    <figure class="poster-box movie-poster">
        <img src="${imageBaseUrl}w342${poster_path}" alt="${title} poster" class="img-cover">
    </figure>

    <div class="detail-box">

        <div class="detail-content">
            <h1 class="heading">${title}</h1>
            
            <div class="meta-list">

                <div class="meta-item">
                    <img src="./assets/images/star.png" width="20" height="20" alt="rating">
                    <span class="span">${vote_average.toFixed(1)}</span>
                </div>

                <div class="separator"></div>

                <div class="meta-item">${runtime}m</div>

                <div class="separator"></div>

                <div class="meta-item">${release_date.split("-")[0]}</div>

                <div class="meta-item card-badge">${certification}</div>

            </div>

            <p class="genre">${getGenres(genres)}</p>

            <p class="overview">${overview}</p>

            <ul class="detail-list">

                <div class="list-item">
                    <p class="list-name">Avec</p>

                    <p>${getCasts(cast)}</p>
                </div>

                <div class="list-item">
                    <p class="list-name">Réalisé par</p>

                    <p>${getDirectors(crew)}</p>
                </div>

            </ul>
        </div>

        <div class="title-wrapper">
            <h3 class="title-large">Bandes-annonces et Extraits</h3>
        </div>

        <div class="slider-list">
            <div class="slider-inner"></div>
        </div>

    </div>
    `;

    // Ajout des vidéos (trailers et teasers)
    for (const { key, name } of filterVideos(videos)) {

        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
            <iframe width="500" height="294" src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0" frameborder="0" allowfullscreen="1" title="${name}" class="img-cover" loading="lazy"></iframe>
        `;
        movieDetail.querySelector(".slider-inner").appendChild(videoCard);
    }

    // Ajout de l'élément à la page
    pageContent.appendChild(movieDetail);

    // Appel de la fonction pour afficher les films recommandés
    fetchDataFromServer(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&language=fr&page=1`, addSuggestedMovies);
});

// Fonction pour ajouter les films recommandés à la page
const addSuggestedMovies = function ({ results: movieList }, title) {
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = "Vous pourriez également aimer";

    movieListElem.innerHTML = `
        <div class="title-wrapper">
            <h3 class="title-large">Vous pourriez également aimer</h3>
        </div>
        <div class="slider-list">
            <div class="slider-inner"></div>
        </div>
    `;

    for (const movie of movieList) {
        const movieCard = createMovieCard(movie); // appel de la fonction depuis movie_card.js
        movieListElem.querySelector(".slider-inner").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);
};

// Appel de la fonction pour gérer la recherche
search();

// Récupérer le bouton "Ajouter aux favoris"
const addToFavoritesButton = document.getElementById("addToFavoritesButton");

// Ajouter un écouteur d'événement au clic sur le bouton "Ajouter aux favoris"
addToFavoritesButton.addEventListener("click", function() {
    // Récupérer l'ID du film depuis le bouton lui-même (via l'attribut data)
    const movieId = addToFavoritesButton.getAttribute("data-movie-id");
    
    // Mettre à jour la valeur de l'input caché avec l'ID du film
    document.getElementById("movieIdInput").value = movieId;
    
    // Soumettre le formulaire
    document.getElementById("addToFavoritesForm").submit();
});
