// import "./router.js"; /*fait une copie du fichier et accès à tout ce qu'il y dedans */

// import { initRouter, router } from "./router.js";
import { routes } from "./config/routes.js";
import { router, initRouter } from "./router.js";

/*Fichier principal de l'application*/

function loadingDOM() {
  initRouter(routes, document.getElementById("wrapper"));
  document.querySelector("#js-notification").remove();
  document.querySelector("#header button").remove();

  loadNavbarEvents();
}

// loadingDOM();

/**
 * Fonction de chargment des events de navbar
 */
function loadNavbarEvents() {
  let allLinks = document.querySelectorAll("a");
  allLinks.forEach(function (element) {
    element.addEventListener("click", (evt) => {
      evt.preventDefault();
      //   history.pushState(null, null, element.href);
      router.navigate(evt.target.attributes.href.value);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadingDOM);
