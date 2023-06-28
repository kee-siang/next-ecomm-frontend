export const ssr = false;

import { isLoggedIn } from '../utils/auth.js';

//To make sure that the sign out button able to stay show out after the page is refresh// 
export async function load() {
    await isLoggedIn();
}
