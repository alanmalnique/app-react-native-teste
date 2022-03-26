const ApiUrl = "https://blog.coursify.me/wp-json/wp/v2";

export default class Api {

    static ApiUrl() {
        return ApiUrl;
    }

    static getHeaders(contentType) {
        return {
            "Access-Control-Allow-Origin": "*",
            "Content-type": contentType ? contentType : 'application/json',
            'Accept': 'application/json'
        }
    }

    static async get(url) {
        const request = await fetch(ApiUrl + "/" + url, {
            method: 'GET',
            headers: this.getHeaders()
        })
        .then(resultado => resultado.json())
        .then(res => {
            return res;
        })
        return request;
    }
}