import { sanitize } from "./const.js";

const API_URL = "https://wedev-api.sky.pro/api/v1/karina-tishchenko/comments";

export async function getComments() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Не удалось загрузить комментарии");
  }
  const data = await response.json();
  return data.comments.map((item) => ({
    name: sanitize(item.author.name),
    date: new Date(item.date).toLocaleString("ru-RU"),
    text: sanitize(item.text),
    likes: 0,
    isLiked: false,
  }));
}

export async function createComment(name, text) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, text }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Не удалось добавить комментарий");
  }
  return response.json();
}