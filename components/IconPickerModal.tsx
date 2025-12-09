import React from 'react';

const COMMON_ICONS = [
    'fa-solid fa-folder', 'fa-solid fa-globe', 'fa-solid fa-link', 'fa-solid fa-star', 
    'fa-solid fa-file', 'fa-solid fa-image', 'fa-solid fa-user', 'fa-solid fa-envelope', 
    'fa-solid fa-briefcase', 'fa-solid fa-credit-card', 'fa-solid fa-chart-bar', 
    'fa-solid fa-building', 'fa-solid fa-home', 'fa-solid fa-truck', 'fa-solid fa-industry', 
    'fa-solid fa-landmark', 'fa-solid fa-money-bill', 'fa-solid fa-file-invoice', 
    'fa-solid fa-calculator', 'fa-solid fa-users', 'fa-solid fa-gear', 'fa-solid fa-lock',
    'fa-solid fa-cloud', 'fa-solid fa-database', 'fa-solid fa-server', 'fa-solid fa-code'
];

interface IconPickerModalProps {
    onClose: () => void;
    onSelect: (icon: string) => void;
}

const IconPickerModal: React.FC<IconPickerModalProps> = ({ onClose, onSelect }) => {
    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-dark-card w-full max-w-lg rounded-2xl shadow-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg dark:text-gray-100">Select Icon</h3>
                    <button onClick={onClose}><i className="fa-solid fa-times text-gray-400"></i></button>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 max-h-[60vh] overflow-y-auto p-2">
                    {COMMON_ICONS.map((icon, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => onSelect(icon)}
                            className="aspect-square flex items-center justify-center text-xl text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-primary rounded-lg border border-gray-100 dark:border-gray-700 transition-colors"
                        >
                            <i className={icon}></i>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default IconPickerModal;