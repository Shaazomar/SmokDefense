import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Products from './pages/Products';
import Contact from './pages/Contact';

// Placeholder Component for other routes
const Placeholder = ({ title }) => (
  <div style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center', minHeight: '60vh' }}>
    <h1 style={{ fontSize: '48px', color: 'var(--primary-orange)' }}>{title}</h1>
    <p style={{ marginTop: '20px', color: 'var(--body-grey)' }}>Page is currently under construction.</p>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Placeholder title="Privacy Policy" />} />
          <Route path="glossary" element={<Placeholder title="Technical Glossary" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
