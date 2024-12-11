import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import Hero from "./components/Hero";
import Sign from "./components/Sign";
import DashboardBody from "./components/DashboardBody";
import Error from "./components/Error";
import SharedBrain from "./components/SharedBrain";

function App() {
  return (
    <BrowserRouter>
      {/* <div className="max-w-[100vw]"> */}
      <Navbar />
      <Routes>
        <Route index element={<Hero />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/dashboard" element={<DashboardBody />} />
        <Route path="/share/:id" element={<SharedBrain />} />

        <Route path="*" element={<Error />} />
      </Routes>
      {/* </div> */}
      {/* <>
      
      <div className="flex">
        <Sidebar/>
        <NotesContainer/>
      </div>
    </> */}
    </BrowserRouter>
  );
}

export default App;
