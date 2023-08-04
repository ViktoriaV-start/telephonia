import { token } from "@/utils/getToken";

export class NumbersService {
    static async getNumberData(param) {
        const response = await fetch(`/numbers/${param}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                _token: token,
            }),
        });

        return response.json();
    }
}
