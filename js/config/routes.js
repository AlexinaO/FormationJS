import { loadEditor } from "../editor.js";
import { loadThumbnail } from "../thumbnail.js";

export const routes = [
  {
    name: "Thumbnail",
    path: /^\/thumbnail$/,
    url: "/pages/thumbnail/thumbnail.html",
    loaderJS: loadThumbnail,
    cssFile: "/pages/thumbnail/thumbnail.css",
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
