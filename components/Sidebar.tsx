import React from 'react';
import { SidebarItem, QuickAction, EditIndices, EditType } from '../types';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar: () => void;
    items: SidebarItem[];
    quickActions: QuickAction[];
    isEditMode: boolean;
    onOpenEditModal: (type: EditType, indices?: EditIndices) => void;
    onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isOpen, 
    closeSidebar, 
    items, 
    quickActions,
    isEditMode, 
    onOpenEditModal,
    onLogout
}) => {
    return (
        <>
            {/* Mobile Overlay */}
            <div 
                className={`fixed top-[70px] bottom-0 left-0 right-0 bg-gray-900/20 backdrop-blur-sm z-30 transition-all duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={closeSidebar}
            />

            {/* Sidebar Container */}
            <aside className={`fixed top-[70px] h-[calc(100vh-70px)] left-0 w-[260px] bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl border-r border-gray-200 dark:border-dark-border z-40 transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col shadow-2xl md:shadow-none`}>
                
                {/* Header (Admin Status/Dashboard) - Centered */}
                <div className="relative flex items-center justify-center px-6 py-5 border-b border-gray-100 dark:border-dark-border">
                    <h3 className={`font-bold text-lg tracking-tight ${isEditMode ? 'text-danger' : 'text-primary'}`}>
                        {isEditMode ? 'Editing Mode' : 'Dashboard'}
                    </h3>
                    {isEditMode && (
                        <button 
                            onClick={onLogout}
                            className="absolute right-4 text-xs px-3 py-1.5 rounded-full bg-red-50 text-danger hover:bg-danger hover:text-white transition-all font-medium"
                        >
                            Exit
                        </button>
                    )}
                </div>

                {/* Quick Actions (Editable) */}
                <div className="grid grid-cols-4 gap-1 p-4 border-b border-gray-100 dark:border-dark-border">
                    {quickActions && quickActions.map((action, idx) => (
                        <a 
                            key={idx}
                            href={!isEditMode ? action.url : '#'} 
                            target={!isEditMode ? "_blank" : undefined}
                            rel="noreferrer"
                            onClick={(e) => {
                                if (isEditMode) {
                                    e.preventDefault();
                                    onOpenEditModal('quick-action-edit', { index: idx });
                                }
                            }}
                            className={`relative flex items-center justify-center h-10 rounded-xl transition-all ${isEditMode ? 'text-primary bg-blue-50 hover:bg-blue-100 border border-blue-200 cursor-pointer' : 'text-gray-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-dark-card'}`}
                        >
                            <i className={action.icon}></i>
                            {isEditMode && <i className="fa-solid fa-pencil absolute -top-1 -right-1 text-[8px] bg-white rounded-full p-0.5 shadow-sm text-primary"></i>}
                        </a>
                    ))}
                </div>

                {/* Navigation List */}
                <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                    <ul className="space-y-1.5">
                        <li className="pt-2 pb-2 text-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Folder</span>
                        </li>
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
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-card transition-all text-sm group font-medium"
                                >
                                    <i className={`${item.icon} w-5 text-center text-gray-400 group-hover:text-primary transition-colors text-base`}></i>
                                    <span className="flex-1 truncate">{item.title}</span>
                                    {isEditMode && <i className="fa-solid fa-pencil text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></i>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Add Button */}
                {isEditMode && (
                    <div className="p-4 border-t border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-dark-card/30">
                        <button 
                            onClick={() => onOpenEditModal('sidebar-add')}
                            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-dark-card hover:text-primary hover:border-primary transition-all text-sm font-medium shadow-sm"
                        >
                            <i className="fa-solid fa-plus-circle"></i> Add Link
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
};

export default Sidebar;