var routes = [
  {
    name: "Thumbnail",
    path: /^\/thumbnail$/,
    url: "/pages/thumbnail/thumbnail.html",
  },
  {
    name: "Editor",
    path: /^\/edit((\/)|(\/(?<id>\d+)))?$/,
    url: "/pages/editor/editor.html",
    loaderJS: loadEditor,
  },
  {
    nmae: "Home",
    path: /\/?/,
    url: "/pages/home/home.html",
  },
];

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
function Router(rootNode, rootFolderOfTemplates = "/pages") {
  /* Définitions locales des propriétés et fonctions*/
  var currentRoute = undefined;
  function changePathName(pathName) {
    history.pushState(null, null, pathName);
    var route = undefined;
    var m;

    route = routes.find((r) => {
      m = r.path.exec(pathName);
      return m !== null;
    });
    if (undefined !== route) {
      route.params = m.groups;
    }
    route.pathName = pathName;
    currentRoute = route;
  }

  /**
   * Va chercher dans le DOM pour mettre le contenu
   * @param {Object} routeObject
   */
  function loadContentInPage(routeObject) {
    rootNode.innerHTML = routeObject.template;
    if (typeof routeObject.loaderJS === "function") {
      routeObject.loaderJS(currentRoute.params);
    }
  }

  function getcontentFromNetwork(routeObject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", routeObject.url);
    xhr.onreadystatechange = function (evt) {
      if (xhr.readyState < XMLHttpRequest.DONE) {
        return;
      }
      if (xhr.status >= 400) {
        /*304 répète*/
        console.log("erreur", xhr.status);
        return;
      }
      console.log("reponse", xhr.responseText);
      routeObject.template = xhr.responseText;
      loadContentInPage(routeObject);
    };
    xhr.send();
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
    if (undefined !== currentRoute.template) {
      loadContentInPage(currentRoute);
    } else {
      getcontentFromNetwork(currentRoute);
    }
  }
  navigate(location.pathname);
}
