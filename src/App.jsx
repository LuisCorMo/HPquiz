import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Quiz from './pages/Quiz';
import Score from './pages/Score';
import wallpaper from './assets/images/fondo.jpg'; // Asegúrate de tener la ruta correcta

function App() {
  return (
    <div className="relative h-full">
      <div
        className="absolute inset-0 bg-cover lg:bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper})` }}
      ></div>
      <div className="absolute inset-0 bg-slate-900/60"></div>
      <div className='relative z-10'>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/score" element={<Score />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
