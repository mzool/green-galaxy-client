async function getNewItems() {
    try {
        const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_all_products
            }`,
            {
                method: "GET",
                mode: "cors",
                credentials: "include",
            }
        );
        return promise
    } catch (err) {
        return console.log(err.message);
    }
}
export default getNewItems