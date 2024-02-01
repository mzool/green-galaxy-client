async function placeOrder(data) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_new_order
            }`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                },
                body: JSON.stringify(data),
            }
        )
        return promise
    } catch (err) {
        return err
    }


}
export default placeOrder