function removeItem(itemId, cartId, msg, fun, store) {
    msg("updating your cart ...");
    fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_delete_cart_item
        }`,
        {
            method: "DELETE",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                cart_id: cartId,
                itemId
            })
        }
    )
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) {
                msg("somthing wrong, try again later");
                return;
            }
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            fun(store);
            msg("");
        });
}

export default removeItem