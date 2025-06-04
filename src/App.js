import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import NavBar if you intend to use it globally
// import NavBar from './components/NavBar'; 
import Home from './pages/Home'; // Assuming Home page component exists or will be created
import CadastroPrato from './pages/CadastroPrato'; // Assuming CadastroPrato page component exists or will be created
import Cardapio from './pages/Cardapio'; // Assuming Cardapio page component exists or will be created
import './App.css';

function App() {
  return (
    <Router>
      {/* <NavBar /> */}{/* You can uncomment NavBar if needed */}
      <div className="container"> {/* Optional: Add a container for consistent padding/margin */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<CadastroPrato />} />
          <Route path="/cardapio" element={<Cardapio />} />
          {/* Optional: Add a 404 Not Found route */}
          <Route path="*" element={<div>404 - Página não encontrada</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

