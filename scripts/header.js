'use strict';

function displayHeader() {

    const header = document.getElementById('header');
    header.innerHTML =
        `
        <figure class="header-figure">
            <a href="index.html">
                <img class="header-logo" src="/assets/images/header.png" alt="logo">
                <figcaption>
                    <h1 class="header-title">Pass_Or_Not</h1>
                </figcaption>
            </a>
        </figure>
        <nav>
            <a href="average.html">Moyennes</a>
            <a href="https://sylvainzoogones.netlify.app/" target="_blank">Mon portfolio</a>
        </nav>
            
            `
};

document.addEventListener('DOMContentLoaded', () => {

    displayHeader();
});