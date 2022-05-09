import {$host} from "./index";
import {AUTH} from "../utils/endpoints";

export const login = async (email, password, userRole) => {
    const response = await $host.post(AUTH, {email, password, userRole});
    return response;
}