async function changePasswordHandler(orderNumber, userEmail) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_cancel_order_user

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
                body: JSON.stringify({ orderNumber: orderNumber, userEmail: userEmail })
            }
        );
        return promise
    } catch (err) {
        return console.log("somthing went error when adding to cart");
    }
}

export default changePasswordHandler