import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from "./pages/Dashboard.jsx"; // Added .jsx extension
import Signin from "./pages/Signin.jsx"; // Added .jsx extension

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* New route for Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
