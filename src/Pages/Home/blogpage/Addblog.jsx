import React from 'react'
import { useState } from 'react'

const Addblog = () => {
    const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState(null); // Store the selected file
  const [description, setDescription] = useState('');
  return (
    <>
       <form>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

    
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit">Add Post</button>
    </form>
    </>
  )
}

export default Addblog
