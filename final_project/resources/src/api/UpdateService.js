import { token } from "@/utils/getToken";

export class UpdateService {

    static async update(route, method, params) {

        const response = await fetch(`${route}`, {
            method: "PUT",

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
