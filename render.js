 function renderComments() {
  const htmlString = comments.map(function(items, index){
    let likeClass = '';
    if (items.isLiked === true) {
    likeClass = '-active-like';
    } else {
    likeClass = '';
    }
    return`
    <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${items.name}</div>
            <div>${items.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${items.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${items.likes}</span>
              <button class="like-button  ${likeClass}"></button>
            </div>
          </div>
        </li>`
  }) 
  list.innerHTML = htmlString.join('');
}
renderComments();