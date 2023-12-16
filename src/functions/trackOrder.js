async function trackOrder(orderNumber, result, msg) {
    fetch(
        `${import.meta.env.VITE_domain}${import.meta.env.VITE_mainapi}${import.meta.env.VITE_track_order
        }`,
        {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: `GreenBearer ${import.meta.env.VITE_authorization_token
                    }`,
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ orderNumber }),
        }
    )
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                result(data.order)
            }else{
                msg(data.message);
            }
        });
}
export default trackOrder