'use strict';

const api_key= "edc1d88b66a6b7fa654097547e23d577"
const imageBaseUrl = 'https://image.tmdb.org/t/p/'

/**
 * fetch data from a server using the 'url' and passes the result in JSON data
 */

const fetchDataFromServer = function(url, callback, optionalParam) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data, optionalParam));
}

export { imageBaseUrl, api_key, fetchDataFromServer };