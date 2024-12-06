export const routes = [
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
