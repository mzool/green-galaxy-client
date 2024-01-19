async function getDiscount(discountCode) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_discount_code
            }`,
            {
                method: "post",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                    "content-type": "apllication/json",
                },
                body: JSON.stringify({ discountCode }),
            }
        )
        return promise
    } catch (err) {
        return console.log("something went error");
    }
}

export default getDiscount