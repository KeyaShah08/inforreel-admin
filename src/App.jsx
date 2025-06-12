import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Business from "./components/Business.jsx"; // Import your Business.jsx component
import Dashboard from "./pages/Dashboard.jsx"; // Added .jsx extension
import Signin from "./pages/Signin.jsx"; // Added .jsx extension

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard */}
        <Route path="/business" element={<Business />} />   {/* New route for Business */}
        {/* You can add more routes here for other components like Ambassadors.jsx if needed */}
      </Routes>
    </Router>
  );
}

export default App;