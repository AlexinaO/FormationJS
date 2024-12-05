let currentMeme = new Meme();

/*permet d'avoir le chargement de tous les évènements de cette partie*/
function loadEditor(params) {
  console.log(params);
  loadEditorEvents();
  promiseImage.then((arrayImages) => {
    loadSelectImagesInForm(arrayImages);
  });
}

function loadEditorEvents() {
  console.log("route", router.getCurrentRoute());
  document.forms["editor-form"].addEventListener("submit", function (evt) {
    evt.preventDefault();
    currentMeme.save();
  });
  document.forms["editor-form"]["text"].addEventListener("input", (evt) => {
    currentMeme.text = evt.target.value;
  });
  document.forms["editor-form"]["imageId"].addEventListener("change", (evt) => {
    currentMeme.imageId = Number(evt.target.value);
  });

  document.forms["editor-form"]["x"].addEventListener("change", (evt) => {
    currentMeme.x = parseInt(evt.target.value);
  });
  document.forms["editor-form"]["y"].addEventListener("change", (evt) => {
    currentMeme.y = parseInt(evt.target.value);
  });
  document.forms["editor-form"]["fontSize"].addEventListener(
    "change",
    (evt) => {
      currentMeme.fontSize = parseInt(evt.target.value);
    }
  );
  document.forms["editor-form"]["fontWeight"].addEventListener(
    "change",
    (evt) => {
      currentMeme.fontWeight = evt.target.value;
    }
  );
  document.forms["editor-form"]["underline"].addEventListener(
    "change",
    (evt) => {
      currentMeme.underline = evt.target.checked;
    }
  );
  document.forms["editor-form"]["italic"].addEventListener("change", (evt) => {
    currentMeme.italic = evt.target.checked;
  });
  document.forms["editor-form"]["color"].addEventListener("change", (evt) => {
    currentMeme.color = evt.target.value;
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
