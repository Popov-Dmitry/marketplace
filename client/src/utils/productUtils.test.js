import {
    daysLag, findWish,
    getColorsByDetails,
    getCurrentClothes,
    getSizesByColor,
    getSizesByDetails,
    positiveNumber
} from "./productUtils";

const clothes = [
    {
        "id": 4,
        "color": "Белый",
        "size": "XXL",
        "count": 0,
        "regularPrice": 17000,
        "price": null,
        "weight": 1367,
        "deliveryId": 2
    },
    {
        "id": 2,
        "color": "Желтый",
        "size": "XL",
        "count": 10,
        "regularPrice": 15000,
        "price": null,
        "weight": 1421,
        "deliveryId": 2
    },
    {
        "id": 1,
        "color": "Желтый",
        "size": "L",
        "count": 15,
        "regularPrice": 15000,
        "price": 13500,
        "weight": 1421,
        "deliveryId": 2
    },
    {
        "id": 3,
        "color": "Белый",
        "size": "L",
        "count": 3,
        "regularPrice": 17000,
        "price": null,
        "weight": 1353,
        "deliveryId": 2
    }
];

describe("Product utils tests", () => {
    test("getColorsByDetails", () => {
        expect(getColorsByDetails(clothes)).toEqual(["Белый", "Желтый"]);
    });

    test("getSizesByDetails", () => {
        expect(getSizesByDetails(clothes)).toEqual(["XXL", "XL", "L"]);
    });

    test("getSizesByColor", () => {
        expect(getSizesByColor(clothes, "Белый")).toEqual([
            { id: 4, size: "XXL", count: 0 },
            { id: 3, size: "L", count: 3 }]);
    });

    test("getCurrentClothes", () => {
        expect(getCurrentClothes(clothes, 1)).toStrictEqual(    {
            "id": 1,
            "color": "Желтый",
            "size": "L",
            "count": 15,
            "regularPrice": 15000,
            "price": 13500,
            "weight": 1421,
            "deliveryId": 2
        });
    });

    test("positiveNumber", () => {
        const event = {
            target: {
                value: -5
            }
        };
        positiveNumber(event)
        expect(event).toStrictEqual({target: {value: 5}});
    });

    test("daysLag", () => {
        expect(daysLag(new Date(2022, 5, 25), new Date(2022, 5, 27))).toStrictEqual(2);
    });

    test("findWish", () => {
        const wishlist = [
            {
                "id": 4,
                "productType": "CLOTHES",
                "productDetailsId": 4,
                "productId": 14,
                "customerId": 55,
                "sellerId": 7
            },
            {
                "id": 6,
                "productType": "CLOTHES",
                "productDetailsId": 8,
                "productId": 18,
                "customerId": 55,
                "sellerId": 6
            }
        ];
        expect(findWish(wishlist, "CLOTHES", 4, 14)).toStrictEqual({
            "id": 4,
            "productType": "CLOTHES",
            "productDetailsId": 4,
            "productId": 14,
            "customerId": 55,
            "sellerId": 7
        });
    });
});
