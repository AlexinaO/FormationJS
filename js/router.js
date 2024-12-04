/*
	public -> sur this
		+page actuelle champ en lecture
		+changement de chemin fonction
	
	private
		+champ de route privé en écriture
		+modif url
		+modif contenu (chargé les évènements)
		+récupération du contenu de page depuis le réseau

	Router = constructeur
	router = instance
*/

/**
 * Il serait possible de mettre l'adresse actuelle mais c'est une variable globale donc il y a accès
 * @param {string} rootFolderOfTemplates nom du répertoire des pages
 */
function Router(rootFolderOfTemplates = "/pages") {
  /* Définitions locales des propriétés et fonctions*/
  var currentRoute = location.pathname;
  function changePathName(pathName) {
    history.pushState(null, null, pathName);
    currentRoute = location.pathname;
  }

  function loadContentInPage(eventLoader) {}
  function getcontentFromNetwork(contentUri) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", contentUri);
    xhr.onreadystatechange = function (evt) {
      if (xhr.readyState < XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status >= 400) {
        /*304 répète*/
        console.log("erreur", xhr.status);
      }
      console.log("reponse", xhr.response);
    };
  }

  /*Définition des accès extérieurs à l'instance*/
  /**
   * getter de la route current
   * @returns {string} current pathName
   */
  this.getCurrentRoute = getCurrentRoute;
  function getCurrentRoute() {
    return currentRoute;
  }
  /**
   * Fonction de navigation avec chargement de contenu
   * @param {string} pathName path to navigate (starts with '/')
   */
  this.navigate = navigate;
  function navigate(pathName = "/") {
    changePathName(pathName);
    var url = rootFolderOfTemplates;
    switch (pathName) {
      case "/thumbnail":
        url += "/thumbnail/thumbnail.html";
        break;
      case "/editor":
        url += "/editor/editor.hmtl";
        break;
      default:
        url += "/home/home.html";
        break;
    }
    getcontentFromNetwork(url);
    loadContentInPage();
  }
}
