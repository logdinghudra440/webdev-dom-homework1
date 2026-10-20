import { list } from "./const.js";
import { comments } from "./array.js";
import { token, userName } from "./state.js";

export function renderComments() {
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
  /* list.innerHTML = htmlString.join(''); */
  let addFormHTML = "";
  if (token === "") {
     addFormHTML = `
      <div class="add-form" style="text-align: center; padding: 20px; color: white;">
        <a href="#" id="go-to-login" style="color: #bcec30; text-decoration: none; font-size: 18px;">
          Чтобы добавить комментарий, авторизуйтесь
        </a>
      </div>
    `;
  } else {
    addFormHTML = `
      <div class="add-form" id="add-form-container">
        <input id="name" type="text" class="add-form-name" value="${userName}" readonly />
        <textarea id="com" type="textarea" class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add">Написать</button>
        </div>
      </div>
    `;
  }  list.innerHTML = htmlString.join('') + addFormHTML;
}
