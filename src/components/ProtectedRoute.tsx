import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    // const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

    // if (!isLoggedIn) {
    //     return <Navigate to="/" replace />;
    // }

    return children;
}