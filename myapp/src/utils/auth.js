import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';


const emptyAuth = {
    "token": "",
}


export let showButton = writable(false);

//Function to handle the sign-out process//
export async function LogOut() {
    localStorage.setItem("auth", JSON.stringify(emptyAuth));
    showButton.set(false);
    return true;
}

export function getTokenFromLocalStorage() {
    const auth = localStorage.getItem("auth")
    if (auth) {
        return JSON.parse(auth)["token"]
    }
    return null
}

export async function isLoggedIn(){
    const token = getTokenFromLocalStorage();
    if(!getTokenFromLocalStorage()){
        return false;
    } else {
        showButton.set(true);
    }
}

// Function to handle the sign-in process//
export async function authenticateUser(email, password) {

    // Make the sign-in API request
    const resp = await fetch(
        PUBLIC_BACKEND_BASE_URL + '/auth',
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const res = await resp.json();

    // Handle the API response//
    if (resp.status == 200) {

        //store token in the local storage//
        localStorage.setItem("auth", JSON.stringify({
            "token": res.accessToken
        }));

        showButton.set(true);

        return {
            success: true,
            res: res
        }
    }
    return {
        success: false,
        res: res
    }
}