import { comments } from "./array.js";
import { renderComments } from "./render.js";
import { createComment, getComments } from "./api.js";

export function addComment() {
  const button = document.getElementById("add");
  if (!button) return; 

  button.addEventListener("click", async () => {
    const userName = document.getElementById("name");
    const comment = document.getElementById("com");
    const addForm = document.querySelector(".add-form");
    const loadingAdd = document.getElementById("loading-add");

    const name = userName.value;
    const text = comment.value; 

    if (name.length < 3 || text.length < 3) {
      alert("Имя и комментарий должны быть не короче 3 символов");
      return;
    }
    
    addForm.style.display = "none";
    if (loadingAdd) loadingAdd.style.display = "block";

    try {
      await createComment(name, text);
      const freshComments = await getComments();
      comments.splice(0, comments.length); 
      comments.push(...freshComments);  
      
      comment.value = "";
  
      renderComments(); 
      
      const newLoading = document.getElementById("loading-add");
      if (newLoading) newLoading.style.display = "none";
    } 
    catch (error) {

      const currentForm = document.querySelector(".add-form");
      if (currentForm) currentForm.style.display = "";
      
      const currentLoading = document.getElementById("loading-add");
      if (currentLoading) currentLoading.style.display = "none";

      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
      } else if (error.message === "Плохой запрос") {
        alert("Имя и комментарий должны быть не короче 3 символов");
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    }
  });
}