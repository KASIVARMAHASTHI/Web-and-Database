const con=require("./db_connect");                // we need this file because we need connection

async function createTable(){
    let sql=`CREATE TABLE if not exists notes(
        noteID INT NOT NULL AUTO_INCREMENT,
        note VARCHAR(100) NOT NULL UNIQUE,
        userID INT,
        CONSTRAINT notePK PRIMARY KEY(noteID),
        CONSTRAINT FOREIGN KEY (userID) REFERENCES users(userID)

    );`
    await con.query(sql);                            // we need await when used async
}

createTable();

async function getAllNotes() {
    const sql = `SELECT * FROM notes;`;
    let notes = await con.query(sql);
    console.log(notes)
  }

  async function createNote(note){

    let cNote=await getNote(note);


    const sql=`INSERT INTO notes(note,userID) VALUES ("${note.note}",${user.userID});`

    await con.query(sql);

    
}

  async function editNote(note){
    let sql=`update notes SET note="${note.note}" where noteID=${note.noteID}`;

    await con.query(sql);
    let updatedNote=await getNote(note);

    return updatedNote[0];
}

async function deleteNote(note){
    let sql=`Delete from users where noteID=${note.noteID}`;

    await con.query(sql);
}

async function getNote(note){
    let sql;

    if(note.noteID){
        sql=`select * from notes where noteID=${note.noteID}`;

    }
    else{
        sql=`select * from notes where note="${note.note}"`;
    }

    return await con.query(sql);
}

const Notes= [
    {
      Noteinputform:11111,
      
    },
    {
      Noteinputform:22222,
    },
    {
      Noteinputform:33333,
    }
  ];
  
  function getAllNotes() {
    return Notes;
  }
  module.exports={getAllNotes,editNote,deleteNote};