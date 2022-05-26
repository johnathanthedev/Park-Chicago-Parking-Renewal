import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../config/routes';
import Navbar from './shared/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((publicRoute, index) => (
            <Route
              key={index + 1}
              path={publicRoute.path}
              element={publicRoute.component}
            />
          ))}

          {privateRoutes.map((privateRoute, index) => (
            <Route
              key={index + 1}
              path={privateRoute.path}
              element={privateRoute.component}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
