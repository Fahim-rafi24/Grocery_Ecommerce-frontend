// utils/calculateTotalCost.js

export const calculateTotalCost = (carts, products) => {
    const productPriceMap = products.reduce((acc, product) => {
        acc[product._id] = product.Price;
        return acc;
    }, {});

    const productCount = carts.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(productCount).reduce((total, [id, count]) => {
        const price = productPriceMap[id] || 0;
        return total + price * count;
    }, 0);
};