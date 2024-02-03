async function GetCart(store){
    await fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_cart
        }`,
        {
            method: "get",
            mode: "cors",
            credentials: "include",
        }
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                store.updateCart({
                    cartItems: data.cartData.cart.items,
                    cartId:data.cartData.cartId,
                    totalPrice: data.cartData.totalPrice
                });
            }
        });
}

export default GetCart