import {$host} from "./index";
import {AUTH} from "../utils/endpoints";

export const login = async (email, password, userRole) => {
    const {data} = await $host.post(AUTH, {email, password, userRole});
    return data;
}