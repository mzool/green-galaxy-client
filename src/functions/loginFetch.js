async function login(values){
    try{
     const promise = await fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_login
            }`,
            {
                method: "post",
                cors: "cors",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            }
        )
        return promise
    }catch(err){
        console.log("somthing error, try again later");
    }
}
export default login