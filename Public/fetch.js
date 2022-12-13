let nav = document.querySelector('nav');

if(getCurrentUser()) {
  nav.innerHTML = `
    
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
      <a id="logout-btn">Logout</a>
    
  `
} else {
  nav.innerHTML = `
    
      <a href="">Describe</a>
      <a href="login.html">Login</a>
      <a href="register.html">Register</a>
    
  `
}

// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
} 

// logout event listener
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

// stateful mechanism for user
// logging in a user
export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

// getting current user function
export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

// logout function for current user
export function removeCurrentUser() {
  localStorage.removeItem('user');
  window.location.href = "login.html";
}

export function setCurrentNote(note) {
  localStorage.setItem('note', JSON.stringify(note));
}

// getting current user function
export function getCurrentNote() {
  return JSON.parse(localStorage.getItem('note'));
}

// logout function for current user
export function removeCurrentNote() {
  localStorage.removeItem('note');
  window.location.href = "note.html";
}