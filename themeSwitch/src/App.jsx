import { useState } from 'react'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
<div className='flex flex-col gap-4 items-center'>
          <h1 className={`text-${darkMode ? 'white' : 'black'} text-4xl`}  >{darkMode?"Dark Mode 🌑":"Light Mode ☀️"} </h1>
        <button onClick={toggleDarkMode} className={`cursor-pointer px-4 py-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black '}`}>Toggle {darkMode?"Light Mode":"Dark Mode"}</button>
</div>
    </div>
  )
}

export default App