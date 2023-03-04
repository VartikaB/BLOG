import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';

export default function CreatePost() {
    const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent]=useState('');
  const [file,setFiles]=useState('');
  const[redirect,setRedirect]=useState(false);
  async function createNewPost(ev){
    //We want to grab all information and send it to api
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file',file[0])
    const response =await fetch('http://localhost:8000/post',{
        method:'POST',
        body:data,
        credentials:'include'
    })
    if(response.ok){
      setRedirect(true);
    }

  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <form onSubmit={createNewPost}>
        <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
         <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
        <ReactQuill value={content}/>
        <button style={{marginTop:'5px'}}>Create Post</button>

    </form>
  )
}
