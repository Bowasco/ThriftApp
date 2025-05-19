import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import Group from './Components/Group';
import Create from './Components/Create';
import JoinGroup from './Components/JoinGroup';
import FundWallet from './Components/FundWallet';
import Settings from './Components/Settings';
import GroupInfo from './Components/GroupInfo';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/group' element={<Group />} />
      <Route path='/create' element={<Create />} />
      <Route path='/join_thrift/:thrift_id' element={<JoinGroup />} />
      <Route path='/groupInfo/:thrift_id' element={<GroupInfo />} />
      <Route path='/fundwallet' element={<FundWallet />} />
      <Route path='/settings' element={<Settings />} />
    </Routes>
  );
}

export default App;
