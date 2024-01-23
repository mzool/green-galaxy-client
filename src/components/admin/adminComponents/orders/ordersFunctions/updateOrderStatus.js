async function updateOrderStatusHandler(order_id, orderStatus, details) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_update_order_status
            }`,
            {
                method: "PUT",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                    'content-type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ order_id:order_id, orderStatus:orderStatus, details:details })
            }
        );
        return promise
    } catch (err) {
        return console.log("something error")
    }
}
export default updateOrderStatusHandler