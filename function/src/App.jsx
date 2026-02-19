const App = () => {
  function handleClick(data){
   alert(`Hello ${data}`)
  }
  return (
    <div className='container'>
      <input className='input' type="text" name="message" id="messageInput" />
    <button className='button' onClick={() => handleClick(document.getElementById("messageInput").value)}>Send</button>
    </div>
  )
}

export default App