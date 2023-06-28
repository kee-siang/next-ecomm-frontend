import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';

//use to fetch data from the database through '/load'//
export async function load({ fetch }) {
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/load');
    
    const res = await resp.json();
    if (resp.status == 200) {
      return {
        img: res
      }
    } else {
      return {
        img: []
      }
    }
  }