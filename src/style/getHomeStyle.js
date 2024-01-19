async function getHomeStyle(store) {
    try {
        fetch(
            `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_home_style
            }`,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                        }`,
                },
            }
        ).then(res => res.json()).then((data) => {
            if (data.success) {
                 store.updateTheme(data.style)
            }
        })
    } catch (err) {
        return console.log("something went error, try again later");
    }
}
export default getHomeStyle


