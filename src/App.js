import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppContext } from './UseContext/context';
import Header from './components/header/header';
import Income from './components/income/income';
import Expend from './components/Expend/expend';
import DashBoard from './components/DashBoard/DashBoard';
import Transaction from './components/Transaction/transaction';

function App() {
  const hello = useAppContext()
  console.log(hello)
  return (
    <div className="App">
        <Header/>
        <div className='w-full'>
          <Routes>
            <Route path='/' element={<DashBoard/>}/>
            <Route path='/Transaction' element={<Transaction/>}/>
            <Route path='/Income' element={<Income/>}/>
            <Route path='/Expend' element={<Expend/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
