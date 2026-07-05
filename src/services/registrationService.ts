export interface Registration {

    fullName: string;
    gender: string;
    phone: string;
    email: string;    
    currentLevel: string;
    preferredDays: string;
    comments: string;

}

const API_URL = import.meta.env.VITE_REGISTRATION_API;

// export async function registerStudent(data: Registration){

//     const response = await fetch(API_URL,{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(data)
//     });

//     return await response.json();

// }

import { registerStudent } from "@/services/registrationService";

const result = await registerStudent(formData);

if(result.success){

    alert(
        `Registration successful!\n\nRegistration ID: ${result.registrationId}`
    );

}
else{

    alert(result.message);

}