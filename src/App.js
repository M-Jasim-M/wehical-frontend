import logo from './logo.svg';
import './App.css';

import Createaccount from './Components/Createacount/Createaccount';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Components/Login/Login';
import Dashboarda from './Components/Dashboard-admain/Dashboard-a';
import Dashboardc from './Components/Dashboard-client/Dashboard-c';
import ResetPasward from './Components/Resetpasward/ResetPasward';
import Newpasward from './Components/Newpasward/Newpasward';
import Assignweh from './Components/Assignwehical/Assignweh';
import Fueldetail from './Components/Fuelingdetail/Fueldetail';
function App() {
  return (
    <>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login/>}/>
  <Route path='/createaccount' element={<Createaccount/>}/>
  <Route path='/admain-dash' element={<Dashboarda/>}/>
  <Route path='/client-dash' element={<Dashboardc/>}/>
  <Route path='/resetemail' element={<ResetPasward/>}/>
  <Route path='/newpasward' element={<Newpasward/>}/>
  <Route path='/assignweh' element={<Assignweh/>}/>
  <Route path='/fulling' element={<Fueldetail/>}/>
</Routes>
</BrowserRouter>

  
    </>
  );
}

export default App;
