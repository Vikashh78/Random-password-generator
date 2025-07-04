import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  //step-1. (Hooks)
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //step-6
  const passwordRef = useRef(null)

  //step-2
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //initially in string having

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*~-+=[]{}`";  //till here str consist num as well as chars

    for (let i = 1; i <= length ; i++) {
      let char = Math.floor(Math.random() * str.length +1); //this will give index of string array
      pass += str.charAt(char)
      
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]) // these are dependencies


  //step-5
  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select(); //?- to avoid zero
    window.navigator.clipboard.writeText(password);
  }, [password])


  //step-3
  useEffect(() => { //it will be called on first time page load, and also when dependecy array is changed
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]);


  return ( //step.4-

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-white">
      <h1 className='text-white text-center my-3 text-3xl font-bold pb-6'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
        onClick={copyToClipBoard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-200 hover:text-black hover:shadow-xl transition-shadow duration-100'
        >copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}} 
          />
          <label>Lenght:{length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed} //initally false
            id='numInput'
            onChange={() => {setNumberAllowed((prev) => !prev);

            }}
          />
          <label>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            defaultChecked={charAllowed} 
            id='characterInput'
            onChange={() => {setCharAllowed((prev) => !prev)}}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App;
