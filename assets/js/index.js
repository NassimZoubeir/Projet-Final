'use strict';

import { sidebar } from "./sidebar.js";
import { api_key, imageBaseUrl, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

// Sélectionner l'élément du contenu de la page
const pageContent = document.querySelector("[page-content]");

// Appeler la fonction pour créer la barre latérale
sidebar();

/**
 * Sections de la page d'accueil (Meilleurs films, À venir, Films tendance)
 */

const homePageSections = [
    {
        title: "Films à Venir",
        path: "/movie/upcoming"
    },
    {
        title: "Films Tendance de la Semaine",
        path: "/trending/movie/week"
    },
    {
        title: "Films les Mieux Notés",
        path: "/movie/top_rated"
    }
];

const genreList = {
    // Créer une chaîne de genre à partir des identifiants de genre, par exemple : [23, 43] "Action, Romance".
    asString(genreIdList) {
        let newGenreList = [];

        for (const genreId of genreIdList) {
            this[genreId] && newGenreList.push(this[genreId]);
            // this == genreList;
        }

        return newGenreList.join(", ");
    }
};

// Récupérer la liste des genres depuis le serveur
fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=fr`, function ({ genres }) {
    for (const { id, name } of genres) {
        genreList[id] = name;
    }

    // Récupérer la liste des films populaires depuis le serveur et appeler la fonction heroBanner
    fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=fr&page=1`, heroBanner);
});

// Fonction pour afficher la bannière principale des films populaires
const heroBanner = function ({ results: movieList }) {
    const banner = document.createElement("section");
    banner.classList.add("banner");
    banner.ariaLabel = "Films populaires";

    banner.innerHTML = `   
        <div class="banner-slider"></div>
        <div class="slider-control">
            <div class="control-inner"></div>
        </div>`;

    let controlItemIndex = 0;

    for (const [index, movie] of movieList.entries()) {
        const {
            backdrop_path,
            title,
            release_date,
            genre_ids,
            overview,
            poster_path,
            vote_average,
            id
        } = movie;

        const sliderItem = document.createElement("div");
        sliderItem.classList.add("slider-item");
        sliderItem.setAttribute("slider-item", "");

        sliderItem.innerHTML = `
            <img src="${imageBaseUrl}w1280${backdrop_path}" alt="${title}" class="img-cover" loading=${index == 0 ? "eager" : "lazy"}>
            <div class="banner-content">
                <h2 class="heading">${title}</h2>
                <div class="meta-list">
                    <div class="meta-item">${release_date.split("-")[0]}</div>
                    <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
                </div>
                <p class="genre">${genreList.asString(genre_ids)}</p>
                <p class="banner-text">${overview}</p>
                <a href="./detail.html" class="btn" onclick="getMovieDetail(${id})">
                    <img src="./assets/images/play_circle.png" width="24" height="24" aria-hidden="true" alt="play circle">
                    <span class="span">Regarder</span>
                </a>
            </div>
        `;

        banner.querySelector(".banner-slider").appendChild(sliderItem);

        const controlItem = document.createElement("button");
        controlItem.classList.add("poster-box", "slider-item");
        controlItem.setAttribute("slider-control", `${controlItemIndex}`);

        controlItemIndex++;

        controlItem.innerHTML = `
            <img src="${imageBaseUrl}w154${poster_path}" alt="Passer à ${title} " loading="lazy" draggable="false" class="img-cover">
        `;
        banner.querySelector(".control-inner").appendChild(controlItem);
    }

    pageContent.appendChild(banner);

    addHeroSlide();

    /**
     * Récupérer les données pour les sections de la page d'accueil (meilleurs films, à venir, tendance)
     */
    for (const { title, path } of homePageSections) {
        fetchDataFromServer(`https://api.themoviedb.org/3${path}?api_key=${api_key}&language=fr&page=1`, createMovieList, title);
    }
}

/**
 * Fonctionnalité du slider de la bannière principale
 */
const addHeroSlide = function () {
    const sliderItems = document.querySelectorAll("[slider-item]");
    const sliderControls = document.querySelectorAll("[slider-control]");

    let lastSliderItem = sliderItems[0];
    let lastSliderControl = sliderControls[0];

    lastSliderItem.classList.add("active");
    lastSliderControl.classList.add("active");

    const sliderStart = function () {
        lastSliderItem.classList.remove("active");
        lastSliderControl.classList.remove("active");

        // `this` == slider-control
        sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
        this.classList.add("active");

        lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
        lastSliderControl = this;
    }

    addEventOnElements(sliderControls, "click", sliderStart);
}

/**
 * Créer la liste de films pour une section de la page d'accueil
 */
const createMovieList = function ({ results: movieList }, title) {
    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list");
    movieListElem.ariaLabel = `${title}`;

    movieListElem.innerHTML = `
        <div class="title-wrapper">
            <h3 class="title-large">${title}</h3>
        </div>
        <div class="slider-list">
            <div class="slider-inner"></div>
        </div>
    `;

    for (const movie of movieList) {
        const movieCard = createMovieCard(movie); // appelée depuis movie_card.js
        movieListElem.querySelector(".slider-inner").appendChild(movieCard);
    }

    pageContent.appendChild(movieListElem);
}

// Appeler la fonction de recherche
search();