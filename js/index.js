/*Fichier principal de l'application*/

function loadingDOM() {
  document.querySelector("#js-notification").remove();
  document.querySelector("#header button").remove();
  //   jsnotif.style.backgroundColor = "green";
  //   // document.querySelector('#js-notification').style.backgroundColor = 'green';
  //   // document.querySelector('#js-notification').innerHTML = 'JS <span style="font-weight:900; color:red;">OK</span>'
  //   jsnotif.innerHTML = 'JS <span style="font-weight:900; color:red;">OK</span>';
  //   document
  //     .querySelector("#header > button")
  //     .addEventListener("click", function (evt) {
  //       evt.stopPropagation();
  //       console.log("button header", evt);
  //       console.log("J'ai cliqué sur le bouton !");
  //     });
  //   document.querySelector("#header").addEventListener("click", function (evt) {
  //     console.log("header", evt);
  //     console.log("header cliqué !");
  //   });
  loadNavbarEvents();
  //   loadEditorEvens();
}

// loadingDOM();

/**
 * Fonction de chargment des events de navbar
 */
function loadNavbarEvents() {
  let allLinks = document.querySelectorAll("nav a");
  allLinks.forEach(function (element) {
    element.addEventListener("click", (evt) => {
      evt.preventDefault();
      //   history.pushState(null, null, element.href);
      history.pushState(null, null, evt.target.href);
      console.log("loadNavbarEvents");
    });
  });
}

document.addEventListener("DOMContentLoaded", loadingDOM);
