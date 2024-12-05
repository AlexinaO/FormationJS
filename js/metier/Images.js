/**
 * Classe gestion des images
 */
class Images extends Array {
  #endpoint = "/images";

  constructor() {
    super(); //Ce qui appartient au parent
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
        Object.assign(this, o);
      });
  }
}

const images = new Images();
const promiseImage = images.load();
