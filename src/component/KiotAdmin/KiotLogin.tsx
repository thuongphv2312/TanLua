import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import {
    LockOutlined,
    ApiOutlined,
    ShopOutlined,
    KeyOutlined,
    LinkOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';
import {
    login,
    checkSetup,
    setupKiotViet,
    setAppsScriptUrl,
    getAppsScriptUrl,
    setSessionActive,
    resetConfig,
} from './kiotService';

interface KiotLoginProps {
    onLoginSuccess: (isConfigured: boolean, retailerName: string) => void;
}

const KiotLogin: React.FC<KiotLoginProps> = ({ onLoginSuccess }) => {
    const [step, setStep] = useState<'url' | 'password' | 'setup'>('url');
    const [loading, setLoading] = useState(false);
    const [scriptUrl, setScriptUrl] = useState(getAppsScriptUrl());
    const [storedRetailerName, setStoredRetailerName] = useState('');
    const [form] = Form.useForm();
    const [setupForm] = Form.useForm();

    // Step 1: Nhập Google Apps Script URL
    const handleUrlSubmit = async () => {
        if (!scriptUrl.trim()) {
            message.error('Vui lòng nhập URL Google Apps Script!');
            return;
        }
        setAppsScriptUrl(scriptUrl.trim());

        setLoading(true);
        try {
            const status = await checkSetup();
            if (status.isConfigured && status.retailerName) {
                setStoredRetailerName(status.retailerName);
            }
        } catch (e) {
            // Silent error
        } finally {
            setLoading(false);
            setStep('password');
        }
    };

    // Step 2: Đăng nhập bằng mật khẩu
    const handleLogin = async (values: { password: string }) => {
        setLoading(true);
        try {
            const result = await login(values.password);
            if (result.success) {
                message.success('Đăng nhập thành công! 🎉');
                // Kiểm tra đã cấu hình KiotViet chưa
                const setupStatus = await checkSetup();
                if (setupStatus.isConfigured) {
                    setSessionActive(setupStatus.retailerName);
                    onLoginSuccess(true, setupStatus.retailerName);
                } else {
                    setStep('setup');
                }
            } else {
                message.error(result.error || 'Mật khẩu không đúng!');
            }
        } catch (err: any) {
            message.error('Lỗi kết nối: ' + (err.message || 'Kiểm tra lại URL Apps Script'));
        } finally {
            setLoading(false);
        }
    };

    // Step 3: Cấu hình KiotViet (lần đầu)
    const handleSetup = async (values: {
        retailerName: string;
        clientId: string;
        clientSecret: string;
    }) => {
        setLoading(true);
        try {
            const result = await setupKiotViet(values);
            if (result.success) {
                message.success('Kết nối KiotViet thành công! 🚀');
                setSessionActive(values.retailerName);
                onLoginSuccess(true, values.retailerName);
            } else {
                message.error(result.error || 'Không thể kết nối KiotViet');
            }
        } catch (err: any) {
            message.error('Lỗi: ' + (err.message || 'Vui lòng thử lại'));
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            const result = await resetConfig(values.password);
            if (result.success) {
                message.success(result.message);
                setStep('setup');
            } else {
                message.error(result.error || 'Mật khẩu sai hoặc lỗi hệ thống');
            }
        } catch (e) {
            // validation failed
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="kiot-login-wrapper">
            <div className="kiot-login-card">
                {/* Logo */}
                <div className="kiot-logo">
                    <div className="kiot-logo-icon">
                        <SafetyCertificateOutlined />
                    </div>
                    <div className="kiot-title">Tấn Lụa Admin</div>
                    <div className="kiot-subtitle">Hệ thống quản lý khách hàng KiotViet</div>
                </div>

                {/* Step 1: URL Config */}
                {step === 'url' && (
                    <div>
                        <div className="kiot-url-step">
                            <div className="url-step-label">
                                <LinkOutlined /> Bước 1: Kết nối Google Apps Script
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, margin: '8px 0 0' }}>
                                Nhập URL Web App từ Google Apps Script đã deploy
                            </p>
                        </div>
                        <Input
                            size="large"
                            prefix={<ApiOutlined />}
                            placeholder="https://script.google.com/macros/s/.../exec"
                            value={scriptUrl}
                            onChange={(e) => setScriptUrl(e.target.value)}
                            onPressEnter={handleUrlSubmit}
                            style={{ marginBottom: 16 }}
                        />
                        <Button
                            type="primary"
                            block
                            size="large"
                            className="kiot-login-btn"
                            onClick={handleUrlSubmit}
                            icon={<ApiOutlined />}
                        >
                            Tiếp tục
                        </Button>

                        {getAppsScriptUrl() && (
                            <Button
                                type="link"
                                block
                                style={{ color: 'rgba(255,255,255,0.4)', marginTop: 8 }}
                                onClick={() => setStep('password')}
                            >
                                Đã có URL → Bỏ qua
                            </Button>
                        )}
                    </div>
                )}

                {/* Step 2: Password */}
                {step === 'password' && (
                    <Spin spinning={loading}>
                        <Form form={form} onFinish={handleLogin} layout="vertical">
                            <Form.Item
                                name="password"
                                label={
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <span>Mật khẩu quản trị</span>
                                        {storedRetailerName && (
                                            <span style={{ color: '#a78bfa' }}>🏪 {storedRetailerName}</span>
                                        )}
                                    </div>
                                }
                                rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Nhập mật khẩu admin..."
                                    size="large"
                                    autoFocus
                                />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                className="kiot-login-btn"
                                loading={loading}
                                icon={<LockOutlined />}
                            >
                                Đăng nhập
                            </Button>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                                <Button
                                    type="link"
                                    style={{ color: 'rgba(255,255,255,0.4)', padding: 0 }}
                                    onClick={() => setStep('url')}
                                >
                                    ← Quay lại
                                </Button>
                                <Button
                                    type="link"
                                    danger
                                    style={{ padding: 0 }}
                                    onClick={handleReset}
                                >
                                    Cấu hình lại?
                                </Button>
                            </div>
                        </Form>
                    </Spin>
                )}

                {/* Step 3: KiotViet Setup (lần đầu) */}
                {step === 'setup' && (
                    <Spin spinning={loading}>
                        <div className="kiot-setup-section" style={{ borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
                            <div className="kiot-setup-title">
                                <ShopOutlined /> Cấu hình KiotViet (lần đầu)
                            </div>
                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginBottom: 20 }}>
                                Thông tin này sẽ được lưu an toàn trong Google Apps Script.
                                Bạn chỉ cần nhập 1 lần duy nhất.
                            </p>

                            <Form form={setupForm} onFinish={handleSetup} layout="vertical">
                                <Form.Item
                                    name="retailerName"
                                    label="Tên cửa hàng (Retailer)"
                                    rules={[{ required: true, message: 'Nhập tên cửa hàng trên KiotViet!' }]}
                                >
                                    <Input
                                        prefix={<ShopOutlined />}
                                        placeholder="tanluastore"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="clientId"
                                    label="Client ID"
                                    rules={[{ required: true, message: 'Nhập Client ID!' }]}
                                >
                                    <Input
                                        prefix={<KeyOutlined />}
                                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="clientSecret"
                                    label="Client Secret"
                                    rules={[{ required: true, message: 'Nhập Client Secret!' }]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        placeholder="Mã bảo mật từ KiotViet"
                                        size="large"
                                    />
                                </Form.Item>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    size="large"
                                    className="kiot-login-btn"
                                    loading={loading}
                                    icon={<ApiOutlined />}
                                >
                                    Kết nối KiotViet
                                </Button>
                            </Form>
                        </div>
                    </Spin>
                )}
            </div>
        </div>
    );
};

export default KiotLogin;
