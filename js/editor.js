/*permet d'avoir le chargement de tous les évènements de cette partie*/
function loadEditor(params) {
  console.log(params);
  loadEditorEvents();
}

function loadEditorEvents() {
  console.log("route", router.getCurrentRoute());
  document.forms["editor-form"].addEventListener("submit", function (evt) {
    evt.preventDefault();
    console.log("form submit");
  });
}
