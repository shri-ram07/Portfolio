import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Experience from './components/Experience';

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-black"> {/* Added wrapper with background */}
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/experience" element={<Experience/>}/>
        </Routes>
        <Footer/>
      </div>
    </HashRouter>
  );
}

export default App;