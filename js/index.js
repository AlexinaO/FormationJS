/*Fichier principal de l'application*/

function loadingDOM() {
  document.querySelector("#js-notification").remove();
  //   document.querySelector("#header > button").remove();
  //   jsnotif.style.backgroundColor = "green";
  //   // document.querySelector('#js-notification').style.backgroundColor = 'green';
  //   // document.querySelector('#js-notification').innerHTML = 'JS <span style="font-weight:900; color:red;">OK</span>'
  //   jsnotif.innerHTML = 'JS <span style="font-weight:900; color:red;">OK</span>';
  document
    .querySelector("#header > button")
    .addEventListener("click", function (evt) {
      evt.stopPropagation();
      console.log("button header", evt);
      console.log("J'ai cliqué sur le bouton !");
    });
  //   document.querySelector("#header").addEventListener("click", function (evt) {
  //     console.log("header", evt);
  //     console.log("header cliqué !");
  //   });
}

// loadingDOM();

document.addEventListener("DOMContentLoaded", loadingDOM);
