import { fetchData, setCurrentUser, setCurrentNote,getCurrentUser, getCurrentNote, } from "./fetch.js";
class User{

    constructor(username,password){

        this.userName=username;
        this.password=password;
    }

    getUsername(){
        return this.userName;
    }

    setUsername(name_parameter){
        this.userName=name_parameter;
    }

    getPassword(){
        return this.password;
    }

    setPassword(passcode_parameter){
        this.password=passcode_parameter;
    }
}
let loginform=document.getElementById("login_form");

if(loginform) loginform.addEventListener('submit',create_u);

function create_u(e){

    e.preventDefault();
    
    let username=document.getElementById('uname/email').value;
    let password=document.getElementById('pass').value;

    
    

    const user=new User(username,password);
 
    console.log(user);

    fetchData("/users/login", user, "POST")
        .then((data) => {
    setCurrentUser(data);
    window.location.href = "note.html";
  })
  .catch((err) => {
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  }) 


    let u=document.getElementById("uname/email");
    u.value="";
    let p=document.getElementById("pass");
    p.value="";
}


class Register{

    constructor(firstname,lastname,username,password){
        this.firstname=firstname;
        this.lastname=lastname;
        this.userName=username;
        this.password=password;
    }

    getfirstname(){
        return this.firstname;
    }

    setfirstname(f_name_parameter){
        this.firstname=f_name_parameter;
    }

    getlastname(){
        return this.lastname;
    }
    
    setlastname(l_name_parameter){
        this.lastname=l_name_parameter;
    }
    getUsername(){
        return this.userName;
    }

    setUsername(name_parameter){
        this.UserName=name_parameter;
    }

    getPassword(){
        return this.password;
    }

    setPassword(passcode_parameter){
        this.password=passcode_parameter;
    }
}

const registerform=document.getElementById("register_form");

if(registerform) registerform.addEventListener('submit',create_r);

function create_r(e){

    e.preventDefault();

    let firstname=document.getElementById("fname").value;
    let lastname=document.getElementById("lname").value;
    let userName=document.getElementById("uname/email").value;
    let password=document.getElementById("pass").value;

    

    const user=new Register(firstname,lastname,userName,password);

    console.log(user);

    fetchData("/users/register",user , "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "note.html";
  })
  .catch((err) =>{
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })

    let f=document.getElementById("fname");
    f.value="";
    let l=document.getElementById("lname");
    l.value="";
    let u=document.getElementById("uname/email");
    u.value="";
    let p=document.getElementById("pass");
    p.value="";

}

///////////////////////////////////////////////////////////////////////
class Note{

    constructor(text){
        this.note=text;
    }

    getnote(){
        return this.note;

    }

    setnote(text_parameter){
        this.note=text_parameter;
    }


}

const noteform=document.getElementById("note_form");

if(noteform) noteform.addEventListener('submit',create_n);

function create_n(e){

    e.preventDefault();

    let note1=document.getElementById("note_id").value;

    const note=new Note(note1);
    console.log(note);
    let user = getCurrentUser();
    note.userID = user.userID;
    fetchData("/notes/create", note , "POST")
  .then((data) => {
    //setCurrentUser(data);
    console.log(data);
    //window.location.href = "note.html";
  })
  .catch((err) =>{
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })
}
//////////////////////////////
const usersBtn=document.getElementById("users-btn");

if(usersBtn)usersBtn.addEventListener('click',getUsers);



function getUsers(){
    fetch("http://localhost:3000/users/")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        let ul=document.getElementById("allUsers");

        data.forEach((user)=>{
            let li=document.createElement('li');
            let text=document.createTextNode(user.userName);

            li.appendChild(text);
            ul.appendChild(li);
        })
    })

    .catch((err)=>console.log(`error! ${err}`));
}



const notesBtn=document.getElementById("notes-btn");
if(notesBtn)notesBtn.addEventListener('click',getNotes);
let user=getCurrentUser();

if(user && noteform) getNotes();


 function getNotes(){
    let user = getCurrentUser();
     fetchData("/notes/", user,"post")
     .then((data)=>{
         let ul=document.getElementById("allNotes");

         data.forEach((note)=>{
             let li=document.createElement('li');
             let text=document.createTextNode(note.note);
             li.appendChild(text);
             ul.appendChild(li);

         })
     })
     .catch((err)=>console.log(`Error! ${err}`));

     //window.location.href="note.html";
 }

 