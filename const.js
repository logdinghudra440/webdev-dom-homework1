export const list = document.getElementById("list");
 
  export function sanitize(str) {
    return str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}



 