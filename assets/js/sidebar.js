'use strict';

import { api_key, fetchDataFromServer } from "./api.js";

/**
 * Fonction pour gérer la barre latérale
 */
export function sidebar() {

    // Objet pour stocker la liste des genres
    const genreList = {};

    // Récupérer la liste des genres depuis le serveur
    fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=fr`, function ({ genres }) {
        for (const { id, name } of genres) {
            genreList[id] = name;
        }
        genreLink(); // Appeler la fonction pour créer les liens de genre
    });

    // Créer un élément pour la barre latérale
    const sidebarInner = document.createElement("div");
    sidebarInner.classList.add("sidebar-inner");

    sidebarInner.innerHTML = `
    <div class="sidebar-list">
        <p class="title">Genre</p>
    </div>
    <div class="sidebar-footer">
        <p class="copyright">Copyright 2023</p>
        <img src="./assets/images/tmdb-logo.svg" width="130" height="17" alt="Logo de The Movie Database">
    </div>
    `;

    // Fonction pour créer les liens de genre
    const genreLink = function() {
        for (const [genreId, genreName] of Object.entries(genreList)) {

            const link = document.createElement("a");
            link.classList.add("sidebar-link");
            link.setAttribute("href", "./movie-list.html");
            link.setAttribute("menu-close", "");
            link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`);
            link.textContent = genreName;

            sidebarInner.querySelector(".sidebar-list").appendChild(link);
        }

        const sidebar = document.querySelector("[sidebar]");
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar); // Appeler la fonction pour gérer le basculement de la barre latérale
    }

    // Fonction pour basculer la barre latérale
    const toggleSidebar = function (sidebar) {
        /**
         * Activer/désactiver la barre latérale sur les petits écrans
         */

        const sidebarBtn = document.querySelector("[menu-btn]");
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const sidebarClose = document.querySelectorAll("[menu-close]");
        const overlay = document.querySelector("[overlay]");

        addEventOnElements(sidebarTogglers, "click", function () {
            sidebar.classList.toggle("active");
            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        addEventOnElements(sidebarClose, "click", function () {
            sidebar.classList.remove("active");
            sidebarBtn.classList.remove("active");
            overlay.classList.remove("active");
        });
    }
}