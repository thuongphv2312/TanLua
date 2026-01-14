import React, { useState } from 'react';
import { GlobalOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

const languages = [
    { key: 'vi', label: '🇻🇳 Tiếng Việt', name: 'Vietnamese' },
    { key: 'en', label: '🇺🇸 English', name: 'English' },
    { key: 'zh-CN', label: '🇨🇳 简体中文', name: 'Chinese Simplified' },
    { key: 'zh-TW', label: '🇹🇼 繁體中文', name: 'Chinese Traditional' },
    { key: 'ja', label: '🇯🇵 日本語', name: 'Japanese' },
    { key: 'ko', label: '🇰🇷 한국어', name: 'Korean' },
    { key: 'th', label: '🇹🇭 ไทย', name: 'Thai' },
    { key: 'lo', label: '🇱🇦 ລາວ', name: 'Lao' },
    { key: 'km', label: '🇰🇭 ខ្មែរ', name: 'Khmer' },
];

interface LanguageSwitcherProps {
    isMobile?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isMobile = false }) => {
    const [currentLang, setCurrentLang] = useState(() => {
        // Get current language from cookie
        const match = document.cookie.match(/googtrans=\/(?:vi|auto)\/([^;]+)/);
        return match ? match[1] : 'vi';
    });

    const changeLanguage = (langCode: string) => {
        setCurrentLang(langCode);

        if (langCode === 'vi') {
            // Reset to Vietnamese (original)
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
        } else {
            // Set new language using /auto/langCode for better detection
            const cookieValue = `/auto/${langCode}`;
            document.cookie = `googtrans=${cookieValue}; path=/`;
            document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
        }

        // Reload to apply translation
        window.location.reload();
    };

    const currentLanguage = languages.find(l => l.key === currentLang) || languages[0];

    const items: MenuProps['items'] = languages.map(lang => ({
        key: lang.key,
        label: (
            <div
                style={{
                    padding: '4px 0',
                    fontWeight: lang.key === currentLang ? 600 : 400,
                    color: lang.key === currentLang ? '#cb2b2b' : 'inherit'
                }}
            >
                {lang.label}
            </div>
        ),
        onClick: () => changeLanguage(lang.key),
    }));

    if (isMobile) {
        return (
            <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement="bottomLeft"
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 0',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    <GlobalOutlined style={{ fontSize: '18px', color: '#cb2b2b' }} />
                    <span style={{ flex: 1 }}>{currentLanguage.label}</span>
                    <DownOutlined style={{ fontSize: '12px', color: '#999' }} />
                </div>
            </Dropdown>
        );
    }

    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
        >
            <Space
                style={{
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    transition: 'background 0.2s'
                }}
                className="hover:bg-white/10"
            >
                <GlobalOutlined style={{ fontSize: '20px', color: '#f08a8a' }} />
                <span style={{ color: 'white', fontSize: '14px' }}>
                    {currentLanguage.label.split(' ')[0]}
                </span>
                <DownOutlined style={{ fontSize: '10px', color: '#f08a8a' }} />
            </Space>
        </Dropdown>
    );
};

export default LanguageSwitcher;
