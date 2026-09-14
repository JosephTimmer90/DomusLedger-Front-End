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
import PropertiesPage from './pages/PropertiesPage';
import Layout from './App Components/Layout';
import TenantsPage from './pages/TenantsPage';
import LeasesPage from './pages/LeasesPage';
import UnitsPage from './pages/UnitsPage';

function router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ViteHomePage />} />
          <Route path="login" element={<LogInScreen />} />
          <Route path="logout-success" element={<LogOutSuccess />} />
          <Route element={<ProtectedRoute />}>
            <Route path='layout' element={<Layout />}>
              <Route path="generic-component" element={<GenericComponent />} />
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="access-token" element={<AccessToken />} />
              <Route path="properties-page" element={<PropertiesPage />} />
              <Route path="tenants-page" element={<TenantsPage />} />
              <Route path="leases-page" element={<LeasesPage />} />
              <Route path="units-page" element={<UnitsPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default router
