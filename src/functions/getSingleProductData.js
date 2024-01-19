async function getProductData(url){
    try{
       const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_get_one_product
            }`,
            {
                method: "get",
                mode: "cors",
                credentials: "include",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                    productId: url,
                },
            }
        )
        return promise
    }catch(err){
        console.log("something error, try again later");
    }
}

export default getProductData