import Navbar from "./components/core/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import Hero from "./components/pages/Hero";
import Sign from "./components/pages/Sign";
import DashboardBody from "./components/pages/DashboardBody";
import Error from "./components/pages/Error";
import SharedBrain from "./components/pages/SharedBrain";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Hero />} />
        <Route path="/signin" element={<Sign />} />
        <Route path="/dashboard" element={<DashboardBody />} />
        <Route path="/shared/:id" element={<SharedBrain />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
