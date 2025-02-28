import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Room from './pages/room/Room';
import GlobalStyles from './App';
import NoPage from './pages/noPage/NoPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;