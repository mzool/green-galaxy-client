async function deleteProduct(productId, confirmProductId) {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_delete_product
            }`,
            {
                method: "DELETE",
                mode: "cors",
                headers: {
                    'content-type': "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ productId, confirmProductId })
            }
        );
        return promise
    } catch (err) {
        return console.log("something error")
    }
}
export default deleteProduct