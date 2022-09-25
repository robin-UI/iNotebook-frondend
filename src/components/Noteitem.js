import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context
  const { note, updateNote  } = props
  return (
    <>
      <div className="col-md-3">
        <div className="card text-bg-light mb-3" style={{ maxWidth: "18rem" }}>
          <div className="card-header">{note.tag}</div>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <button className='btn btn-primary me-3' onClick={()=>{
              deleteNote(note._id) 
              props.showAlert("Delete note successfuly", "success")}} >Delete</button>
            <button className='btn btn-primary'onClick={()=>{updateNote(note)}} >Edit</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Noteitem