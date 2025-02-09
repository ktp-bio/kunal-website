import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio'
import HealthAndHiking from './components/HealthAndHiking'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/health" element={<HealthAndHiking />} />
        <Route path="/photos" element={<div>Photos Page Coming Soon</div>} />
        <Route path="/blog" element={<div>Blog Page Coming Soon</div>} />
      </Routes>
    </Router>
  );
}


export default App
