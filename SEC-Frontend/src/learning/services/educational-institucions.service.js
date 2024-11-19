import http from "../../shared/services/http-common.js";

export class EducationalInstitutionsService {
    resourceEndpoint = '/educational-institutions';
    getAll() {
        return http.get(this.resourceEndpoint);
    }

    get(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(data) {
        return http.post(this.resourceEndpoint, data);
    }

    getAllClasses(id) {
        return http.get(`${this.resourceEndpoint}/${id}/classes`);
    }

    createClass(id, data) {
        return http.post(`${this.resourceEndpoint}/${id}/classes`, data);
    }

    getClass(id, classId) {
        return http.get(`${this.resourceEndpoint}/${id}/classes/${classId}`);
    }

    getAllResources(id, classId) {
        return http.get(`${this.resourceEndpoint}/${id}/classes/${classId}/resources`);
    }

    createResource(id, classId, data) {
        return http.post(`${this.resourceEndpoint}/${id}/classes/${classId}/resources`, data);
    }

    getResource(id, classId, resourceId) {
        return http.get(`${this.resourceEndpoint}/${id}/classes/${classId}/resources/${resourceId}`);
    }

    getAllComments(id, classId) {
        return http.get(`${this.resourceEndpoint}/${id}/classes/${classId}/comments`);
    }

    createComment(id, classId, data) {
        return http.post(`${this.resourceEndpoint}/${id}/classes/${classId}/comments`, data);
    }

    getComment(id, classId, commentId) {
        return http.get(`${this.resourceEndpoint}/${id}/classes/${classId}/comments/${commentId}`);
    }
}