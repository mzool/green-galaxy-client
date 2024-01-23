async function deleteItemFromOrderHandler(order_id, itemId) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_delete_item_from_order
            }`,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                    'content-type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ order_id, itemId:itemId })
            }
        );
        return promise
    } catch (err) {
        return console.log("something error")
    }
}
export default deleteItemFromOrderHandler