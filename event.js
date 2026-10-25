 import { renderComments } from "./render.js";
 import { list } from "./const.js";
 import { comments } from "./array.js";
 
 export function addEvent () {
 list.addEventListener("click", (event) => {
    if (event.target.classList.contains('like-button')){
    const li = event.target.closest('.comment');
    const index = li.dataset.index;
    const comment = comments[index];
    
    if (comment.isLiked === false) {
      comment.isLiked = true;
      comment.likes = comment.likes + 1;
    } else {
      comment.isLiked = false;
      comment.likes = comment.likes - 1;
    }
    event.stopPropagation();
    renderComments();
    return;
  }
    const commentElement = event.target.closest('.comment');
    if (!commentElement) return;

    const index = Number(commentElement.dataset.index);
    const findArray = comments[index];
    
    const commentInput = document.getElementById("com");
    if (commentInput && findArray) {
      commentInput.value = `${findArray.name}: ${findArray.text}`;
}
 });
}