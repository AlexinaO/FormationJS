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
    path: /^\/?$/,
    url: "/pages/home/home.html",
  },
];

var errorsRoutes = {
  404: {
    name: "error 404 not found",
    url: "/pages/errors/404.html",
    status: 404,
    statusText: "not found",
    loaderJs: function () {
      /* on ne fait pas une arrow function pour que le this concerne l'objet route*/
      document.title = `${location.href} ${this.status} ${this.statusText}`;
      console.error(this.name + " chemin :" + this.pathName, location.href);
      document.querySelectorAll("#wrapper a").forEach((a) =>
        a.addEventListener("click", (evt) => {
          evt.preventDefault();
          router.navigate("/");
        })
      );
    },
  },
  500: {
    name: "error 500 internal server error",
    url: "/pages/errors/500.html",
    status: 500,
    statusText: "internal server error",
    loaderJs: function () {
      document.title = `${location.href} ${this.status} ${this.statusText}`;
      console.error(this.name + " chemin :" + this.pathName, location.href);
      document.querySelector("#message").innerHTML = this.message;
      document.querySelectorAll("#wrapper a").forEach((a) =>
        a.addEventListener("click", (evt) => {
          evt.preventDefault();
          router.navigate("/");
        })
      );
    },
  },
};

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
    if (undefined === currentRoute) {
      history.pushState(null, null, pathName);
      var route = undefined;
      var m;

      route = routes.find((r) => {
        m = r.path.exec(pathName);
        return m !== null;
      });
      if (undefined !== route) {
        route.params = m.groups;
      } else {
        route.errorsRoutes[404];
      }
      currentRoute = route;
    }

    currentRoute.pathName = pathName;
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
      //   console.log("reponse", xhr.responseText);
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
  function navigate(pathName = "/", message) {
    currentRoute = undefined;
    if (Number.isInteger(pathName)) {
      currentRoute = errorsRoutes[pathName];
      currentRoute.message = message;
    }
    changePathName(pathName);
    if (undefined !== currentRoute.template) {
      loadContentInPage(currentRoute);
    } else {
      getcontentFromNetwork(currentRoute);
    }
  }
  navigate(location.pathname);
}

/*on exporte l'instance de router pour que cela soit disponible pour tout le monde*/
export let router;
export const initRouter = (routerDomNode) => {
  router = new Router(routerDomNode);
};
