import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.jsx"; // Added .jsx extension
import Signin from "./pages/Signin.jsx"; // Added .jsx extension
import Business from "./pages/business.jsx"; // Added .jsx extension
import Ambassador from "./pages/Ambassador.jsx"; // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* New route for Dashboard */}
        <Route path="/business" element={<Business />} />
        <Route path="/ambassadors" element={<Ambassador />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
