import axios from 'axios'
import { useState } from 'react'
import Register from './components/Register'

function App() {

  axios.defaults.baseURL = 'http://localhost:9000';
  // bottom allows cookies to be sent through
  axios.defaults.withCredentials = true;

  return (
    <>
      <Register/>
    </>
  )
}

export default App
