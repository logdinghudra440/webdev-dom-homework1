import { renderComments } from "./render.js";
import { addEvent } from "./event.js";
import { comments } from "./array.js";
import { list } from "./const.js";
import { getComments } from "./api.js";

async function init() {
  try {
    list.innerHTML = "<p>Комментарии загружаются...</p>";
    const loadedComments = await getComments();
    console.log("loadedComments:", loadedComments);
    comments.push(...loadedComments);
     console.log("comments после push:", comments);
    renderComments();
  } catch (error) {
    console.error("Ошибка в init:", error);
    list.innerHTML = "<p>Не удалось загрузить комментарии</p>";
  }
}

addEvent();
init();
