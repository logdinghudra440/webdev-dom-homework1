import { list } from "./const.js";
import { comments } from "./array.js";
import { token, userName, setToken, setUserName } from "./state.js";
import { addComment } from "./addComment.js";
import { login } from "./api.js";
import { getComments } from "./api.js";

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
  }  
  list.innerHTML = htmlString.join('') + addFormHTML;
   const goToLoginLink = document.getElementById("go-to-login");
  if (goToLoginLink) {
    goToLoginLink.addEventListener("click", (event) => {
      event.preventDefault(); 
      renderLogin();          
    });
  }
   addComment();
}

export function renderLogin() {
  const app = document.getElementById("list"); 
  
  app.innerHTML = `
    <div class="add-form" style="margin: 0 auto; display: flex; flex-direction: column; gap: 15px;">
      <h2 style="margin: 0; text-align: center;">Вход</h2>
      <input id="login-input" type="text" class="add-form-name" placeholder="Введите логин" style="width: 100%;" />
      <input id="password-input" type="password" class="add-form-name" placeholder="Введите пароль" style="width: 100%;" />
      <div class="add-form-row">
        <button class="add-form-button" id="login-button">Войти</button>
      </div>
    </div>
  `;

  const loginButton = document.getElementById("login-button");
  
  loginButton.addEventListener("click", async () => {
    const loginInput = document.getElementById("login-input");
    const passwordInput = document.getElementById("password-input");

    const userLogin = loginInput.value;
    const userPassword = passwordInput.value;

    if (userLogin === "" || userPassword === "") {
      alert("Введите логин и пароль");
      return;
    }

    try {
      const userData = await login(userLogin, userPassword);
      
      setToken(userData.token);
      setUserName(userData.name);

      app.innerHTML = "<p>Комментарии загружаются...</p>";
      const freshComments = await getComments();
      comments.splice(0, comments.length);
      comments.push(...freshComments);

      renderComments();
      
    } catch (error) {
      if (error.message === "Неверный логин или пароль") {
        alert("Неверный логин или пароль");
      } else {
        alert("Ошибка авторизации. Попробуйте позже");
      }
    }
  });
}
 