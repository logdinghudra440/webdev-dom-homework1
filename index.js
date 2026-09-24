import { renderComments } from "./render.js";
renderComments();

import { addEvent } from "./event.js";
addEvent();

import { addComment } from "./addComment.js"
addComment();

import { comments } from "./array.js";
import { list } from "./const.js";
import { getComments } from "./api.js";

async function init() {
  try {
    const loadedComments = await getComments();
    comments.push(...loadedComments);
    renderComments();
  } catch (error) {
    console.error(error);
    list.innerHTML = "<p>Не удалось загрузить комментарии</p>";
  }
}

addEvent();
addComment();
init();
