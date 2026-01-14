import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from 'antd';
import { motion, AnimatePresence } from 'motion/react';

interface ThemeToggleProps {
    isDarkMode: boolean;
    onToggle: () => void;
    isMobile?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle, isMobile = false }) => {
    return (
        <div className={`theme-toggle ${isMobile ? 'w-full' : ''}`}>
            <Button
                type="text"
                onClick={onToggle}
                className={`flex items-center gap-2 ${isMobile ? 'w-full justify-start p-0 h-auto' : 'text-white hover:text-[#daca72]'}`}
                style={{ background: 'none', border: 'none' }}
            >
                <div className="relative w-6 h-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isDarkMode ? (
                            <motion.div
                                key="moon"
                                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Moon size={20} className={isMobile ? 'text-gray-600' : 'text-[#daca72]'} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Sun size={20} className={isMobile ? 'text-orange-500' : 'text-yellow-400'} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {isMobile && (
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                        {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
                    </span>
                )}
            </Button>
        </div>
    );
};

export default ThemeToggle;
