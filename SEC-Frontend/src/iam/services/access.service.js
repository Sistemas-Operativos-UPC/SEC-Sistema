import http from "../../shared/services/http-common.js";

export class AccessService {
    resourceEndpoint = '/auth';

    signIn(data) {
        return http.post(`${this.resourceEndpoint}/sign-in`, data);
    }

    signUp(data) {
        return http.post(`${this.resourceEndpoint}/sign-up`, data);
    }
}