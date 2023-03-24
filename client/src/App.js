
import { Routes, Route } from 'react-router-dom';
import Contest from "./Pages/Contest";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserContest from "./Pages/userContest"
import CreateContest from "./Pages/CreateContest";
import ContestDetail from "./Pages/contest-details";
import { Toaster } from 'react-hot-toast'
import Admin from "./Pages/Admin";
import HomePage from "./Components/HomePage";


function App() {


  return (
    <>

      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Contest" element={<Contest />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-contest" element={<UserContest />} />


        <Route path="/create-contest" element={<CreateContest />} />

        <Route path="/contest-detail/:id" element={<ContestDetail />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App; 