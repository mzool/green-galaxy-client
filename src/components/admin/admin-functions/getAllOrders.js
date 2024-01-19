async function getAllOrders() {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_all_orders_admin
            }`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`
                },
                credentials: "include",
            }
        )
        return promise
    } catch (err) {
        return console.log("something error")
    }
}
export default getAllOrders