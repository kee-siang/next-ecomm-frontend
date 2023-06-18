import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

const emptyAuth = {
    "token": "",
}

// Function to handle the sign-in process//
export async function authenticateUser(email, password) {

    console.log(email, password);

    // Make the sign-in API request
    const resp = await fetch(
        PUBLIC_BACKEND_BASE_URL + '/sign-in',
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
            "token": res.accessToken,
        }));

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