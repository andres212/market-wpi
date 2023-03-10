/**
 * 
 * @returns JSON con Productos cargados de la api fakestore
 */
async function getProducts() {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const json = await res.json();
        return json;
    } catch (error) {
        return error;
    }
}

/**
 * Agregar un item al carro
 * @param {*} item 
 */
function addItemToCart(item) {
    let cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
        let cart = [];
        cart = JSON.parse(cartStorage);
        const getProduct = cart.filter(itemCart => itemCart.item.id === item.id);
        if (getProduct && getProduct.length > 0) {
            const productUpdate = getProduct[0];
            cart.map(item => {
                if (item.item.id === productUpdate.item.id) {
                    item.count = item.count + 1;
                    item.stock = item.stock - 1;
                    item.total = parseInt(item.total + item.price);
                }
                return item;
            })
            localStorage.setItem('cart', JSON.stringify(cart));
            return true;
        } else {
            const cart = JSON.parse(cartStorage);
            const newItem = {
                item,
                count: 1,
                price: parseInt(item.price),
                total: parseInt(item.price * 1),
                stock: item.rating.count - 1
            }
            cart.push(newItem);
            localStorage.setItem('cart', JSON.stringify(cart));
            return true;
        }
    } else {
        let cart = [];
        const newItem = {
            item,
            count: 1,
            price: parseInt(item.price),
            total: parseInt(item.price * 1),
            stock: item.rating.count - 1
        }
        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart))
        return true;
    }
}

/**
 * Remover item de carrito
 * @param {*} item 
 */

function removeItemToCart(item) {
    let cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
        let cart = [];
        cart = JSON.parse(cartStorage);
        const getProduct = cart.filter(itemCart => itemCart.item.id === item.item.id);
        if (getProduct && getProduct.length > 0) {
            let index = -1;
            cart.map((itemCart, indexCart) => {
                if (item.item.id === itemCart.item.id) {
                    const remove = itemCart.count - 1
                    if (remove <= 0) {
                        index = indexCart
                    } else {
                        itemCart.count = itemCart.count -1
                        itemCart.total = parseInt(itemCart.total - item.price);
                        itemCart.stock = itemCart.stock + 1
                    }
                }
                return itemCart
            });
            if (index >= 0) {
                if (index === 0) {
                    cart.pop()
                } else {
                    cart = cart.slice(0, index);
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            return true;
        }
    }
    return false;
}

/**
 * 
 * @returns todos los items del carro
 */
function getItemsFromCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * 
 * @returns Total de la compra
 */
function getTotal() {
    let cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
        let total = 0;
        let cart = [];
        cart = JSON.parse(cartStorage);
        cart.map(item => {
            if (item) {
                total+= item.total;
            }
        });
        return parseInt(total)
    }
    return 0
}


/**
 * 
 * @returns una referencía unica para cada trasacción
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

/**
 * 
 * @param {*} title 
 * @returns Title modificado
 */
function splitTitle(title) {
    return title.length > 19 ? title.slice(0, 18) + '...' : title
}

export {
    getProducts,
    addItemToCart,
    getItemsFromCart,
    removeItemToCart,
    getTotal,
    generateUUID,
    splitTitle
}