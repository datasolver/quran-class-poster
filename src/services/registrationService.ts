export interface Registration {

    fullName: string;
    gender: string;
    phone: string;
    email: string;    
    currentLevel: string;
    preferredDays: string[];
    comments: string;

}

const API_URL = import.meta.env.VITE_REGISTRATION_API;

export async function registerStudent(data: Registration) {
    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
}