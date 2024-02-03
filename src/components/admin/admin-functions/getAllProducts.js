async function getAllProducts() {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_all_products_admin
            }`,
            {
                method: "GET",
                mode: "cors",
                credentials: "include",
            }
        )
        return promise
    } catch (err) {
        return console.log("something error")
    }
}
export default getAllProducts