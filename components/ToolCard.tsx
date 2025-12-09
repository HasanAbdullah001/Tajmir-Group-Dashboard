import React from 'react';
import { Tool } from '../types';

interface ToolCardProps {
    tool: Tool;
    isEditMode: boolean;
    onClick: () => void;
    onDragStart: (e: React.DragEvent) => void;
    onDragEnd: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
    tool, 
    isEditMode, 
    onClick,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop
}) => {
    // If not edit mode, it's an anchor tag (unless #billing)
    const isLink = !isEditMode && tool.url && tool.url !== '#billing';
    
    const content = (
        <>
            <div 
                className="w-12 h-12 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner"
                style={{ 
                    color: tool.iconColor || '#1a73e8', 
                    backgroundColor: tool.iconColor ? `${tool.iconColor}15` : '#1a73e815',
                    boxShadow: `inset 0 0 0 1px ${tool.iconColor ? `${tool.iconColor}20` : '#1a73e820'}`
                }}
            >
                <i className={`${tool.icon} text-xl sm:text-xl`}></i>
            </div>
            
            <div className="flex flex-col overflow-hidden w-full">
                <span className="font-semibold text-gray-800 dark:text-gray-100 text-[10px] sm:text-sm leading-tight mb-1 w-full group-hover:text-primary transition-colors line-clamp-2">
                    {tool.title}
                </span>
                <span className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {tool.desc}
                </span>
            </div>

            {isEditMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-dark-card rounded-full p-1 shadow-md">
                    <i className="fa-solid fa-grip-vertical text-gray-400 cursor-move text-xs"></i>
                </div>
            )}
        </>
    );

    // Modern card styling:
    // Mobile: Flex-col (Vertical) for better 2-column fit
    // Desktop: Flex-row (Horizontal) for classic list look
    const containerClasses = `
        relative group 
        flex flex-col sm:flex-row 
        items-center sm:items-start 
        text-center sm:text-left 
        gap-2 sm:gap-4 
        p-3 sm:p-5 
        rounded-lg transition-all duration-300 ease-out
        ${isEditMode 
            ? 'cursor-move border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary/50' 
            : 'cursor-pointer hover:-translate-y-1 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] dark:shadow-none dark:hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] hover:shadow-primary/5 dark:hover:shadow-primary/10'
        }
        bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border h-full
        hover:border-primary/20 dark:hover:border-primary/20
    `;

    const style = {
        backgroundColor: tool.bgColor && tool.bgColor !== '#ffffff' ? tool.bgColor : undefined,
    };

    if (isLink) {
        return (
            <a 
                href={tool.url} 
                target="_blank" 
                rel="noreferrer" 
                className={containerClasses}
                style={style}
            >
                {content}
            </a>
        );
    }

    return (
        <div 
            onClick={onClick}
            draggable={isEditMode}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className={containerClasses}
            style={style}
        >
            {content}
        </div>
    );
};

export default ToolCard;