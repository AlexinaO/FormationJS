import { Meme } from "./metier/Meme.js";
import { router } from "./router.js";
import { images, promiseImage } from "./metier/Images.js";
import { promiseMemes } from "./metier/Memes.js";

let currentMeme = new Meme();
let documentSVGNode = undefined;
let documentFormEditor = undefined;

/*permet d'avoir le chargement de tous les évènements de cette partie*/
export function loadEditor(params) {
  console.log(params);
  documentSVGNode = document.querySelector("svg");
  documentFormEditor = document.forms["editor-form"];
  loadEditorEvents();

  const promiseResources = Promise.all([promiseImage, promiseMemes]).then(
    (arrayImagesMemes) => {
      loadSelectImagesInForm(arrayImagesMemes[0]);
      currentMeme = arrayImagesMemes[1].find((m) => m.id === Number(params.id));
      if (undefined !== params.id && undefined === currentMeme) {
        return router.navigate(404);
      }
      if (undefined === currentMeme) {
        currentMeme = new Meme();
      }
      updateForm();
      updateSVG(currentMeme, documentSVGNode);
    }
  );
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

const updateForm = () => {
  /*MAJ select*/
  //   document.forms["editor-form"]["imageId"].value = currentMeme.imageId;
  documentFormEditor["imageId"].value = currentMeme.imageId;
  /*MAJ text*/
  //   document.forms["editor-form"]["text"].value = currentMeme.text;
  documentFormEditor["text"].value = currentMeme.text;
  /*MAJ x*/
  //   document.forms["editor-form"]["x"].value = currentMeme.x;
  documentFormEditor["x"].value = currentMeme.x;
  /*MAJ Y*/
  //   document.forms["editor-form"]["y"].value = currentMeme.y;
  documentFormEditor["y"].value = currentMeme.y;
  /*MAJ font-size*/
  //   document.forms["editor-form"]["fontSize"].value = currentMeme.fontSize;
  documentFormEditor["fontSize"].value = currentMeme.fontSize;
  /*MAJ font-weight*/
  //   document.forms["editor-form"]["fontWeight"].value = currentMeme.fontWeight;
  documentFormEditor["fontWeight"].value = currentMeme.fontWeight;
  /*MAJ color*/
  //   document.forms["editor-form"]["color"].value = currentMeme.color;
  documentFormEditor["color"].value = currentMeme.color;
  /*MAJ underline*/
  //   document.forms["editor-form"]["underline"].checked = currentMeme.underline;
  documentFormEditor["underline"].checked = currentMeme.underline;
  /*MAJ italic*/
  //   document.forms["editor-form"]["italic"].checked = currentMeme.color;
  documentFormEditor["italic"].checked = currentMeme.color;
};
