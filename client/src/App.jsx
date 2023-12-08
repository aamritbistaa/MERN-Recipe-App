import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Favourites from "./pages/Favourites";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import { useCookies } from "react-cookie";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create" element={<Create />} />
          <Route path="/saved-recipies" element={<Favourites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
