import React, { useState } from 'react';
import { SidebarItem, QuickAction, EditIndices, EditType } from '../types';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
    items: SidebarItem[];
    quickActions: QuickAction[];
    isEditMode: boolean;
    onOpenEditModal: (type: EditType, indices?: EditIndices) => void;
    onLogout: () => void;
    onOpenLogin: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isOpen, 
    closeSidebar, 
    items, 
    quickActions,
    isEditMode, 
    onOpenEditModal,
    onLogout,
    onOpenLogin
}) => {
    const [isFoldersOpen, setIsFoldersOpen] = useState(true);

    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`fixed top-[70px] bottom-0 left-0 right-0 bg-gray-900/20 backdrop-blur-sm z-30 transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={closeSidebar}
            />

            {/* Sidebar Container */}
            <aside className={`fixed top-[70px] h-[calc(100vh-70px)] left-0 w-[260px] bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-r border-gray-200 dark:border-dark-border z-40 transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col shadow-2xl md:shadow-none`}>
                
                {/* Header (Admin Status/Dashboard) */}
                <div className="flex items-center justify-center px-6 py-4 border-b border-gray-100 dark:border-dark-border min-h-[60px]">
                    <h3 className={`font-bold text-lg tracking-tight ${isEditMode ? 'text-danger' : 'text-primary'}`}>
                        {isEditMode ? 'Editing Mode' : 'Dashboard'}
                    </h3>
                </div>

                {/* Quick Actions (Editable) */}
                <div className="grid grid-cols-4 gap-1 p-2 border-b border-gray-100 dark:border-dark-border">
                    {quickActions && quickActions.map((action, idx) => {
                        const isGear = action.icon.includes('fa-gear') || action.icon.includes('fa-cog');
                        return (
                            <a 
                                key={idx}
                                href={!isEditMode && !isGear ? action.url : '#'} 
                                target={!isEditMode && !isGear ? "_blank" : undefined}
                                rel="noreferrer"
                                onClick={(e) => {
                                    if (isGear) {
                                        e.preventDefault();
                                        if (isEditMode) onLogout();
                                        else onOpenLogin();
                                        return;
                                    }
                                    if (isEditMode) {
                                        e.preventDefault();
                                        onOpenEditModal('quick-action-edit', { index: idx });
                                    }
                                }}
                                className={`relative flex items-center justify-center h-10 rounded-lg transition-all ${isEditMode ? 'text-primary bg-blue-50 hover:bg-blue-100 border border-blue-200 cursor-pointer' : 'text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-dark-card'}`}
                                title={isGear ? (isEditMode ? "Exit Admin" : "Settings") : undefined}
                            >
                                <i className={`${action.icon} text-lg ${isGear && isEditMode ? 'text-danger' : ''}`}></i>
                                {isEditMode && !isGear && <i className="fa-solid fa-pencil absolute -top-1 -right-1 text-[8px] bg-white rounded-full p-0.5 shadow-sm text-primary"></i>}
                            </a>
                        );
                    })}
                </div>

                {/* Navigation List */}
                <nav className="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    {/* Collapsible Folder Header */}
                    <div 
                        onClick={() => setIsFoldersOpen(!isFoldersOpen)}
                        className="flex items-center justify-between px-3 pt-2 pb-2 cursor-pointer group select-none"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">Folder</span>
                        <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-300 ${isFoldersOpen ? 'rotate-0' : '-rotate-90'}`}></i>
                    </div>

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isFoldersOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="space-y-0.5 pb-2">
                            {items.map((item, idx) => (
                                <li key={idx}>
                                    <a 
                                        href={item.url} 
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => {
                                            if (isEditMode) {
                                                e.preventDefault();
                                                onOpenEditModal('sidebar-edit', { index: idx });
                                            }
                                        }}
                                        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card transition-all group font-medium"
                                    >
                                        <i className={`${item.icon} w-5 text-center text-gray-400 group-hover:text-primary transition-colors text-lg`}></i>
                                        <span className="flex-1 text-sm sm:text-base truncate">{item.title}</span>
                                        {isEditMode && <i className="fa-solid fa-pencil text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>}
                                    </a>
                                </li>
                            ))}
                            
                            {/* Add Link Button (Only in Edit Mode) */}
                            {isEditMode && (
                                <li className="pt-2 px-1">
                                    <button 
                                        onClick={() => onOpenEditModal('sidebar-add')}
                                        className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-dark-card hover:text-primary hover:border-primary transition-all text-sm font-medium shadow-sm"
                                    >
                                        <i className="fa-solid fa-plus-circle"></i> Add Link
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;