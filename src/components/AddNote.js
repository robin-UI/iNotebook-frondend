import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})

        props.showAlert("Add note successfuly", "success")
    }

  return (
    <div>
        <div className="container my-4">
        <h1 className='text-center' >Add a note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
                Title
            </label>
            <input
              type="title"
              name="title"
              className="form-control"
              id="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength = {3}
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
              name='description'
              className="form-control"
              id="description"
              value={note.description}
              onChange={onChange}
              minLength = {3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              name='tag'
              className="form-control"
              id="tag"
              value={note.tag}
              onChange={onChange}
              minLength = {3}
              required
            />
          </div>
          <button disabled={note.title.length<3 || note.description.length<3} type="submit" onClick={handleClick} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote