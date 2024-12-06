let currentMeme = new Meme();
let documentSVGNode = undefined;

/*permet d'avoir le chargement de tous les évènements de cette partie*/
function loadEditor(params) {
  console.log(params);
  loadEditorEvents();
  promiseImage.then((arrayImages) => {
    loadSelectImagesInForm(arrayImages);
  });
  documentSVGNode = document.querySelector("svg");
}

function treatInputStringEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.value;
  updateSVG(currentMeme, documentSVGNode);
}

function treatInputNumberEventChange(evt) {
  currentMeme[evt.target.name] = parseInt(evt.target.value);
  updateSVG(currentMeme, documentSVGNode);
}

function treatCheckedEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.checked;
  updateSVG(currentMeme, documentSVGNode);
}

function loadEditorEvents() {
  console.log("route", router.getCurrentRoute());
  document.forms["editor-form"].addEventListener("submit", function (evt) {
    evt.preventDefault();
    currentMeme.save();
  });
  document.forms["editor-form"]["text"].addEventListener("input", (evt) => {
    treatInputStringEventChange(evt);
  });
  document.forms["editor-form"]["imageId"].addEventListener("change", (evt) => {
    treatInputNumberEventChange(evt);
  });

  document.forms["editor-form"]["x"].addEventListener("change", (evt) => {
    treatInputNumberEventChange(evt);
  });
  document.forms["editor-form"]["y"].addEventListener("change", (evt) => {
    treatInputNumberEventChange(evt);
  });
  document.forms["editor-form"]["fontSize"].addEventListener(
    "change",
    (evt) => {
      treatInputNumberEventChange(evt);
    }
  );
  document.forms["editor-form"]["fontWeight"].addEventListener(
    "change",
    (evt) => {
      treatInputStringEventChange(evt);
    }
  );
  document.forms["editor-form"]["underline"].addEventListener(
    "change",
    (evt) => {
      treatCheckedEventChange(evt);
    }
  );
  document.forms["editor-form"]["italic"].addEventListener("change", (evt) => {
    treatCheckedEventChange(evt);
  });
  document.forms["editor-form"]["color"].addEventListener("input", (evt) => {
    treatInputStringEventChange(evt);
  });
}

/**
 * Function dans constante pour qu'elle ne soit pas redéfinie
 * reçoit une liste d'image
 * @param {Images} images
 */
const loadSelectImagesInForm = (images) => {
  const select = document.forms["editor-form"]["imageId"];
  const optionBase = select.children[0];
  select.innerHTML = ""; // on vide le select
  select.appendChild(optionBase);
  images.forEach((image) => {
    const optionClone = optionBase.cloneNode(true); // copie parfaite indépendante
    optionClone.value = image.id;
    optionClone.innerHTML = image.name;
    select.appendChild(optionClone);
  });
  //   console.log("select", select);
};

const updateSVG = (meme, SVGRootNode) => {
  /* on récupère l'image du meme*/
  const img = images.find((i) => i.id === meme.imageId);

  /*On change le viewbox*/

  SVGRootNode.setAttribute(
    "viewBox",
    `0 0 ${undefined !== img ? img.w : `500`} ${
      undefined !== img ? img.h : `500`
    }`
  );

  SVGRootNode.innerHTML = "";
  const textSVG = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );

  /* on récupère la balise text*/
  //   const textSVG = SVGRootNode.querySelector("text");

  /*On  met x et y dans le text*/
  textSVG.setAttribute("x", meme.x);
  textSVG.setAttribute("y", meme.y);

  /* On met text-decoration*/
  textSVG.setAttribute(
    "text-decoration",
    meme.underline ? `underline` : `none`
  );

  textSVG.setAttribute("font-style", meme.italic ? `italic` : `normal`);

  /*On met la taille */
  textSVG.setAttribute("font-size", meme.fontSize);

  /*On met le font-weight*/
  textSVG.setAttribute("font-weight", meme.fontWeight);

  /*On met le texte*/
  textSVG.innerHTML = meme.text;

  /*On  met la couleur*/
  textSVG.setAttribute("fill", meme.color);

  SVGRootNode.appendChild(textSVG);

  /*Ajouter l'image*/
  if (undefined !== img) {
    const imageSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image"
    );
    //   imageSVG.setAttribute(`xlink:href`, img.url);
    imageSVG.setAttribute("x", 0);
    imageSVG.setAttribute("y", 0);

    imageSVG.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      img.url
    );
    SVGRootNode.insertBefore(imageSVG, textSVG);
  }
};
