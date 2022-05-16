import {$russianPost} from "./index";

export const fetchRussianPostDeliveryPrice = async (from, to, weight, pack, ret, price, service) => {
    const {data} = await $russianPost.get("", {
        params: {
            json: true,
            object: 27020,
            from,
            to,
            weight,
            pack,
            return: ret,
            sumoc: price * 100,
            service
        }
    });
    return data;
}