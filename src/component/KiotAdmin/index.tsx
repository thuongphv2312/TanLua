import React, { useState, useEffect } from 'react';
import KiotLogin from './KiotLogin';
import KiotDashboard from './KiotDashboard';
import { isSessionActive, checkSetup, getAppsScriptUrl, setSessionActive } from './kiotService';
import './styles.css';

const KiotAdmin: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isConfigured, setIsConfigured] = useState(false);
    const [retailerName, setRetailerName] = useState('');
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        // Kiểm tra session hiện tại
        const checkSession = async () => {
            if (isSessionActive() && getAppsScriptUrl()) {
                try {
                    const result = await checkSetup();
                    if (result.success && result.isConfigured) {
                        setIsLoggedIn(true);
                        setIsConfigured(true);
                        setRetailerName(result.retailerName);
                        // Update session storage format
                        setSessionActive(result.retailerName);
                    }
                } catch {
                    // Session expired or invalid
                }
            }
            setChecking(false);
        };
        checkSession();
    }, []);

    const handleLoginSuccess = (configured: boolean, retailer: string) => {
        setIsLoggedIn(true);
        setIsConfigured(configured);
        setRetailerName(retailer);
    };

    if (checking) {
        return (
            <div className="kiot-login-wrapper">
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
                    Đang kiểm tra phiên đăng nhập...
                </div>
            </div>
        );
    }

    if (!isLoggedIn || !isConfigured) {
        return <KiotLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return <KiotDashboard retailerName={retailerName} autoSync={true} />;
};

export default KiotAdmin;
