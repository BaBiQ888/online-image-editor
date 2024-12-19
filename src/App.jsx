import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preview from './pages/Preview';
import Upload from './pages/Upload';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
