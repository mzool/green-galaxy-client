function cookie(method, name, shape,value,  expIn = 24 * 3) { ///expIn number of hours
    try {
        if (method === "set") {
            let now = new Date();
            let expDate = new Date(now.getTime() + expIn * 60 * 60 * 1000).toUTCString();

            return document.cookie = `${name}=${value};${expDate};secure`
        } else if (method === "get") {
            let allCookies;
            let cookies = document.cookie?.split(";").map((cookie) => {
                return cookie.split("=")
            });
            if (shape == "arr") {
                allCookies = [];
                cookies?.map((arr) => {
                    allCookies.push(arr)
                })
            } else if (shape == "obj") {
                allCookies = {};
                cookies?.map((arr) => {
                    allCookies[arr[0].trim()] = arr[1].trim()
                })
            }

            return allCookies
        }
    } catch (err) {
        //console.log(err);
        return
    }
}

export default cookie