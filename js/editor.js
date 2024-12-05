let currentMeme = new Meme();

/*permet d'avoir le chargement de tous les évènements de cette partie*/
function loadEditor(params) {
  console.log(params);
  loadEditorEvents();
  promiseImage.then((arrayImages) => {
    loadSelectImagesInForm(arrayImages);
  });
}

function treatInputStringEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.value;
}

function treatInputNumberEventChange(evt) {
  currentMeme[evt.target.name] = parseInt(evt.target.value);
}

function treatCheckedEventChange(evt) {
  currentMeme[evt.target.name] = evt.target.checked;
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
    currentMeme.imageId = Number(evt.target.value);
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
  document.forms["editor-form"]["color"].addEventListener("change", (evt) => {
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
    optionClone.Value = image.imageId;
    optionClone.innerHTML = image.name;
    select.appendChild(optionClone);
  });
  //   console.log("select", select);
};
