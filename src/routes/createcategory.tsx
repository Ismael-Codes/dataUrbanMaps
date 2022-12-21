import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LatLngExpression } from 'leaflet';

function CreateCategory() {
  const navigate = useNavigate()
  const [name, setName] = useState('')

  return <>
    <div className='w-screen h-screen flex justify-center items-center'>
      <form action="" style={
        {
          boxShadow: '10px 10px black',
          border: '3px solid black',
          fontFamily: 'tahoma'
        }
      } className='bg-white flex justify-center items-center flex-col w-80'>
        <div className='flex w-full pl-6 pt-2'>

          <h1 className='text-black'>Name:</h1>
        </div>
        <input className='border-b-2 border-black outline-none placeholder-[#6c6c60] pb-2 mt-1' placeholder='category' type="text" name="name" id="name" onChange={() => {
          const inputValue = (document.getElementById("name") as HTMLInputElement).value;
          setName(inputValue);
        }} />
        <div className='flex'>
          <button
            className='bg-white border-2 border-black text-black m-4 p-2'
            onClick={() => {
              fetch(`${import.meta.env.VITE_API_URL}/createcategory/name/${name}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            }}
          >Create Category</button>
          <button
            className='bg-white border-2 border-black text-black m-4 p-2'
            onClick={() => {
              navigate('/dashboard')
            }}
          >Return</button>

        </div>
      </form>

    </div>
  </>
}

export default CreateCategory
