const con = require("./db_connect");               

async function createTable(){
    let sql=`CREATE TABLE if not exists notes(
        noteID INT NOT NULL AUTO_INCREMENT,
        note VARCHAR(255) NOT NULL UNIQUE,
        userID INT,
        CONSTRAINT notePK PRIMARY KEY(noteID),
        CONSTRAINT FOREIGN KEY (userID) REFERENCES users(userID)
        

    );`
    await con.query(sql);                            
}

createTable();

async function getAllNotes() {
    const sql = `SELECT * FROM notes;`;
    let notes = await con.query(sql);
    console.log(notes)
    return await notes;
  }

  async function createNote(note){

    let cNote=await getNote(note);

    const sql=`INSERT INTO notes(note,userID) VALUES ("${note.note}",${note.userID});`

    await con.query(sql);
    return cNote[0];
    
}

  async function editNote(note){
    let sql=`update notes SET note="${note.note}" where noteID=${note.noteID}`;

    await con.query(sql);
    let updatedNote=await getNote(note);

    return updatedNote[0];
}

async function deleteNote(note){
    let sql=`Delete from notes where noteID=${note.noteID}`;

    await con.query(sql);

}

async function getNote(note){
    let sql;

    if(note.noteID){
        sql=`select * from notes where noteID=${note.noteID}`;

    }
    else{
        sql=`select * from notes where userID=${note.userID}`;
    }

    return await con.query(sql);
}


const notes=[{
    noteId:2345,
    notecontent:"Hello"
},{
    noteId:1234,
    notecontent:"How r u??"
},
];

function getNotes(){
    return notes;
}

module.exports={getAllNotes,createNote,editNote,deleteNote,getNote};