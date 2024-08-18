'use strict';

function displayFooter() {

    const footer = document.getElementById('footer');
    footer.innerHTML =
        `
        <a href="https://sylvainzoogones.netlify.app/" target="_blank">
            <figure>
                <img class="home_logo" src="/assets/images/logoSZ.png" alt="logo">
                <figcaption>Sylvain Zoogones</figcaption>
            </figure>
        </a>
        `
};

document.addEventListener('DOMContentLoaded', () => {

    displayFooter();
});