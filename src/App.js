import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
     <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/homes" element={<Home/>} />
     </Routes>
    </div>
  );
}

export default App;
