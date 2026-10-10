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
    if (name.length < 3 || text.length < 3) {
      alert("Имя и комментарий должны быть не короче 3 символов");
      return;
    }
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
      if (error.message === "Сервер сломался") {
    alert("Сервер сломался, попробуй позже");
  } else if (error.message === "Плохой запрос") {
    alert("Имя и комментарий должны быть не короче 3 символов");
  } else {
    alert("Кажется, у вас сломался интернет, попробуйте позже");
  }
}

  })};