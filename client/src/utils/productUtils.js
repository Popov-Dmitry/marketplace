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
            sizes.push(c.size);
        }
    }
    return sizes;
}