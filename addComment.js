import { userName, comment, button, loadingAdd, addForm } from "./const.js";
import { comments } from "./array.js";
import { renderComments } from "./render.js";
import { sanitize } from "./const.js";
import { createComment } from "./api.js";
import { getComments } from "./api.js";

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
    addForm.style.display = "none";
    loadingAdd.style.display = "block";

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
      addForm.style.display = "";
      loadingAdd.style.display = "none";
    } 
    catch (error){
      addForm.style.display = "";
      loadingAdd.style.display = "none";
      console.error("Ошибка при добавлении комментария:", error);
      alert("Не удалось добавить комментарий.Попробуйте позже")
    }
  })};