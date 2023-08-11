import { BrowserRouter, Route, Routes } from "react-router-dom"
import Todolist from "./pages/todolist"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/login";
import Authmiddleware from "./middleware/Authmiddleware";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<Authmiddleware><Todolist /></Authmiddleware>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
