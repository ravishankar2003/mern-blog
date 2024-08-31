import React, {useState, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
    const [postinfo, setpostinfo] = useState(
        {
            title:'',
            image:'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
            content:'',
        }
    )
    const [msg,setmsg] = useState(null);
    const [err, seterr] = useState(null);
    const [loading, setloading] = useState(false)
    const [fileName, setFileName] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setloading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setpostinfo({ ...postinfo, image: reader.result });
                setImagePreview(reader.result)
                setFileName(file.name);
                setloading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlechange = (e) => {
        setloading(true)
        // Handling standard inputs
        if (e.target) {
            setpostinfo({ ...postinfo, [e.target.id]: e.target.value });
        } else {
        // Handling ReactQuill changes
            setpostinfo({ ...postinfo, content: e });
        }
        setloading(false)
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        seterr(null)
        setmsg(null)

        if(postinfo.title === "" &&
            postinfo.content === "") 
          {
            seterr('fill title or content');
            return 
        }
      
        try {
          const token = localStorage.getItem("access_token");
          const res = await fetch('http://localhost:3000/api/post/create', {
            method: 'POST',
            credentials: 'include',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postinfo),
          });
      
          const data = await res.json();
          if (!res.ok) {
            const errorMessage = data.message;
            seterr(errorMessage);
            setmsg(null)
          } else {
            setmsg('Post created successfully');
            seterr(null)
          }
        } catch (error) {
          seterr(error.message);
          setmsg(null)
        }
      };

  return (
    <div className='pt-14 flex flex-col gap-5'>
        <h1 className='mx-auto text-3xl font-semibold mt-7'
        >Create a Post</h1>
        <form onSubmit={handleSubmit} className='md:w-1/2  flex flex-col mx-auto w-3/4'>
            <div className="mb-4 mx-4">
              <input
                type="text"
                id="title"
                placeholder=' Title'
                value={postinfo.title}
                onChange={handlechange}
                className="w-full p-2 border shadow-md border-gray-300 bg-gray-50 rounded-md dark:bg-slate-400 dark:border-stone-300"
              />
            </div>
            <div className="flex h-10 items-center ml-4 mb-8 flex-col">
              <span className='font-extralight text-sm text-size text-gray-500'>
              upload size upto 30kb
              </span>
                <label className="mx-auto cursor-pointer bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                {loading ? "Uploading" : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleImageUpload}   className="hidden" />
                </label>
          
            </div>
            {imagePreview && (
                    <div className="mb-4 flex-col mx-auto">
                        <img src={imagePreview} alt="Image Preview" className="h-44 w-auto border-2 border-gray-300 rounded-md shadow-md mx-auto" />
                        <p className="text-sm text-gray-600 mt-2 ">{fileName}</p>
                    </div>
                )}
            <div className='mb-4 mx-4 border-2 rounded-lg shadow-lg' >
            <ReactQuill 
            id='content'
            value={postinfo.content} 
            onChange={handlechange} 
            placeholder="Enter details about the post..." 
            modules={{
              toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }],
                  [{ 'font': [] }],
                  [{ 'align': [] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote', 'code-block'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['link', 'image'],
                  [{ 'color': [] }, { 'background': [] }],
                  ['clean'],
                  [{ 'script': 'sub' }, { 'script': 'super' }],
              ]
          }}
            />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mx-auto px-10 py-2 text-lg shadow-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white  rounded-md hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-400"
              >
                Publish
            </button>
        </form>
        {msg && (
              <div className='m-4 mx-auto border-2 p-2 rounded-lg border-green-200 shadow-lg bg-green-100 text-sm'>
                {msg}
              </div>
            )}

            {err && (
              <div className='m-4 mx-auto border-2 p-2 rounded-lg border-red-200 shadow-lg bg-red-100 text-sm'>
                {err}
              </div>
            )}
    </div>
  )
}

export default CreatePost