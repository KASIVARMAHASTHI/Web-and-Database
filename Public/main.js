console.log("javascript")
const login1=document.getElementById("login");
const reg=document.getElementById("Register");
const note=document.getElementById("Notes");

if(login1) login1.addEventListener('submit',fun)
if(reg) reg.addEventListener('submit',fun2)
if(note) {
   
    note.addEventListener('submit',fun3);
}
function fun2(e)
{
    e.preventDefault();
    let firstname=document.getElementById('user_Firstname').value;
    let lastname=document.getElementById('user_Lastname').value;
    let email=document.getElementById('user_E-mail_Id').value;
    let password=document.getElementById('User_pass').value;
    
    
    class User{
        constructor(firstname,lastname,email,password)
        {   
            this.firstname=firstname; 
            this.lastname=lastname;
            this.email=email;
            this.password=password;
           
        }
        getemail(){
            return this.email;
        }
        setemail(newemail){
            this.email = newemail;
        }
        getpassword(){
            return this.password;
        }
        setpassword(newpassword){
            this.password=newpassword
        }
        getfirstname(){
            return this.firstname;
        }
        setfirstname(newfirstname){
            this.firstname = newfirstname;
        }
        getlastname(){
            return this.lastname;
        }
        setlastname(newlastname){
            this.lastname=newlastname;
        }
    }
    
    
    const user1=new User(firstname,lastname,email,password);
    console.log(user1);
    document.getElementById("Register");
    
}

function fun(e)
{
    e.preventDefault()
    
    let email=document.getElementById('user').value;
    let password=document.getElementById('User_pass').value;
    class User{
        constructor(email,password)
        {
           
            this.email=email;
            this.password=password;
        }
        getemail(){
            return this.email;
        }
        setemail(newemail){
            this.email = newemail;
        }
        getpassword(){
            return this.password;
        }
        setpassword(newpassword){
            this.password=newpassword
        }
    }
    
    const user1=new User(email,password);
    console.log(user1);
    document.getElementById("login").reset();
}

function fun3(e)
{
e.preventDefault();
let note=document.getElementById('EnterNotes').value;

class User{
    constructor(note)
    {
       
        this.note=note;
    }
    getnote(){
        return this.note;
    }
    setemail(newnote){
        this.note = newnote;
    }
    
}
const notes=new User(note);
console.log(notes);
document.getElementById("Notes").reset();
}
const loginDetails=document.getElementById("login_button");

if(loginDetails) loginDetails.addEventListener('click',getUsers);

function getUsers(){
    fetch("http://localhost:3000/users/")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        let ulist=document.getElementById("logindetails");

        data.forEach((user)=>{
            let li=document.createElement('li');
            let text=document.createTextNode(user.userName);
            li.appendChild(text);
            ulist.appendChild(li);
        })
    })

    .catch((err)=>console.log(`error! ${err}`));
}

const noteinfo=document.getElementById("Note_button");
if(noteinfo) noteinfo.addEventListener('click',getAllNotes);

 function getAllNotes(){
    console.log("1");
    fetch("http://localhost:3000/Note/")
     .then((res)=>res.json())
     .then((data)=>{
         console.log(data);
         let ulist=document.getElementById("Notedetails");

         data.forEach((note)=>{
             let li=document.createElement('li'); 
             let text=document.createTextNode(note.Noteinputform);
             li.appendChild(text);
             ulist.appendChild(li);

         })


     })
     .catch((err)=>console.log(`Error! ${err}`));
    }

