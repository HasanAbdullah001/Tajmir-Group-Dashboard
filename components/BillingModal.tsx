import React from 'react';

interface BillingModalProps {
    onClose: () => void;
}

const BillingModal: React.FC<BillingModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in zoom-in duration-200">
            <div className="bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-2xl p-6 text-center">
                <div className="flex justify-end">
                    <button onClick={onClose}><i className="fa-solid fa-times text-gray-400"></i></button>
                </div>
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Billing & Sales</h3>
                <div className="flex gap-4">
                    <a href="https://tajmirgroups.pages.dev/" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
                        <i className="fa-solid fa-plus-circle text-3xl text-primary group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Create Invoice</span>
                    </a>
                    <a href="https://tajmir-invoice.pages.dev/" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group">
                        <i className="fa-solid fa-eye text-3xl text-primary group-hover:scale-110 transition-transform"></i>
                        <span className="font-medium text-gray-700 dark:text-gray-300">View Invoices</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BillingModal;