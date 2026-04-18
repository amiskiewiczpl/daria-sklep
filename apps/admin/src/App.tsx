import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './auth'
import AdminLayout from './components/AdminLayout'
import LoginPage from './components/LoginPage'
import DashboardPage from './pages/DashboardPage'
import HomepageEditorPage from './pages/HomepageEditorPage'
import MediaManagerPage from './pages/MediaManagerPage'
import ProductCreatePage from './pages/ProductCreatePage'
import ProductEditPage from './pages/ProductEditPage'
import ProductsListPage from './pages/ProductsListPage'
import SettingsPage from './pages/SettingsPage'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsListPage />} />
        <Route path="products/new" element={<ProductCreatePage />} />
        <Route path="products/:productId" element={<ProductEditPage />} />
        <Route path="homepage" element={<HomepageEditorPage />} />
        <Route path="media" element={<MediaManagerPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>
)

export default App
