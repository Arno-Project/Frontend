import {BASE_URL} from "./base";
import axios from 'axios';

export async function signup(params, role) {
    let url = `${BASE_URL}account/register/${role}/`;
    
    const renamed_params = {
        'first_name': params['firstName'],
        'last_name': params['lastName'],
        'email': params['email'],
        'username': params['email'],
        'phone': params['phone'],
        'password': params['password']
    }
   
    try {
        const res = await  axios.post(url, renamed_params)
        const { data } = await res;
        console.log("AAA",data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }

}
