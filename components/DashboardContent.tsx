import React, { useState } from 'react';
import { DashboardData, Section, EditIndices, EditType, Tool } from '../types';
import ToolCard from './ToolCard';

interface DashboardContentProps {
    sections: Section[];
    isEditMode: boolean;
    onOpenEditModal: (type: EditType, indices?: EditIndices) => void;
    onOpenBilling: () => void;
    onUpdateData: (data: DashboardData) => void;
    fullData: DashboardData;
    saveData: (data: DashboardData) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ 
    sections, 
    isEditMode, 
    onOpenEditModal,
    onOpenBilling,
    onUpdateData,
    fullData,
    saveData
}) => {
    // Basic Drag and Drop State
    const [draggedItem, setDraggedItem] = useState<{sIndex: number, tIndex: number} | null>(null);

    const handleDragStart = (e: React.DragEvent, sIndex: number, tIndex: number) => {
        if (!isEditMode) return;
        setDraggedItem({ sIndex, tIndex });
        e.dataTransfer.effectAllowed = 'move';
        // Hide ghost image slightly or style it
        e.currentTarget.classList.add('opacity-50');
    };

    const handleDragEnd = (e: React.DragEvent) => {
        e.currentTarget.classList.remove('opacity-50');
        setDraggedItem(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        if (!isEditMode) return;
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetSIndex: number, targetTIndex: number) => {
        if (!isEditMode || !draggedItem) return;
        e.preventDefault();
        
        // Simple reorder logic
        const newSections = [...sections];
        const sourceTool = newSections[draggedItem.sIndex].tools[draggedItem.tIndex];
        
        // Remove from source
        newSections[draggedItem.sIndex].tools.splice(draggedItem.tIndex, 1);
        
        // Add to target (if targetSIndex is different or same)
        newSections[targetSIndex].tools.splice(targetTIndex, 0, sourceTool);

        const newData = { ...fullData, sections: newSections };
        onUpdateData(newData);
        saveData(newData);
    };

    return (
        <div className="space-y-6 sm:space-y-8 pb-24">
            {sections.map((section, sIndex) => (
                <div key={sIndex} className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 dark:border-dark-border overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/10">
                    
                    {/* Section Header */}
                    <div 
                        className={`px-4 sm:px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between ${isEditMode ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}`}
                        onClick={() => isEditMode && onOpenEditModal('section-edit', { sIndex })}
                    >
                        <h4 
                            className="font-bold text-gray-800 dark:text-gray-100 tracking-tight"
                            style={{ fontSize: `${section.fontSize || 18}px` }}
                        >
                            {section.title}
                        </h4>
                        {isEditMode && <i className="fa-solid fa-pencil text-gray-400"></i>}
                    </div>

                    {/* Tools Grid - 2 columns on mobile, adaptive on larger screens */}
                    <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                            {section.tools.map((tool, tIndex) => (
                                <ToolCard 
                                    key={tIndex}
                                    tool={tool}
                                    isEditMode={isEditMode}
                                    onClick={() => {
                                        if (isEditMode) onOpenEditModal('tool-edit', { sIndex, tIndex });
                                        else if (tool.url === '#billing') onOpenBilling();
                                    }}
                                    onDragStart={(e) => handleDragStart(e, sIndex, tIndex)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, sIndex, tIndex)}
                                />
                            ))}
                            
                            {/* Add Tool Button */}
                            {isEditMode && (
                                <button
                                    onClick={() => onOpenEditModal('tool-add', { sIndex })}
                                    className="flex flex-col items-center justify-center min-h-[120px] border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-400 hover:border-primary hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-800 transition-colors shadow-inner">
                                        <i className="fa-solid fa-plus text-lg"></i>
                                    </div>
                                    <span className="text-sm font-semibold">Add Tool</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Global Add Section Button */}
            {isEditMode && (
                <button
                    onClick={() => onOpenEditModal('section-add')}
                    className="w-full py-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 hover:border-primary hover:text-primary hover:bg-white dark:hover:bg-dark-card transition-all font-semibold text-lg flex items-center justify-center gap-3 shadow-sm hover:shadow-lg"
                >
                    <i className="fa-solid fa-layer-group"></i> Add New Section
                </button>
            )}
        </div>
    );
};

export default DashboardContent;