 import { renderComments } from "./render";
 import { comment, list } from "./const";
 import { comments } from "./array";
 
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
    const index = Number(commentElement.dataset.index);
    const findArray = comments[index];
    comment.value = `${findArray.name}: ${findArray.text}`;
});