import { routes } from "./config/routes.js";
import { router, initRouter } from "./router.js";

/*Fichier principal de l'application*/

function loadingDOM() {
  initRouter(routes, document.getElementById("wrapper"));
  document.querySelector("#js-notification").remove();
  document.querySelector("#header button").remove();

  loadNavbarEvents();
}

/**
 * Fonction de chargment des events de navbar
 */
function loadNavbarEvents() {
  const allLinks = document.querySelectorAll("a");
  allLinks.forEach(function (element) {
    element.addEventListener("click", (evt) => {
      evt.preventDefault();
      router.navigate(evt.target.attributes.href.value);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadingDOM);
