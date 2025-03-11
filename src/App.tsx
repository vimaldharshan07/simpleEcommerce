import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import './App.css'
import Sidebar from '../Components/Sidebar'
import MainContent from '../Components/MainContent'
import ProductPage from '../Components/ProductPage'
import Popular from '../Components/Popular'
import Topseller from '../Components/Topseller';

function App() {

  return <Router>
  <div className="flex h-screen">
    
      <Sidebar/>
      <div className="rounded w-full flex justify-center flex-wrap">
      <Routes>
        <Route path="/" element={<MainContent/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>
      </Routes>
      </div>
      <div>
        <Topseller/>
        <Popular/>
      </div>
  </div>
  </Router>
}

export default App
