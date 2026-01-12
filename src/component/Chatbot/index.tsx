import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, User, Loader2 } from 'lucide-react';
import { Button, Input, Avatar } from 'antd';
import { HOST, newsList } from '../NewsPage/constants';
import ReactMarkdown from 'react-markdown';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = sessionStorage.getItem('tanlua_chat_history');
        if (savedMessages) {
            try {
                const parsed = JSON.parse(savedMessages);
                // Chuyển chuỗi timestamp thành đối tượng Date
                return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
            } catch (e) {
                console.error("Lỗi đọc lịch sử chat:", e);
            }
        }
        return [
            {
                id: '1',
                text: 'Xin chào! Tôi là trợ lý ảo của Tấn Lụa. Tôi có thể giúp gì cho bạn về các dòng máy nông nghiệp và máy công nghiệp không?',
                sender: 'bot',
                timestamp: new Date(),
            },
        ];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Tự động cuộn xuống tin nhắn mới nhất
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Lưu lịch sử chat vào sessionStorage
    useEffect(() => {
        sessionStorage.setItem('tanlua_chat_history', JSON.stringify(messages));
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const API_KEY = "AIzaSyCInAVXRQIPBkpjLrhZo1InbuZMuPkQFq4";

            // Lấy 4 tin nhắn gần nhất để làm ngữ cảnh (tránh quá dài tốn token)
            const chatHistory = messages.slice(-4).map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));

            // Tạo danh sách sản phẩm từ newsList
            const productInventory = newsList.map(p => `- ${p.title}: ${p.price}`).join('\n');

            // Tạo danh sách hàng thanh lý (giảm giá >= 40% - category ID 99)
            const liquidatedItems = newsList
                .filter(p => p.categories.includes(99))
                .map(p => `- ${p.title}: ${p.price} (GIÁ THANH LÝ)`)
                .join('\n');

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts: [{
                                text: `HỆ THỐNG: Bạn là trợ lý ảo của Tấn Lụa (${HOST}). 
                                
                                DANH SÁCH SẢN PHẨM HIỆN CÓ:
                                ${productInventory}
                                
                                DANH SÁCH HÀNG THANH LÝ (GIẢM GIÁ TRÊN 40%):
                                ${liquidatedItems || 'Hiện chưa có sản phẩm thanh lý đặc biệt.'}
                                
                                QUY TẮC PHẢN HỒI: 
                                1. Nếu khách hỏi về "hàng thanh lý", "giảm giá sâu", hãy ưu tiên giới thiệu danh sách HÀNG THANH LÝ ở trên.
                                2. Sử dụng Markdown: **In đậm** tên sản phẩm, dùng gạch đầu dòng (-) để liệt kê.
                                3. Trả lời chuyên nghiệp, lịch sự, tiếng Việt.
                                4. Hotline/Zalo hỗ trợ: 0833.090.186.`
                            }]
                        },
                        {
                            role: 'model',
                            parts: [{ text: 'Đã rõ. Tôi sẽ ưu tiên tư vấn hàng thanh lý (giảm trên 40%) khi khách hàng yêu cầu.' }]
                        },
                        ...chatHistory,
                        {
                            role: 'user',
                            parts: [{ text: inputValue }]
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();
            const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Tôi đang bận một chút, bạn thử lại nhé!";

            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot',
                timestamp: new Date(),
            }]);
        } catch (error: any) {
            console.error("Gemini Error:", error);
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                text: "Xin lỗi, tôi gặp chút trục trặc. Bạn nhắn Zalo hoặc gọi Hotline giúp tôi nhé!",
                sender: 'bot',
                timestamp: new Date(),
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[1000] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-[350px] h-[500px] bg-white rounded-[28px] shadow-2xl flex flex-col overflow-hidden border border-gray-100"
                    >
                        {/* Header */}
                        <div className="bg-[#cb2b2b] p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    <img src="https://i.ibb.co/F4f2mzq4/11184177.gif" alt="AI Bot" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-none">Tấn Lụa AI Chat</h3>
                                    <span className="text-[10px] opacity-80 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        Sẵn sàng hỗ trợ
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="transition-all hover:scale-110"
                                style={{ background: 'none', border: 'none', padding: 0 }}
                            >
                                <X size={22} color="#daca72" />
                            </button>
                        </div>

                        {/* Messages Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <Avatar
                                            size="small"
                                            src={msg.sender === 'bot' ? "https://i.ibb.co/F4f2mzq4/11184177.gif" : undefined}
                                            icon={msg.sender === 'user' ? <User size={14} /> : undefined}
                                            className={`${msg.sender === 'user' ? 'bg-[#daca72]' : 'bg-white'} flex-shrink-0 border-none rounded-full overflow-hidden`}
                                        />
                                        <div className={`p-3 rounded-2xl text-sm chatbot-message-content ${msg.sender === 'user'
                                            ? 'bg-[#cb2b2b] text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                            }`}>
                                            {msg.sender === 'bot' ? (
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                            ) : (
                                                msg.text
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none">
                                        <Loader2 size={16} className="animate-spin text-gray-400" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Footer */}
                        <div className="p-3 bg-white border-t border-gray-100">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Nhập câu hỏi của bạn..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onPressEnter={handleSend}
                                    variant="filled"
                                    className="rounded-full"
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<Send size={16} />}
                                    onClick={handleSend}
                                    className="bg-[#cb2b2b] border-none flex items-center justify-center"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-[#cb2b2b] rounded-full shadow-lg flex items-center justify-center relative overflow-hidden group border-2 border-white"
                style={{ borderRadius: '50%' }}
            >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {isOpen ? (
                    <X size={32} color="#daca72" strokeWidth={2.5} />
                ) : (
                    <img
                        src="https://i.ibb.co/F4f2mzq4/11184177.gif"
                        alt="Chatbot Icon"
                        className="w-full h-full object-cover rounded-full p-0"
                        style={{ borderRadius: '50%' }}
                    />
                )}

                {/* Badge thông báo */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#daca72] border-2 border-white rounded-full animate-bounce" style={{ borderRadius: '50%' }}></span>
                )}
            </motion.button>

            {/* Markdown Styles */}
            <style>{`
                .chatbot-message-content p {
                    margin-bottom: 8px;
                }
                .chatbot-message-content p:last-child {
                    margin-bottom: 0;
                }
                .chatbot-message-content ul, .chatbot-message-content ol {
                    margin-left: 20px;
                    margin-bottom: 8px;
                    list-style-type: disc;
                }
                .chatbot-message-content li {
                    margin-bottom: 4px;
                }
                .chatbot-message-content strong {
                    font-weight: 700;
                    color: #cb2b2b;
                }
            `}</style>
        </div>
    );
};

export default AIChatbot;
