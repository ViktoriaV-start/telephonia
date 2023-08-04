// import { token } from "@/utils/getToken";

export class ManagersService {

    static async setManagerData (id, token, formData) {
        const response = await fetch(`/admin/managers/${id}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                _token: token,
                data:   formData,
            }),
        });

        return response.json();
    }
}
