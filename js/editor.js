/*permet d'avoir le chargement de tous les évènements de cette partie*/
function loadEditorEvents() {
  document.forms["editor-form"].addEventListener("submit", function (evt) {
    evt.preventDefault();
    console.log("form submit");
  });
}
