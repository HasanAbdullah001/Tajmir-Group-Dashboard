import React, { useState } from 'react';
import { DropdownItem, EditIndices, EditType } from '../types';

interface HeaderProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    dropdownData: DropdownItem[];
    isEditMode: boolean;
    onOpenEditModal: (type: EditType, indices?: EditIndices) => void;
    onOpenLogin: () => void;
    onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({
    toggleSidebar,
    isDarkMode,
    toggleTheme,
    dropdownData,
    isEditMode,
    onOpenEditModal,
    onOpenLogin,
    onRefresh
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full h-[70px] bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-dark-border/50 z-50 flex items-center justify-between px-2 sm:px-8 shadow-sm transition-all duration-300">
            {/* Animated Blue Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-transparent overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer opacity-80"></div>
            </div>

            {/* Left: Logo & Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
                <button 
                    onClick={toggleSidebar}
                    className="md:hidden text-gray-500 dark:text-gray-300 hover:text-primary transition-colors text-lg p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card"
                >
                    <i className="fa-solid fa-bars-staggered"></i>
                </button>
                <img 
                    src="https://2ef74abf.tunnel-tunnel.pages.dev/Tajmir%20logo.png" 
                    alt="Logo" 
                    className="h-7 sm:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
                    onError={(e) => (e.currentTarget.style.display = 'none')} 
                />
            </div>

            {/* Center: Search */}
            <div className={`absolute top-full left-0 w-full bg-white/95 dark:bg-dark-card/95 backdrop-blur-lg p-4 shadow-lg lg:shadow-none lg:static lg:bg-transparent lg:p-0 lg:flex lg:justify-center transition-all duration-300 ${isSearchActive ? 'block border-b border-gray-100 dark:border-dark-border' : 'hidden lg:block'}`}>
                <div className="relative w-full max-w-xl group">
                    <i className="fa-solid fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400 group-focus-within:text-primary transition-colors duration-300"></i>
                    <input 
                        type="text" 
                        placeholder="Search Google..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-full bg-gray-100 dark:bg-[#1a1d29] border border-transparent dark:border-gray-700/50 focus:border-primary/20 hover:bg-gray-100 dark:hover:bg-[#1f2231] rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 shadow-inner"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none opacity-50">
                        <span className="text-xs bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded px-1.5 py-0.5 text-gray-400 font-mono">/</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-3 ml-auto md:ml-0 flex-shrink flex-nowrap">
                <button onClick={onRefresh} className="hidden sm:flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card text-gray-500 dark:text-gray-400 transition-all hover:text-primary">
                    <i className="fa-solid fa-arrow-rotate-right text-xs sm:text-sm"></i>
                </button>

                <button 
                    onClick={() => setIsSearchActive(!isSearchActive)}
                    className="lg:hidden flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card text-gray-500 dark:text-gray-400 transition-all"
                >
                    <i className="fa-solid fa-search text-xs sm:text-sm"></i>
                </button>

                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme} 
                    className="relative w-9 h-5 sm:w-12 sm:h-7 rounded-full bg-gray-200 dark:bg-dark-card border border-gray-300 dark:border-dark-border transition-colors duration-300 focus:outline-none overflow-hidden shrink-0"
                >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white dark:bg-primary shadow-md transform transition-transform duration-300 flex items-center justify-center z-10 ${isDarkMode ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0'}`}>
                        {isDarkMode ? <i className="fa-solid fa-moon text-[8px] sm:text-[10px] text-white"></i> : <i className="fa-solid fa-sun text-[8px] sm:text-[10px] text-yellow-500"></i>}
                    </div>
                </button>
                
                {/* Admin/Settings */}
                <button 
                    onClick={onOpenLogin}
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${isEditMode ? 'bg-red-50 text-red-500 border border-red-200' : 'hover:bg-gray-100 dark:hover:bg-dark-card text-gray-500 dark:text-gray-400 hover:text-primary'}`}
                    title="Admin Settings"
                >
                    <i className={`fa-solid ${isEditMode ? 'fa-lock-open' : 'fa-gear'} text-xs sm:text-sm`}></i>
                </button>

                {/* Dropdown / Menu Button */}
                <div className="relative ml-0.5 sm:ml-1">
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                        className="flex items-center justify-center h-7 sm:h-11 w-auto aspect-[469/179] rounded-md overflow-hidden hover:ring-2 sm:hover:ring-4 hover:ring-gray-100 dark:hover:ring-dark-card transition-all"
                    >
                        <img 
                            src="https://2ef74abf.tunnel-tunnel.pages.dev/Tajmir%20land%20Button.png" 
                            alt="Menu" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = '<i class="fa-solid fa-grid-2 text-xl text-gray-600 dark:text-gray-300"></i>';
                            }}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-3 w-64 bg-white/90 dark:bg-dark-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-dark-border overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 origin-top-right">
                            <div className="p-2">
                                {dropdownData.map((item, idx) => (
                                    <a 
                                        key={idx} 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        onClick={(e) => {
                                            if (isEditMode) {
                                                e.preventDefault();
                                                onOpenEditModal('dropdown-edit', { index: idx });
                                            }
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                                        {item.title}
                                        {isEditMode && <i className="fa-solid fa-pencil ml-auto text-xs text-blue-400"></i>}
                                    </a>
                                ))}
                                {isEditMode && (
                                    <button 
                                        onClick={() => onOpenEditModal('dropdown-add')}
                                        className="w-full text-left px-4 py-3 text-sm text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium rounded-xl mt-1"
                                    >
                                        <i className="fa-solid fa-plus mr-2"></i> Add Link
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;