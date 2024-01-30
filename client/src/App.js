import { Route, Routes } from "react-router-dom";
import './App.css';
import CreateTransaction from './components/CreateTransaction';
import Transactions from './pages/Transactions';
function App() {
  return (
    <div className="App">
 
     <Routes>
<Route path='/' element={<Transactions/>} />
<Route path='/add-transaction' element={<CreateTransaction/>} />
     </Routes>
    </div>
  );
}

export default App;
