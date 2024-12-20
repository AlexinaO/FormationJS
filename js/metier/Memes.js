class Memes extends Array {
  static #endpoint = "/memes";
  static get endpoint() {
    return this.#endpoint;
  }
  //   static set endpoint(value) {
  //     this.#endpoint = value;
  //   }

  constructor(parameters) {
    super();
  }

  find(params) {
    return super.find(params);
  }

  /**
   *
   * @returns {Promise<Memes>} promise d'un tableau de memes
   */
  load() {
    return fetch(`http://localhost:5679${Memes.endpoint}`)
      .then((r) => {
        console.log("load memes", r);
        return r.json();
      })
      .then((array) => {
        this.splice(0); // on vide l'array pour la recharger dans sa totalité avec le push
        //array est un objet JS
        // array.forEach(element => {
        // 	const oneMeme = Object.assign(new Memes(), element);
        // 	this.push(oneMeme);
        // });
        const tableauDesMemesAssembled = array.map((element) =>
          Object.assign(new Memes(), element)
        );
        this.push(...tableauDesMemesAssembled);
        return this;
      });
  }

  /**
   * ajout ou update un meme existant
   * @param {Meme} meme
   */
  addMeme(meme) {
    const position = this.findIndex((m) => m.id === meme.id);
    if (position == -1) {
      this.push(meme);
    } else {
      this[position] = meme;
    }
  }
}

export const memes = new Memes();
export const promiseMemes = memes.load();
