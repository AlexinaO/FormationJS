/**
 * Classe gestion des images
 */
class Images extends Array {
  #endpoint = "/images";

  constructor() {
    super(); //Ce qui appartient au parent
  }

  find(params) {
    return super.find(params);
  }

  /**
   * Chargement de la liste d'images à partir du serveur REST
   * @returns {Promise<Images>} promise<Images> (déjà lu) du fecth
   */
  load() {
    return fetch(`http://localhost:5679${this.#endpoint}`, {
      method: "GET", //facultatif pour GET
      headers: {
        Accept: "application/json",
      },
    })
      .then((r) => {
        console.log("load images", r);
        return r.json();
      })
      .then((o) => {
        return Object.assign(this, o); //si on ne met pas les accolades on peut mettre directement .then((0)=>Object.assign(this, o));
      });
  }
}

export const images = new Images();
export const promiseImage = images.load();
