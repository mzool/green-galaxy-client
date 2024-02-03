async function updateOrderVarientHandler(order_id, itemId, othterVerients, color, quantity, size) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_update_order_varient
            }`,
            {
                method: "PUT",
                mode: "cors",
                headers: {
                    'content-type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ order_id, itemId, othterVerients, color, quantity, size })
            }
        );
        return promise
    } catch (err) {
        return console.log("something error")
    }
}
export default updateOrderVarientHandler