import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Signin from '/pages/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
