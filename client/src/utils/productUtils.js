export const getColorsByDetails = (clothes) => {
    let colors = [];
    for (let c of clothes) {
        if (!colors.includes(c.color)) {
            colors.push(c.color);
        }
    }
    return colors;
}

export const getSizesByDetails = (clothes) => {
    let sizes = [];
    for (let c of clothes) {
        if (!sizes.includes(c.size)) {
            sizes.push(c.size);
        }
    }
    return sizes;
}

export const getSizesByColor = (clothes, color) => {
    let sizes = [];
    for (let c of clothes) {
        if (c.color === color && !sizes.includes(c.size)) {
            sizes.push({ id: c.id, size: c.size, count: c.count });
        }
    }
    return sizes;
}

export const getCurrentClothes = (clothesArr, id) => {
    const currentClothes = clothesArr.filter(c => c.id == id);
    return currentClothes[0] ? currentClothes[0] : {};
}

export const positiveNumber = (event) => {
    if (event.target.value < 0) {
        event.target.value = event.target.value * -1;
    }
}

export const daysLag = (date1, date2) => {
    return Math.ceil(Math.abs(date1 - date2) / (1000 * 3600 * 24));
}

export const findWish = (wishlist, productType, productDetailsId, productId) => {
    return wishlist.find(wish =>
        wish.productType === productType && wish.productDetailsId === productDetailsId && wish.productId === productId);
}