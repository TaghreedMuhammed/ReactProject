import Header from './Components/Header';
import Cart from './pages/Cart';
import ProductsList from './pages/ProductsList';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'; 
import './App.css';

import { BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
 
<BrowserRouter>
<Header />
<Routes>
<Route path='' element={<ProductsList />}  />
  <Route path='/cart' element={<Cart />}  />
  <Route path='*' element={<NotFound />}  />
</Routes>
</BrowserRouter>

  );
}

export default App;
