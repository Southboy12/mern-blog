import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [username, setUsername] = useState('')
  const [commentText, setCommentText] = useState('')
  const addComments = async () => {
    const result = await fetch(`http://localhost:3000/api/articles/${articleName}/add-comments`,{
      method: 'post',
      body: JSON.stringify({username, text: commentText}),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await result.json()
    setArticleInfo(body)
    setUsername("")
    setCommentText("")
  }
  return (
    <form className='shadow rounded px-8 pt-6 pb-8 mb-8'>
      <h3 className='text-xl font-bold mb-4 text-gray-900'>Add a comment</h3>
      <label className='block text-gray-700 text-sm font-bold mb-2'>Name:</label>
      <input 
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
      <label className='block text-gray-700 text-sm font-bold mb-2'>Comment:</label>
      <textarea
        rows='5'
        cols='50'
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
      <button onClick={() => addComments()} className='bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus: shadow-outline'>
        Add comment
      </button>
    </form>
  )
}

export default AddCommentForm