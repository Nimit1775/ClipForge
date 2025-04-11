import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landingv1 from './pages/Landingv1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingv1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;