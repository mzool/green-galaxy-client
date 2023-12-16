async function GetCart(store){
    await fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_cart
        }`,
        {
            method: "get",
            mode: "cors",
            credentials: "include",
            headers: {
                Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                    }`,
            },
        }
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                store.updateCart({
                    cartId: data.cart.cart_id,
                    userPicks: data.cart.allCartProducts,
                });
            }
        });
}

export default GetCart