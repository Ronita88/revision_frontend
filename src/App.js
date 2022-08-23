import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import de ma page Products
import Products from "./pages/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/productslist" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
