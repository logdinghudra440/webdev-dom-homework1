import { userName, comment, button } from "./const.js";
import { comments } from "./array.js";
import { renderComments } from "./render.js";
import { sanitize } from "./const.js";
import { createComment } from "./apis.js";
import { getComments } from "./apis.js";

export function addComment() {button.addEventListener("click", async () => {
    if (userName.value === "") {
      userName.style.border = "1px solid red";
      return;
    }
    if (comment.value === "") {
      comment.style.border = "1px solid red";
      return;
}
    const name = userName.value;
    const text = comment.value; 

    try {
      await createComment(name, text);
      const freshComments = await getComments();
      comments.splice(0, comments.length); 
      comments.push(...freshComments);  
      userName.value = "";
    comment.value = "";
    userName.style.border = "";
    comment.style.border = "";
    renderComments();
    } 
    catch (error){
      console.error("Ошибка при добавлении комментария:", error);
      alert("Не удалось добавить комментарий.Попробуйте позже")
    }
  })};