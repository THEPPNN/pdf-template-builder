import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/Login';
import { BuilderPage } from './pages/Builder';
import { ProtectedRoute } from './components/ProtectedRoute';
import { TemplateViewer } from './pages/TemplateViewer';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/builder"
        element={
          <ProtectedRoute>
            <BuilderPage />
          </ProtectedRoute>
        }
      />

      <Route path="/viewer/:id" element={<TemplateViewer />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}