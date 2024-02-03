async function addToCart(selections) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_add_to_cart
            }`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                        'content-type':"application/json"
                },
                credentials: "include",
                body: JSON.stringify({ items: selections })
            }
        );
        return promise
    } catch (err) {
        return console.log("somthing went error when adding to cart");
    }
}

export default addToCart