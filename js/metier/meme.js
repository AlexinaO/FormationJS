/**
 * Class de gestion  d'un meme
 */
export class Meme {
  id = undefined; //gérée par le serveur
  text = "";
  x = 0;
  y = 10; //Le svg s'écrit par le bas et non par le bas
  fontSize = 10;
  fontWeight = 500;
  underline = false;
  italic = false;
  color = "#FFFFFF";
  imageId = -1;
  #endpoint = "/memes";

  constructor() {
    console.log("meme constructor");
  }

  save() {
    const promise = fetch(
      `http://localhost:5679${this.#endpoint}${
        undefined !== this.id ? "/" + this.id : ""
      }`,
      {
        method: undefined !== this.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this),
      }
    )
      .then((r) => r.json())
      .then((o) => {
        Object.assign(this, o); //Tous les champs de o dans this => ce qui donne une instance de meme avec les valeurs de o
      });
    return promise;
    // console.log("save at ", this.#endpoint, this);
    // console.log("save ", this.id, " at", this.#endpoint, this);
    // this.publicSave();
    // this.#privateSave();
  }

  publicSave() {
    console.log("public saving");
  }

  #privateSave() {
    console.log("private saving");
  }
}

let meme = new Meme();
// meme.save();
