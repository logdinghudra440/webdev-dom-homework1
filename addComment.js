import { userName, comment, button } from "./const";
import { comments } from "./array";
import { renderComments } from "./render";
import { sanitize } from "./const";

button.addEventListener("click", () => {
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
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear().toString().slice(-2)} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    const safeName = sanitize(name);
    const safeText = sanitize(text);
    
    const comNew = {
    name: safeName,
    date: formattedDate,
    text: safeText,
    likes: 0,
    isLiked: false
    };
    comments.push(comNew);
    userName.value = "";
    comment.value = "";
    userName.style.border = "";
    comment.style.border = "";
    renderComments();
  });