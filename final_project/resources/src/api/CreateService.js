import { token } from "@/utils/getToken";

export class CreateService {

    static async addTuple(route, method, params) {

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

            return response.json();
    }
}
