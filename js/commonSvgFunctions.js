import { images } from "./metier/Images.js";

export const updateSVG = (meme, SVGRootNode) => {
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
