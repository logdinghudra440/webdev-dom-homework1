import { sanitize } from "./const.js";
import { token } from "./state.js";

const API_URL = "https://wedev-api.sky.pro/api/v2/logdinghudra440/comments";
const AUTH_URL = "https://wedev-api.sky.pro/api/user/login"
export async function getComments() {
  const response = await fetch(API_URL);
  console.log("status:", response.status);
  if (response.status === 500) throw new Error("Сервер сломался");
  if (!response.ok) {
    throw new Error("Не удалось загрузить комментарии");
  }
  const data = await response.json();
  console.log("Ответ сервера:", data);

  return data.comments.map((item) => ({
    name: sanitize(item.author.name),
    date: new Date(item.date).toLocaleString("ru-RU"),
    text: sanitize(item.text),
    likes: item.likes,
    isLiked: item.isLiked,
  }));
}

export async function createComment(name, text) {
  const response = await fetch(API_URL, {
    method: "POST",
     headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, text }),

  });
  if (response.status === 400) throw new Error("Плохой запрос");
  if (response.status === 500) throw new Error("Сервер сломался");
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Не удалось добавить комментарий");
  }
  return response.json();
}

export async function login(userLogin, userPassword) {
  const response = await fetch(AUTH_URL, {
    method: "POST",
      headers: {
      "Content-Type": "application/json", // ← добавь эту строчку
    },
    body: JSON.stringify({login: userLogin, password: userPassword}),
  });
  if (!response.ok) {
    throw new Error("Неверный логин или пароль");
  }
  const data = await response.json();
  return data.user;
}