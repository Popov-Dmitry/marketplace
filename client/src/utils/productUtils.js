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