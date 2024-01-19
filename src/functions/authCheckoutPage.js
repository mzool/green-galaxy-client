async function authCheckout(cartId) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_checkout_page
            }/${cartId}`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                },
            }
        );
        return promise
    } catch (err) {
        return console.log("somthing went error, try again later");
    }
}

export default authCheckout