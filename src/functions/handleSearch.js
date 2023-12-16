async function handleSearch(searchValue, result) {
    fetch(`${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_search}`, {
        method: "POST",
        mode: "cors",
        headers: {
            "content-type": "application/json",
            Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token}`,
        },
        body: JSON.stringify({ search: searchValue })
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                result(data.data);
            } 
        })
}

export default handleSearch