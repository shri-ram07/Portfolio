import { HashRouter, Routes, Route } from 'react-router-dom';  // Change BrowserRouter to HashRouter
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';

const App = () => {
  return (
    <HashRouter>  {/* Changed from BrowserRouter to HashRouter */}
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>

      </Routes>
      <Footer/>
    </HashRouter>
  );
}

export default App;