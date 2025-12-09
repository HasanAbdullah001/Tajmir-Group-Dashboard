import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DashboardData, EditIndices, EditType } from './types';
import { fetchDashboardData, saveDashboardData } from './services/api';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import EditModal from './components/EditModal';
import LoginModal from './components/LoginModal';
import IconPickerModal from './components/IconPickerModal';
import BillingModal from './components/BillingModal';

const DEFAULT_DATA: DashboardData = {
    sidebar: [],
    dropdown: [],
    quickActions: [
        { icon: 'fa-solid fa-gear', url: '#' },
        { icon: 'fa-solid fa-envelope', url: 'https://mail.google.com' },
        { icon: 'fa-solid fa-user-group', url: '#' },
        { icon: 'fa-solid fa-power-off', url: 'https://tajmirgroup.pages.dev/' }
    ],
    sections: [{ title: "Quick Access", fontSize: 16, tools: [] }]
};

const App: React.FC = () => {
    const [data, setData] = useState<DashboardData>(DEFAULT_DATA);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    // Modal States
    const [editType, setEditType] = useState<EditType>(null);
    const [editIndices, setEditIndices] = useState<EditIndices>({});
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
    const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
    
    // Icon Picker Callback
    const [iconSelectCallback, setIconSelectCallback] = useState<(icon: string) => void>(() => {});

    // Touch Handling for Sidebar Swipe
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    useEffect(() => {
        const load = async () => {
            const fetched = await fetchDashboardData();
            if (fetched) {
                // Merge with default to ensure new fields (like quickActions) exist
                setData({
                    ...DEFAULT_DATA,
                    ...fetched,
                    quickActions: fetched.quickActions || DEFAULT_DATA.quickActions
                });
            }
            setIsLoading(false);
        };
        load();

        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }

        const storedPass = localStorage.getItem('adminPass') || sessionStorage.getItem('adminPass');
        if (storedPass) checkAdmin(storedPass);
    }, []);

    const checkAdmin = async (password: string) => {
        // Optimistic entry, real validation happens on save
        setIsEditMode(true);
    };

    const handleThemeToggle = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const handleLogin = async (password: string, remember: boolean) => {
        // Simple verification by attempting a dry save or just storing it
        try {
            await saveDashboardData(data, password); // Verify credential
            if (remember) localStorage.setItem('adminPass', password);
            else sessionStorage.setItem('adminPass', password);
            setIsEditMode(true);
            setIsLoginModalOpen(false);
        } catch (e) {
            alert("Incorrect Password!");
        }
    };

    const handleLogout = () => {
        setIsEditMode(false);
        localStorage.removeItem('adminPass');
        sessionStorage.removeItem('adminPass');
    };

    const handleSaveData = async (newData: DashboardData) => {
        const password = localStorage.getItem('adminPass') || sessionStorage.getItem('adminPass');
        if (!password) {
            alert("Session expired");
            handleLogout();
            return;
        }
        try {
            await saveDashboardData(newData, password);
            setData(newData);
            setEditType(null); // Close modal on success
        } catch (e) {
            alert("Failed to save changes. Check password or connection.");
        }
    };

    const openEditModal = (type: EditType, indices: EditIndices = {}) => {
        setEditType(type);
        setEditIndices(indices);
    };

    const handleIconPick = (cb: (icon: string) => void) => {
        setIconSelectCallback(() => cb);
        setIsIconPickerOpen(true);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        // Calculate deltas
        const diffX = touchEndX - touchStartX.current;
        const diffY = touchEndY - touchStartY.current;

        // Ensure swipe is mostly horizontal
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Right Swipe (Open) - works anywhere on the screen now
            if (diffX > 50) {
                setIsSidebarOpen(true);
            }
            // Left Swipe (Close) - works anywhere if sidebar is open
            if (diffX < -50 && isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-slate-50 dark:bg-dark-bg z-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen flex flex-col"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <Header 
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                isDarkMode={isDarkMode}
                toggleTheme={handleThemeToggle}
                dropdownData={data.dropdown}
                isEditMode={isEditMode}
                onOpenEditModal={openEditModal}
                onRefresh={() => window.location.reload()}
            />

            <div className="flex flex-1 pt-[70px] relative">
                <Sidebar 
                    isOpen={isSidebarOpen}
                    closeSidebar={() => setIsSidebarOpen(false)}
                    items={data.sidebar}
                    quickActions={data.quickActions}
                    isEditMode={isEditMode}
                    onOpenEditModal={openEditModal}
                    onLogout={handleLogout}
                    onOpenLogin={() => setIsLoginModalOpen(true)}
                />

                <main className="flex-1 w-full md:w-[calc(100%-260px)] md:ml-[260px] p-4 sm:p-6 lg:p-8 transition-all duration-300">
                    <DashboardContent 
                        sections={data.sections}
                        isEditMode={isEditMode}
                        onOpenEditModal={openEditModal}
                        onOpenBilling={() => setIsBillingModalOpen(true)}
                        onUpdateData={(newData) => setData(newData)}
                        fullData={data}
                        saveData={handleSaveData}
                    />
                </main>
            </div>

            {/* Modals */}
            {isLoginModalOpen && (
                <LoginModal 
                    onClose={() => setIsLoginModalOpen(false)} 
                    onLogin={handleLogin} 
                />
            )}

            {editType && (
                <EditModal 
                    type={editType}
                    indices={editIndices}
                    data={data}
                    onClose={() => setEditType(null)}
                    onSave={handleSaveData}
                    onPickIcon={handleIconPick}
                />
            )}

            {isIconPickerOpen && (
                <IconPickerModal 
                    onClose={() => setIsIconPickerOpen(false)}
                    onSelect={(icon) => {
                        iconSelectCallback(icon);
                        setIsIconPickerOpen(false);
                    }}
                />
            )}

            {isBillingModalOpen && (
                <BillingModal onClose={() => setIsBillingModalOpen(false)} />
            )}
        </div>
    );
};

export default App;