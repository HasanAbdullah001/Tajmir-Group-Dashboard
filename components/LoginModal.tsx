import React, { useState } from 'react';

interface LoginModalProps {
    onClose: () => void;
    onLogin: (password: string, remember: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(password, remember);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-dark-card w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-border flex justify-between items-center">
                    <h3 className="font-semibold text-lg dark:text-gray-100"><i className="fa-solid fa-lock mr-2 text-primary"></i> Admin Access</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><i className="fa-solid fa-times"></i></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPass ? "text" : "password"} 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a1d29] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-gray-400"
                                placeholder="Enter admin password"
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                            >
                                <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <input 
                            id="remember-me" 
                            type="checkbox" 
                            checked={remember}
                            onChange={e => setRemember(e.target.checked)}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">Remember me</label>
                    </div>

                    <button type="submit" className="w-full py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;