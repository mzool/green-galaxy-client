async function getAllProductsForFilter() {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_all_products
            }?page=1&&limit=1000`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                },
                credentials: "include",
            }
        );
        return promise
    } catch (err) {
        return console.log(err.message);
    }
}
export default getAllProductsForFilter