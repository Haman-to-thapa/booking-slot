
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Home } from './pages/Home';
import { ExperienceDetails } from './pages/ExperienceDetails';
import { Checkout } from './pages/Checkout';
import { BookingResult } from './pages/BookingResult';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience/:id" element={<ExperienceDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/result" element={<BookingResult />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;