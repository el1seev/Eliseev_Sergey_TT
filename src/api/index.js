import { TAX } from "./constans";

//transform description from text to html
export const createMarkup = (tag) => {
    return { __html: tag };
}
//filter item currency
export const compareTo = (currencyItem, currencyGlobal) => {
    const currencyData = [];

    for (let i = 0; i <= currencyItem.prices.length; i++) {
        if (currencyItem.prices[i].currency.symbol === currencyGlobal) {
            currencyData.push(currencyItem.prices[i].currency.symbol, currencyItem.prices[i].amount);
            return currencyData;
        } else {
            continue;
        }
    }
}

//category filter
export const filterCategory = (names, desiredName) => {
    return names.map(value => (
        value.name === desiredName ?
            value.name
            :
            null
    ));
}

// check if array have undefined select property
export const lengthOfShipped = (shipped) => {
    const shippedArray = [];
    shipped.attributes.map((shippedElement) => (
        shippedElement.selected === undefined ?
            null
            :
            shippedArray.push(1)
    ));
    return shippedArray.length;
}

const compareToSelected = (array, shipped) => {
    const shippedArray = [];
    const sendRes = [];
    shipped.attributes.map((shippedElement) => (
        shippedElement.selected === undefined ?
            null
            :
            shippedArray.push(1)
    ));

    if (array.length === shippedArray.length) {
        sendRes.push(1)
    } else {
        sendRes.push(-1)
    }

    return sendRes;
}

const isPositive = (value) => {
    return value > 0;
}


//check if product in cart already
//сравниваются selected продуктов из корзины и продукта отправляемого в корзину, если находится совпадение, то в массив кидаем 1, в обратном случае null
export const checkAttInCartAlready = (cart, shippedItem) => {
    const res = [];
    const receivedLength = lengthOfShipped(shippedItem);

    for (let i = 0; i <= cart.length; i++) {
        if (res.length !== receivedLength && cart[i] !== undefined) {
            clearArray(res);
            if (cart[i].id === shippedItem.id) {
                cart[i].attributes.map((childElement) => (
                    shippedItem.attributes.map((shippedElement) => (
                        childElement.name === shippedElement.name && childElement.selected === shippedElement.selected ?
                            res.push(1)
                            :
                            null
                    ))
                ))
            }
        } else {
            const response = compareToSelected(res, shippedItem);
            return response.some(isPositive);
        }
    }
}

export const compareAttributes = (productInCart, shippedItem) => {
    const res = [];

    if (productInCart.id === shippedItem.id) {
        productInCart.attributes.map((childElement) => (
            shippedItem.attributes.map((shippedElement) => (
                childElement.name === shippedElement.name && childElement.selected === shippedElement.selected ?
                    res.push(1)
                    :
                    null
            ))
        ))
    } else {
        return null; //переделать
    }

    const response = compareToSelected(res, shippedItem);
    return response.some(isPositive);
}

export const clearArray = (arr) => {
    arr.length = 0;
    return arr;
}

//функция, которая будет выбирать первые значения аттрибутов продукта, отправленного с PLP либо же отправлять продукт у которого нет аттрибутов
export const setDefaultValues = (shippedProduct) => {
    if (shippedProduct.attributes !== undefined) {
        shippedProduct.attributes.map(attribute => (
            attribute.selected = attribute.items[0].value
        ))
        return shippedProduct;
    }
}
//calculate cart items info as well as qty of cart items, price of items and tax for it 
export const getCartItemsInfo = (cartItems, currentCurrency) => {
    let items = 0;
    let price = 0;
    let tax = 0;

    if (cartItems !== undefined) {
        cartItems.map((product) => {
            items += product.qty;
            let itemPrice = compareTo(product, currentCurrency);
            price += product.qty * itemPrice[1];
        })
    }
    let fixPrice = price.toFixed(2);
    tax = Number(fixPrice * TAX.VALUE);
    let fixTax = tax.toFixed(2);


    let result = { price: Number(fixPrice), tax: Number(fixTax), qty: Number(items) };
    return result;
}