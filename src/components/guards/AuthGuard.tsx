import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default AuthGuard;
