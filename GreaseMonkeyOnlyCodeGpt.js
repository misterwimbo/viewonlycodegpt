// ==UserScript==
// @name         only code GPT
// @namespace    http://tampermonkey.net/
// @version      2024-10-10
// @description  try to take over the world!
// @author       wimbo
// @match        https://chatgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            initCarousel(true);
        }
    });


    function initCarousel(code = false) {
        // Sélectionner tous les articles
        const articles = document.querySelectorAll('article');
        const bottomElements = document.querySelectorAll('.bottom-0');
        bottomElements.forEach(el => {el.style.display = 'none';});

        // Vérifier s'il y a des articles
        if (articles.length === 0) return;

        // Filtrer les articles si le paramètre code est vrai
        const filteredArticles = code
        ? Array.from(articles).filter(article => article.querySelector('pre'))
        : Array.from(articles); // Conserver tous les articles si code est faux

        // Vérifier s'il y a des articles après le filtrage
        if (filteredArticles.length === 0) return;

        // Initialiser l'index de l'article visible
        let currentIndex = 0;

        // Créer la modale
        const modal = document.createElement('div');
        modal.style.display = 'none'; // Masquer la modale au départ
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%'; // Prendre toute la hauteur de la page
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        modal.style.zIndex = '1000';
        modal.style.color = 'white';
        modal.style.padding = '20px';
        modal.style.boxSizing = 'border-box';
        modal.style.display = 'flex'; // Utiliser flexbox pour centrer
        modal.style.alignItems = 'center'; // Centrer verticalement
        modal.style.justifyContent = 'center'; // Centrer horizontalement

        // Créer un conteneur pour le contenu de l'article
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#222';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '40px';
        modalContent.style.maxHeight = '97%';
        modalContent.style.overflowY = 'auto';
        modalContent.style.position = 'relative';
        modalContent.style.width = '95%'; // Largeur de la modale
        modalContent.style.margin = 'auto'; // Centrer horizontalement

        // Créer des boutons de navigation (avec uniquement des flèches)
        const prevBtn = document.createElement('button');
        prevBtn.innerText = '←'; // Flèche gauche
        prevBtn.style.position = 'absolute';
        prevBtn.style.left = '10px';
        prevBtn.style.top = '50%';
        prevBtn.style.transform = 'translateY(-50%)';
        prevBtn.style.fontSize = '24px'; // Taille de la flèche
        prevBtn.style.backgroundColor = 'transparent'; // Pas de fond
        prevBtn.style.border = 'none'; // Pas de bordure
        prevBtn.style.color = 'white'; // Couleur de la flèche
        modalContent.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.innerText = '→'; // Flèche droite
        nextBtn.style.position = 'absolute';
        nextBtn.style.right = '10px';
        nextBtn.style.top = '50%';
        nextBtn.style.transform = 'translateY(-50%)';
        nextBtn.style.fontSize = '24px'; // Taille de la flèche
        nextBtn.style.backgroundColor = 'transparent'; // Pas de fond
        nextBtn.style.border = 'none'; // Pas de bordure
        nextBtn.style.color = 'white'; // Couleur de la flèche
        modalContent.appendChild(nextBtn);

        // Ajouter le contenu de l'article à la modale
        function showArticle(index) {
            modalContent.innerHTML = ''; // Réinitialiser le contenu
            modalContent.appendChild(prevBtn);
            modalContent.appendChild(nextBtn);

            // Vérifier si l'article a une balise <pre>
            const article = filteredArticles[index]; // Utiliser l'article filtré
            const pre = article.querySelector('pre');

            // Afficher uniquement le contenu de la balise <pre> si elle existe
            const content = pre ? pre.innerHTML : article.innerHTML; // Contenu de la balise <pre> ou article entier
            modalContent.innerHTML += content; // Ajouter le contenu à la modale
        }

        // Afficher le premier article au chargement de la page
        showArticle(currentIndex);

        // Ajouter le contenu à la modale
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Ouvrir la modale
        modal.style.display = 'flex';

        // Masquer les éléments avec la classe bottom-0
        bottomElements.forEach(el => {el.style.display = 'none';});

        // Navigation avec les boutons
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + filteredArticles.length) % filteredArticles.length; // Boucle circulaire
            showArticle(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % filteredArticles.length; // Boucle circulaire
            showArticle(currentIndex);
        });

        // Navigation avec les touches du clavier
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' || event.keyCode === 37) { // Flèche gauche
                currentIndex = (currentIndex - 1 + filteredArticles.length) % filteredArticles.length; // Boucle circulaire
                showArticle(currentIndex);
            } else if (event.key === 'ArrowRight' || event.keyCode === 39) { // Flèche droite
                currentIndex = (currentIndex + 1) % filteredArticles.length; // Boucle circulaire
                showArticle(currentIndex);
            } else if (event.key === 'Escape' || event.keyCode === 27) { // Touche Échap
                modal.style.display = 'none';


                 // Réafficher les éléments avec la classe bottom-0
                 bottomElements.forEach(el => {el.style.display = '';});

                modal.remove(); // Retirer la modale du DOM
            }
        });

        // Fermer la modale si on clique à l'extérieur
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                bottomElements.forEach(el => {el.style.display = '';});
                modal.remove(); // Retirer la modale du DOM
            }
        });
    }


})();
