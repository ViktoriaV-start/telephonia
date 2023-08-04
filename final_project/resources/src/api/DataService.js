import { token } from "@/utils/getToken";

export class DataService {

    static async getData(param, method, page, search, column, order, perPage, adminRole, adminId) {

        const response = await fetch(`${param}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                _token: token,
                method: method,
                page: page,
                search: search,
                column: column,
                order: order,
                perPage: perPage,
                adminRole: adminRole,
                adminId: adminId
            }),
        });
        return response.json();
    }
}
