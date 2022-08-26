import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// import de mes pages

import Products from "./pages/Products";
import Signup from "./pages/Signup";
// import Login from "./pages/Login";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 3 });
      setUserToken(token);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/productslist" element={<Products />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        {/* <Route path="/login" element={<Login handleToken={handleToken} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
