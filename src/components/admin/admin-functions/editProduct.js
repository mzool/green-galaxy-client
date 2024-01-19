async function editProductHandler(newData) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_edit_product_admin

            }`,
            {
                method: "PUT",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                },
                credentials: "include",
                body: newData
            }
        );
        return promise
    } catch (err) {
        return console.log("something error")
    }
}
export default editProductHandler