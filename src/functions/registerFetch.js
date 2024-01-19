async function register (values){
    try{
      const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_register
            }`,
            {
                method: "post",
                cors: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                    "content-type": "application/json",
                },
                body: JSON.stringify(values),
                credentials: "include",
            }
        )
        return promise
    }catch(err){
        console.log("somthing error, try again later");
    }
}

export default register