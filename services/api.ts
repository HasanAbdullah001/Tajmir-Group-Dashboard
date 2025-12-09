import { DashboardData } from '../types';

const API_URL = "https://dashboard-api.googlman001001.workers.dev";

export const fetchDashboardData = async (): Promise<DashboardData | null> => {
    try {
        const response = await fetch(`${API_URL}/api/data`);
        if (response.ok) {
            return await response.json();
        }
    } catch (e) {
        console.error("Failed to fetch data", e);
    }
    return null;
};

export const saveDashboardData = async (data: DashboardData, password: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/api/save`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-admin-password': password 
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            throw new Error("Incorrect Password");
        }
        return response.ok;
    } catch (e) {
        throw e;
    }
};