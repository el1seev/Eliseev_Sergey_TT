export const  createMarkup = (tag) => {
    return {__html: tag};
}
// compare currency of items to global currency
export const compareTo = (currencyItem, currencyGlobal) => {
    return currencyItem.prices.map( (value) => (
        value.currency.symbol === currencyGlobal ? 
        [value.currency.symbol,' ',value.amount]
        :
        null
    ))
}
//category filters
export const filterAllCategory = (names) => {
    return names.map( value => (
        value.name === "all" ? 
        value.name
        :
        null
    ))
}

export const filterClothesCategory = (names) => {
    return names.map( value => (
        value.name === "clothes" ? 
        value.name
        :
        null
    ))
}

export const filterTechCategory = (names) => {
    return names.map( value => (
        value.name === "tech" ? 
        value.name
        :
        null
    ))
}

const lengthOfShipped = (shipped) => {
    const shippedArray = [];
    shipped.attributes.map( (shippedElement) => (
        shippedElement.selected === undefined ? 
        null
        :
        shippedArray.push(1)
    ))
    return shippedArray.length
}

const compareToSelected = (array, shipped) => {
    const shippedArray = [];
    const sendRes = [];
    shipped.attributes.map( (shippedElement) => ( 
        shippedElement.selected === undefined ? 
        null
        :
        shippedArray.push(1)
    ))
    console.log(array, shippedArray ,"<--- shipped array")
    if(array.length === shippedArray.length){
        sendRes.push(1) 
    } else {
        sendRes.push(-1) 
    }

    return sendRes
}

const isPositive = (value) => {
    return value > 0
}


//check if product in cart already
export const checkAttInCartAlready = (cart, shippedItem) => {
    const res = [];
    // const shippedLength = lengthOfShipped(shippedItem);
    // res.length = shippedLength;
    const receivedLength = lengthOfShipped(shippedItem)
    // res.length = receivedLength;
    console.log(res.length, "<---- length of res", lengthOfShipped(shippedItem))
    // const filterId = cart.find( productInCart => productInCart.id === shippedItem.id);
    // filterId !== undefined ?
    // const removedFirst = res.shift();
    // console.log(res, "<<<<<<<<<<<<<<<<<<<<<<<<<<RESSSSSSSSSS FIRST SSTATE", removedFirst)

    for( let i = 0; i < cart.length; i++){
        if( res.length !== receivedLength){
            clearArray(res);
            cart[i].id === shippedItem.id ?
            cart[i].attributes.map( (childElement) => (
            shippedItem.attributes.map( (shippedElement) => (
                console.log(childElement.selected, shippedElement.selected, 'WARRRRRRRRRRNINNG '),
                childElement.name === shippedElement.name ? 
                childElement.selected === shippedElement.selected ?
                    res.push(1)
                    :
                    console.log(childElement.selected, shippedElement.selected, '22222222222222')
                :
                console.log('3')
                ))
                ))
                :
                console.log('4')
        } else {
            console.log(res, "<-----RES");
            // console.log(attributesFromArrays, "<--------- ATTRIBUTES" )
            const response = compareToSelected(res, shippedItem);
            console.log(response, "<----- RESPONSE");
            return response.some(isPositive);
        }
    }

}

export const compareAttributes = (productInCart, shippedItem) => {
    const res = [];
    const attributesFromArrays = [];

    const receivedLength = lengthOfShipped(shippedItem)
    res.length = receivedLength;
    console.log(res.length, "<---- length of res", lengthOfShipped(shippedItem))

    const removedFirst = res.shift();
    console.log(res, "<<<<<<<<<<<<<<<<<<<<<<<<<<RESSSSSSSSSS FIRST SSTATE", removedFirst)

        if(productInCart.id === shippedItem.id){
        productInCart.attributes.map( (childElement) => (
            clearArray(res),
            clearArray(attributesFromArrays),
            shippedItem.attributes.map( (shippedElement) => (
                childElement.name === shippedElement.name ? 
                    childElement.selected === shippedElement.selected ?
                        res.length === receivedLength ?
                            null
                            :
                            res.push(1)
                        :
                        null
                    :
                    null
                    ))
                ))
        } else {
            return null
        }

    console.log(res, "<-----RES");
    console.log(attributesFromArrays, "<--------- ATTRIBUTES" )
    const response = compareToSelected(res, shippedItem);
    console.log(response, "<----- RESPONSE");
    return response.some(isPositive);
}

export const clearArray = (arr) => {
    console.log(arr.length)
    arr.length = [];
    return arr
}