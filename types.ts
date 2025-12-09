export interface Tool {
    title: string;
    url: string;
    icon: string;
    desc: string;
    iconColor?: string;
    bgColor?: string;
    width?: string;
    height?: string;
}

export interface Section {
    title: string;
    fontSize?: number;
    tools: Tool[];
}

export interface SidebarItem {
    title: string;
    url: string;
    icon: string;
}

export interface QuickAction {
    icon: string;
    url: string;
}

export interface DropdownItem {
    title: string;
    url: string;
}

export interface DashboardData {
    sidebar: SidebarItem[];
    dropdown: DropdownItem[];
    quickActions: QuickAction[];
    sections: Section[];
}

export type EditType = 'sidebar-add' | 'sidebar-edit' | 'dropdown-add' | 'dropdown-edit' | 'section-add' | 'section-edit' | 'tool-add' | 'tool-edit' | 'quick-action-edit' | null;

export interface EditIndices {
    sIndex?: number;
    tIndex?: number;
    index?: number;
}