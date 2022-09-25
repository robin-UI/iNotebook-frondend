import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';
import { useNavigate} from 'react-router-dom'

export default function Notes(props) {
  const context = useContext(noteContext);
  // console.log(context);
  const { notes, getNote, editNote } = context;
  let history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('tocken')) {
      getNote()
    }else{
      history('/login') 
    }
    // eslint-disable-next-line 
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription:currentNote.description, 
      etag: currentNote.tag
    });
  }
  
  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag )
    props.showAlert("Update successfuly", "success")
    e.preventDefault();
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }


  return (
    <>
      <>
        {/* Button trigger modal */}
        <button
          ref={ref}
          type="button"
          className="btn btn-primary d-none"
          data-mdb-toggle="modal" 
          data-mdb-target="#exampleModal"
        >
          Launch demo modal
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-mdb-dismiss="modal" 
                  aria-label="Close"
                  ref={refClose} 
                />
              </div>
              <div className="modal-body">
                <h1 className='text-center' >Add a note</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="title"
                      name="etitle"
                      className="form-control"
                      id="title"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                      value={note.etitle}
                      minLength={3}
                      required
                    />
                    <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      name='edescription'
                      className="form-control"
                      id="description"
                      onChange={onChange}
                      value={note.edescription}
                      minLength={3}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      name='etag'
                      className="form-control"
                      id="tag"
                      onChange={onChange}
                      value={note.etag}
                      minLength={3}
                      required
                      />
                      
                  </div>
                  <button disabled={note.etitle.length<3 || note.edescription.length<3} type="submit" onClick={handleClick} className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </>

      <AddNote showAlert={props.showAlert} />

      <div className='row' >
        <h4 className='my-3'>Your notes</h4>
        <div className="container mx-2"> 
          {notes.length === 0 && 'No notes to display'}
        </div>
        {/* {console.log("erro")}
        {console.log(notes)} */}
        {notes.map((note) => {
          return <Noteitem showAlert={props.showAlert} key={note._id} note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  )
}
