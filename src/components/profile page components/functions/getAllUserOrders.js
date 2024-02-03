async function getAllUserOrdersHandler() {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_all_user_orders
            }`,
            {
                method: "GET",
                mode: "cors",
                credentials: "include",
            }
        );
        return promise
    } catch (err) {
        return console.log("somthing went error when adding to cart");
    }
}

export default getAllUserOrdersHandler