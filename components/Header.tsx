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
    onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({
    toggleSidebar,
    isDarkMode,
    toggleTheme,
    dropdownData,
    isEditMode,
    onOpenEditModal,
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
        <header className="fixed top-0 left-0 w-full h-[70px] bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border z-50 flex items-center justify-between px-3 sm:px-6 shadow-sm transition-colors duration-300">
            {/* Animated Gradient Line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent pointer-events-none overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer opacity-75"></div>
            </div>

            {/* Left: Logo & Toggle */}
            <div className="flex items-center gap-3 pl-2 sm:pl-4">
                <button 
                    onClick={toggleSidebar}
                    className="md:hidden text-gray-500 dark:text-gray-400 hover:text-primary transition-colors text-xl p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card"
                >
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="h-10 sm:h-12 flex items-center">
                    <img 
                        src="https://2ef74abf.tunnel-tunnel.pages.dev/Tajmir%20logo.png" 
                        alt="Logo" 
                        className="h-10 sm:h-10 w-auto object-contain hover:opacity-90 transition-opacity"
                        onError={(e) => (e.currentTarget.style.display = 'none')} 
                    />
                </div>
            </div>

            {/* Center: Search Bar */}
            <div className={`absolute top-[70px] left-0 w-full bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border p-4 shadow-lg lg:shadow-none lg:static lg:top-auto lg:left-auto lg:w-auto lg:bg-transparent lg:dark:bg-transparent lg:p-0 lg:border-none lg:flex lg:justify-center lg:flex-1 transition-all duration-300 ${isSearchActive ? 'block' : 'hidden lg:flex'}`}>
                <div className="relative w-full max-w-2xl group">
                    <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-primary transition-colors"></i>
                    <input 
                        type="text" 
                        placeholder="Search Google..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-full h-11 bg-gray-100 dark:bg-dark-card border border-transparent dark:border-dark-border/50 focus:border-primary/30 hover:bg-gray-50 dark:hover:bg-[#252836] rounded-xl py-2 pl-11 pr-4 text-sm sm:text-base focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
                <button onClick={onRefresh} className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card text-gray-500 dark:text-gray-400 transition-all hover:text-primary" title="Refresh">
                    <i className="fa-solid fa-rotate-right"></i>
                </button>

                <button 
                    onClick={() => setIsSearchActive(!isSearchActive)}
                    className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card text-gray-500 dark:text-gray-400 transition-all"
                >
                    <i className="fa-solid fa-search"></i>
                </button>

                <button 
                    onClick={toggleTheme} 
                    className="relative w-11 h-6 sm:w-12 sm:h-7 rounded-full bg-gray-200 dark:bg-dark-card border border-gray-300 dark:border-dark-border transition-colors duration-300 focus:outline-none overflow-hidden shrink-0"
                >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white dark:bg-primary shadow-sm transform transition-transform duration-300 flex items-center justify-center ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}>
                        {isDarkMode ? <i className="fa-solid fa-moon text-[10px] text-white"></i> : <i className="fa-solid fa-sun text-[10px] text-yellow-500"></i>}
                    </div>
                </button>
                
                <div className="relative ml-1">
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                        className="flex items-center justify-center h-8 sm:h-10 w-auto aspect-[469/179] rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                    >
                        <img 
                            src="https://2ef74abf.tunnel-tunnel.pages.dev/Tajmir%20land%20Button.png" 
                            alt="Apps" 
                            className="h-full w-full object-contain"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                    parent.innerHTML = '<div class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card text-gray-600 dark:text-gray-300"><i class="fa-solid fa-grid"></i></div>';
                                }
                            }}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                            <div className="p-2 space-y-1">
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
                                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors group"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary/80 shrink-0"></div>
                                        <span>{item.title}</span>
                                        {isEditMode && <i className="fa-solid fa-pencil ml-auto text-xs text-blue-400"></i>}
                                    </a>
                                ))}
                                {isEditMode && (
                                    <button 
                                        onClick={() => onOpenEditModal('dropdown-add')}
                                        className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium rounded-lg"
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