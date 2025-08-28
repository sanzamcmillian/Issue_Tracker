import axios from "axios";

const API_BASE_URL = "http://localhost:8000/";

export const getIssues = async (params = {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/v1/issues/`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching issues:", error);
        throw error;
    }
};

export const createIssue = async (issueData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}api/v1/issues`, issueData);
        return response.data;
    } catch (error) {
        console.error("Error creating issue:", error);
        throw error;
    }
};

export const getIssue = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/v1/issues/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching issue:", error);
        throw error;
    }
};

export const updateIssue = async (id, issueData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}api/v1/issues/${id}`, issueData);
        return response.data;
    } catch (error) {
        console.error("Error updating issue:", error);
        throw error;
    }
};

export const deleteIssue = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}api/v1/issues/${id}`);
        return response.data;
    } catch(error) {
        console.error("Error deleting issue:", error);
        throw error;
    }
};