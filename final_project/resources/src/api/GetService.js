import { token } from "@/utils/getToken";

export class GetService {

    static async getData(route, method, params=[]) {
        const response = await fetch(`${route}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                _token: token,
                method: method,
                params: params,
            }),
        });

        if(response) {
            return response.json();
        }
    }
}
