
  const userName = document.getElementById("name");
  const comment = document.getElementById("com");
  const button = document.getElementById("add");
  const list = document.getElementById("list");
  const oldHtml = list.innerHTML;
 
  const comments = [
    {
     name: "Глеб Фокин",
     date: "12.02.22 12:18",
     text: "Это будет первый комментарий на этой странице",
     likes: 3,
     isLiked: false
    },
    {
     name: "Варвара Н.",
     date: "13.02.22 19:22",
     text: "Мне нравится как оформлена эта страница! ❤",
     likes: 75,
     isLiked: true
    }
  ]

  function sanitize(str) {
    return str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}



 