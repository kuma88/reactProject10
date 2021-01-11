import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://kuma88.pythonanywhere.com";
const API_WHOAMI = "/whoami";

export function useUsername(signOutCallback){
    async function getUsername() {
        console.log("---- Getting user name -----");

        /// get my token
        const token = await AsyncStorage.getItem("token");
        console.log(`Token is ${token}`);
        /// send it to the API and save the user name
        try {
            const response = await axios.get(API + API_WHOAMI, {
            headers: {
                Authorization: `JWT ${token}`,
            },
            });
            console.log("Got user name!");
            return response.data.username;
        } catch (error) {
            console.log("Error getting user name");
            if (error.response) {
            console.log(error.response.data);
            if (error.response.data.status_code === 401) {
                signOut();
                return null;
            }
            } else {
            console.log(error);
            }
            // We should probably go back to the login screen???
        }
    }

    return getUsername;
        
}