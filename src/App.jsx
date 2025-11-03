// import React from 'react'

// const App = () => {

// const submitHandler =()=>{
//   e.preventDefault()
//   console.log("form submitted ")
// }


//   return (
//     <div className='h-screen bg-black text-white'>
//     <form className='flex items-start flex-col gap-4 p-10'
//     onSubmit={(e)=>{
//         submitHandler(e)
//     }}  
    
//     >

//     <input 
//     type="text"
//      placeholder='enter notes heading '
//      className='px-5 w-1/2 font-medium outline-nones py-2 border-2 rounded'
//      />
//     <textarea
//     type="text" 
//     placeholder='write details'
//     className='px-5 h-32 w-1/2 outline-none flex flex-start flex-row py-2 border-2 rounded'
//     />
//     <button className='px-5 py-2 outline-none w-1/2 border-2 rounded'>Add Note </button>

//     </form>

//     <div className='flex lg:1/2 gap-5 bg-gary--900 flex-wrap p-10'>
//     <h1 className='text-4xl font-bold'>Recent notes</h1>
//     <div className='h-52 w-40 rounded-2xl bg-white'></div>
//     <div className='h-52 w-40 rounded-2xl bg-white'></div>

//     </div>
    
    
    
//     </div>
//   )
// }

// export default App


import React,{useState, useEffect } from 'react'

const App = () => {
const [title, setTitle] = useState('')
const [details, setDetails] = useState('')
const [task, setTask] = useState([])



   // 🪄 (1) Load notes from localStorage when app starts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'))
    if (savedNotes) {
      setTask(savedNotes)
    }
  }, [])

  const submitHandler = (e) => {
    e.preventDefault()

    const copyTask =[...task]
    copyTask.push({title, details})

    setTask(copyTask)
    console.log(copyTask)


    console.log(title)
    console.log(details)

    // 🪄 (2) Save to localStorage whenever we add a new note
    localStorage.setItem('notes', JSON.stringify(copyTask))

    setTitle('')
    setDetails('')
  }



  // const deleteNote =()=>{
  //   const copyTask = [...task];

  //   copyTask.splice(idx,1)
  //   setTask(copyTask)
  // }
  const deleteNote = (idx) => {
  const copyTask = [...task];
  copyTask.splice(idx, 1);
  setTask(copyTask);

   // 🪄 (3) Update localStorage after deleting a note
    localStorage.setItem('notes', JSON.stringify(copyTask))
     };

  return (
  
    <div className="h-screen bg-black text-white flex flex-col lg:flex-row">
      
      {/* Left Side - Add Notes */}
      <div className="w-1/2 p-10 border-r border-gray-600">
        <h1 className="text-4xl font-bold mb-8">Add Notes</h1>
        
        <form
          className="flex flex-col gap-4"
          onSubmit={submitHandler}
        >
          {/* pahla input for heading  */}
          <input
            type="text"
            placeholder="Enter notes heading"
            className="px-5 py-3 w-full font-medium border-2 border-white rounded-md bg-black text-white focus:outline-none"
            value={title}
            onChange={(e)=>{
                setTitle(e.target.value)
            }}

          />
          {/* dursra input as textarea for detailing */}
          <textarea
            type="text"
            placeholder="Write details"
            className="px-5 py-3 h-32 w-full border-2 border-white rounded-md bg-black text-white focus:outline-none"
            value={details}
            onChange={(e)=>{
                setDetails(e.target.value)
            }}
          />
          {/* submit button of the form  */}
          <button
            className="px-5 py-3 w-full bg-white active:bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-200 transition"
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Right Side - Recent Notes */}
      <div className="w-1/2 p-10">
        <h1 className="items-start text-4xl font-bold mb-8">Recent Notes</h1>

        <div className="flex gap-6 flex-wrap">
          {/* <div className="h-52 w-40 bg-white rounded-2xl"></div>
          <div className="h-52 w-40 bg-white rounded-2xl"></div> */}
          {task.map(function(elem, idx){
            return <div key={idx} className="flex justify-between flex-col item-start relative h-52 w-40 bg-cover py-13 bg-white  rounded-2xl p-3">
              <div>
                <h3 className='leading-tight text-lg font-bold text-black'>{elem.title}</h3>
              <p className='mt-2 leading-tight text-xs font-semibold text-gray-600'>{elem.details}</p>
              </div>
              <button onClick={() => deleteNote(idx)} className='w-full cursor-pointer active:scale-95 bg-red-600 py-0.5 rounded text-bold text-white'>delete</button>
            </div>
             
          })}

        </div>
      </div>
    </div>
  
  )
}

export default App
