import './App.css'
import { HashRouter, Routes, Route} from 'react-router-dom';
import ViteHomePage from './App Components/ViteHomePage';
import GenericComponent from './App Components/GenericComponent';
import DashBoard from './App Components/DashBoard'
import AccessToken from './App Components/AccessToken'
import LogInScreen from './App Components/Login Screen';

function router() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<ViteHomePage />} />
        <Route path="/GenericComponent" element={<GenericComponent />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/AccessToken" element={<AccessToken />} />
        <Route path="/Login Screen" element={<LogInScreen />} />
      </Routes>
    </HashRouter>
  )
}

export default router
