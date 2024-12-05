/**
 * Class de gestion  d'un meme
 */
class Meme {
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
    // console.log("save at ", this.#endpoint, this);
    console.log("save ", this.id, " at", this.#endpoint, this);
    this.publicSave();
    this.#privateSave();
  }

  publicSave() {
    console.log("public saving");
  }

  #privateSave() {
    console.log("private saving");
  }
}

let meme = new Meme();
meme.save();
