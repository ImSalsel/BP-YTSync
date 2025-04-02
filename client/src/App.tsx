import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Room from './pages/room/Room';
import GlobalStyles from './App';
import NoPage from './pages/noPage/NoPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { WebSocketProvider } from './context/WebSocketContext';

function App() {
  return (
    <>
      <GlobalStyles />
      <WebSocketProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<PrivateRoute />}>
              <Route path="" element={<Room />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </AuthProvider>
      </WebSocketProvider>
    </>
  );
}

export default App;