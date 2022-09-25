import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000/'
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);


    //Get all note
    const getNote = async () => {
      console.log(localStorage)
      // localStorage.setItem('tocken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyOGU3ZWQ5ZGUyNjYyMWJmMGUyMTQzIn0sImlhdCI6MTY2MzYyNTE5N30.SL-2oETZMK3bt4hzby6NljgGEp7ot3mkDl3b2fWmPkM')
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-tocken': localStorage.getItem('tocken')
          },
        });
        const json = await response.json();
        setNotes(json)
    }


    //Add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}api/notes/addnotes`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-tocken': localStorage.getItem('tocken')
          },
          body: JSON.stringify({title, description, tag}) 
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }


    //Edit note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-tocken': localStorage.getItem('tocken')
          },
          body: JSON.stringify({title, description, tag}) 
        });
        // const json = response.json(); 

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break ;
            }
        }
        setNotes(newNotes);
    }
    
    //Delete note
    const deleteNote = async (id) => {
        console.log(id);
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-tocken': localStorage.getItem('tocken')
          },
          
        });
        const json = response.json(); 
        console.log(json);

        const newNote = notes.filter((note) => { return note._id !== id})
        setNotes(newNote)
    }

    return (
        <NoteContext.Provider value={{ notes, getNote, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;

