import React, { useState, useEffect } from 'react';
import { DashboardData, EditIndices, EditType, Tool } from '../types';

interface EditModalProps {
    type: EditType;
    indices: EditIndices;
    data: DashboardData;
    onClose: () => void;
    onSave: (newData: DashboardData) => void;
    onPickIcon: (cb: (icon: string) => void) => void;
}

const EditModal: React.FC<EditModalProps> = ({ type, indices, data, onClose, onSave, onPickIcon }) => {
    // Form States
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [url, setUrl] = useState('');
    const [icon, setIcon] = useState('fa-solid fa-star');
    const [iconColor, setIconColor] = useState('#1a73e8');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(16);
    
    useEffect(() => {
        if (!type) return;

        if (type === 'sidebar-edit' && indices.index !== undefined) {
            const item = data.sidebar[indices.index];
            setTitle(item.title);
            setUrl(item.url);
            setIcon(item.icon);
        } else if (type === 'dropdown-edit' && indices.index !== undefined) {
            const item = data.dropdown[indices.index];
            setTitle(item.title);
            setUrl(item.url);
        } else if (type === 'quick-action-edit' && indices.index !== undefined) {
            const item = data.quickActions[indices.index];
            setUrl(item.url);
            setIcon(item.icon);
        } else if (type === 'section-edit' && indices.sIndex !== undefined) {
            const item = data.sections[indices.sIndex];
            setTitle(item.title);
            setFontSize(item.fontSize || 16);
        } else if (type === 'tool-edit' && indices.sIndex !== undefined && indices.tIndex !== undefined) {
            const item = data.sections[indices.sIndex].tools[indices.tIndex];
            setTitle(item.title);
            setDesc(item.desc);
            setUrl(item.url);
            setIcon(item.icon);
            setIconColor(item.iconColor || '#1a73e8');
            setBgColor(item.bgColor || '#ffffff');
        } else if (type.includes('add')) {
            // Defaults
            setTitle('');
            setDesc('');
            setUrl('');
            setIcon('fa-solid fa-star');
        }
    }, [type, indices, data]);

    const handleSave = () => {
        const newData = JSON.parse(JSON.stringify(data)) as DashboardData;

        if (type === 'sidebar-add') {
            newData.sidebar.push({ title, url, icon });
        } else if (type === 'sidebar-edit' && indices.index !== undefined) {
            newData.sidebar[indices.index] = { title, url, icon };
        } else if (type === 'dropdown-add') {
            newData.dropdown.push({ title, url });
        } else if (type === 'dropdown-edit' && indices.index !== undefined) {
            newData.dropdown[indices.index] = { title, url };
        } else if (type === 'quick-action-edit' && indices.index !== undefined) {
            newData.quickActions[indices.index] = { icon, url };
        } else if (type === 'section-add') {
            newData.sections.push({ title, fontSize, tools: [] });
        } else if (type === 'section-edit' && indices.sIndex !== undefined) {
            newData.sections[indices.sIndex].title = title;
            newData.sections[indices.sIndex].fontSize = fontSize;
        } else if (type === 'tool-add' && indices.sIndex !== undefined) {
            newData.sections[indices.sIndex].tools.push({ title, desc, url, icon, iconColor, bgColor });
        } else if (type === 'tool-edit' && indices.sIndex !== undefined && indices.tIndex !== undefined) {
            newData.sections[indices.sIndex].tools[indices.tIndex] = { ...newData.sections[indices.sIndex].tools[indices.tIndex], title, desc, url, icon, iconColor, bgColor };
        }

        onSave(newData);
    };

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        
        const newData = JSON.parse(JSON.stringify(data)) as DashboardData;
        if (type === 'sidebar-edit' && indices.index !== undefined) newData.sidebar.splice(indices.index, 1);
        else if (type === 'dropdown-edit' && indices.index !== undefined) newData.dropdown.splice(indices.index, 1);
        else if (type === 'section-edit' && indices.sIndex !== undefined) newData.sections.splice(indices.sIndex, 1);
        else if (type === 'tool-edit' && indices.sIndex !== undefined && indices.tIndex !== undefined) newData.sections[indices.sIndex].tools.splice(indices.tIndex, 1);
        // Quick actions might not need delete as there are usually fixed slots, but if dynamic:
        // else if (type === 'quick-action-edit' && indices.index !== undefined) newData.quickActions.splice(indices.index, 1);
        
        onSave(newData);
    };

    const isTool = type?.includes('tool');
    const isSection = type?.includes('section');
    const isSidebar = type?.includes('sidebar');
    const isQuickAction = type?.includes('quick-action');
    const isAdd = type?.includes('add');

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
            <div className="bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-border flex justify-between items-center bg-gray-50 dark:bg-dark-bg/50">
                    <h3 className="font-semibold text-lg dark:text-gray-100">
                        {isAdd ? 'Add New Item' : 'Edit Item'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><i className="fa-solid fa-times"></i></button>
                </div>
                
                <div className="p-6 space-y-4 overflow-y-auto">
                    {!isQuickAction && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="input-field" placeholder="Enter title..." />
                        </div>
                    )}

                    {isSection && (
                        <div>
                             <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Font Size: {fontSize}px</label>
                             <input type="range" min="14" max="32" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full" />
                        </div>
                    )}

                    {(isTool) && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Description</label>
                            <textarea rows={2} value={desc} onChange={e => setDesc(e.target.value)} className="input-field" placeholder="Short description..." />
                        </div>
                    )}

                    {!isSection && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Destination URL</label>
                            <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="input-field" placeholder="https://..." />
                        </div>
                    )}

                    {(isTool || isSidebar || isQuickAction) && (
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Icon</label>
                                <button 
                                    onClick={() => onPickIcon(setIcon)}
                                    className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors dark:text-gray-200"
                                >
                                    <span><i className={`${icon} mr-2`}></i> {icon.replace('fa-solid fa-', '')}</span>
                                    <span className="text-xs text-primary">Change</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {isTool && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Icon Color</label>
                                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2">
                                    <input type="color" value={iconColor} onChange={e => setIconColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-none p-0" />
                                    <span className="text-xs text-gray-500">{iconColor}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Card Color</label>
                                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-2">
                                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-none p-0" />
                                    <span className="text-xs text-gray-500">{bgColor}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50 flex justify-between">
                    {!isAdd && !isQuickAction ? (
                        <button onClick={handleDelete} className="px-4 py-2 text-danger hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium">Delete</button>
                    ) : <div></div>}
                    <button onClick={handleSave} className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 font-medium">Save Changes</button>
                </div>
            </div>
            
            <style>{`
                .input-field {
                    width: 100%;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border: 1px solid #e5e7eb;
                    outline: none;
                    transition: all 0.2s;
                    font-size: 0.875rem;
                    background-color: white;
                    color: #1f2937;
                }
                .dark .input-field {
                    background-color: #1a1d29;
                    border-color: #4b5563;
                    color: #f3f4f6;
                }
                .input-field:focus {
                    border-color: #1a73e8;
                    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
                }
            `}</style>
        </div>
    );
};

export default EditModal;