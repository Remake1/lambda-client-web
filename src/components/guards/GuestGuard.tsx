import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '@/store/store';

interface GuestGuardProps {
    children: ReactNode;
}

const GuestGuard = ({ children }: GuestGuardProps) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default GuestGuard;
