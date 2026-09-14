
  export const userName = document.getElementById("name");
  export const comment = document.getElementById("com");
  export const button = document.getElementById("add");
  export const list = document.getElementById("list");
 
 
  export function sanitize(str) {
    return str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}



 