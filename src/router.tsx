import './App.css'
import { HashRouter, Routes, Route} from 'react-router-dom';
import ViteHomePage from './App Components/ViteHomePage';
import GenericComponent from './App Components/GenericComponent';
import DashBoard from './App Components/DashBoard'
import AccessToken from './App Components/AccessToken'
import LogInScreen from './App Components/Login Screen';
import Header from './App Components/Header';
import LogOutSuccess from './App Components/LogOutSuccess';
import ProtectedRoute from './App Components/ProtectedRoute';

function router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ViteHomePage />} />
          <Route path="login" element={<LogInScreen />} />
          <Route path="logout-success" element={<LogOutSuccess />} />
          <Route element={<ProtectedRoute />}>
            <Route path="generic-component" element={<GenericComponent />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="access-token" element={<AccessToken />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default router
