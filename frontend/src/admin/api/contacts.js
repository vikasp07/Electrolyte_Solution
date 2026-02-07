// admin/api/contacts.js
import { apiClient } from "./client";

export const contactsApi = {
  list: async () => {
    const data = await apiClient.get("/contact");
    return Array.isArray(data) ? data : [];
  },
};
