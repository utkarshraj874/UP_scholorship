// API client for UP Scholarship Portal (Completed Backend Modules: User, Profile, Documents)
const API_BASE = "http://localhost:8000";

function getHeaders(isFormData = false) {
  const headers = {};
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  const token = localStorage.getItem("scholarship_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // 1. User Authentication
  async login(email, password) {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Login failed");
    }
    return res.json();
  },

  async register(name, email, password) {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Registration failed");
    }
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/me`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    return res.json();
  },

  // 2. Student Profile
  async getMyProfile() {
    const res = await fetch(`${API_BASE}/profiles/me`, {
      headers: getHeaders(),
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to fetch profile");
    }
    return res.json();
  },

  async saveProfile(profileData) {
    const res = await fetch(`${API_BASE}/profiles`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(profileData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to save profile");
    }
    return res.json();
  },

  async updateProfile(profileId, profileData) {
    const res = await fetch(`${API_BASE}/profiles/${profileId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(profileData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to update profile");
    }
    return res.json();
  },

  async deleteProfile(profileId) {
    const res = await fetch(`${API_BASE}/profiles/${profileId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to delete profile");
    }
    return res.json();
  },

  // 3. Document Management
  async getDocuments(userId) {
    const url = userId ? `${API_BASE}/documents/?user_id=${userId}` : `${API_BASE}/documents/`;
    const res = await fetch(url, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to fetch documents");
    }
    return res.json();
  },

  async uploadDocument(formData) {
    const res = await fetch(`${API_BASE}/documents/`, {
      method: "POST",
      headers: getHeaders(true),
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to upload document");
    }
    return res.json();
  },

  async getDocumentFileUrl(category, userId) {
    const url = userId
      ? `${API_BASE}/documents/${category}/file?user_id=${userId}`
      : `${API_BASE}/documents/${category}/file`;
    const res = await fetch(url, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to get document file link");
    }
    return res.json();
  },

  async deleteDocument(category, userId) {
    const url = userId
      ? `${API_BASE}/documents/${category}?user_id=${userId}`
      : `${API_BASE}/documents/${category}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to delete document");
    }
    return res.json();
  },
};
