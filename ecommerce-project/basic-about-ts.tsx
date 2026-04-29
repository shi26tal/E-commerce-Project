import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//typescript = is just js with extra features. We can add types to our variables.
//types = js has diff types of values like 99 'hello' {key:1}
// we can set what types of value is inside a variable

function App() {
  const [count, setCount] = useState(0)

  //count.toLowerCase(); // count is number , ts figure it out itself

  //const message: string = 'hello'; // done manually but ts know its string so we done need to specify
  const message = 'hello';
  console.log(message);

  message.toLocaleLowerCase();
  //message.toFixed(); // toFixed doesnot work with string and ts knows that message is a string so it gives error
  //this feature is type checking

  //Type inference = ts can figure out the type
  
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
