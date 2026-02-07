// admin/pages/ContactSubmissions.jsx
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { contactsApi } from "../api/contacts";

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await contactsApi.list();
      setContacts(data || []);
    } catch (e) {
      setError("Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <Layout>
      <div className="contact-submissions-container">
        <div className="submissions-header">
          <h1>Contact Form Submissions</h1>
          <button onClick={load} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>

        {loading && <div className="admin-loading">Loading...</div>}
        {error && <div className="admin-error">{error}</div>}

        {!loading && contacts.length === 0 && (
          <div className="empty-state">
            <p>No contact submissions yet.</p>
          </div>
        )}

        {!loading && contacts.length > 0 && (
          <div className="submissions-wrapper">
            <div className="submissions-list">
              <table className="submissions-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.firstName} {contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone || "-"}</td>
                      <td>{contact.company || "-"}</td>
                      <td className="subject-cell">{contact.subject || "-"}</td>
                      <td>{formatDate(contact.createdAt)}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => setSelectedContact(contact)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedContact && (
              <div className="contact-detail-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2>Contact Details</h2>
                    <button
                      className="close-btn"
                      onClick={() => setSelectedContact(null)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="detail-group">
                      <label>First Name:</label>
                      <p>{selectedContact.firstName}</p>
                    </div>
                    <div className="detail-group">
                      <label>Last Name:</label>
                      <p>{selectedContact.lastName}</p>
                    </div>
                    <div className="detail-group">
                      <label>Email:</label>
                      <p>
                        <a href={`mailto:${selectedContact.email}`}>
                          {selectedContact.email}
                        </a>
                      </p>
                    </div>
                    <div className="detail-group">
                      <label>Phone:</label>
                      <p>{selectedContact.phone || "-"}</p>
                    </div>
                    <div className="detail-group">
                      <label>Company:</label>
                      <p>{selectedContact.company || "-"}</p>
                    </div>
                    <div className="detail-group">
                      <label>Subject:</label>
                      <p>{selectedContact.subject || "-"}</p>
                    </div>
                    <div className="detail-group">
                      <label>Message:</label>
                      <p className="message-text">{selectedContact.message}</p>
                    </div>
                    <div className="detail-group">
                      <label>Submitted:</label>
                      <p>{formatDate(selectedContact.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .contact-submissions-container {
          padding: 20px;
        }

        .submissions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .submissions-header h1 {
          margin: 0;
          font-size: 24px;
        }

        .refresh-btn {
          padding: 8px 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }

        .refresh-btn:hover {
          background: #0056b3;
        }

        .submissions-wrapper {
          display: flex;
          gap: 20px;
        }

        .submissions-list {
          flex: 1;
          overflow-x: auto;
        }

        .submissions-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .submissions-table th,
        .submissions-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .submissions-table th {
          background: #f5f5f5;
          font-weight: 600;
          font-size: 13px;
        }

        .submissions-table tbody tr:hover {
          background: #f9f9f9;
        }

        .subject-cell {
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .view-btn {
          padding: 6px 12px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          font-size: 12px;
        }

        .view-btn:hover {
          background: #218838;
        }

        .contact-detail-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 20px;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }

        .close-btn:hover {
          color: #000;
        }

        .modal-body {
          padding: 20px;
        }

        .detail-group {
          margin-bottom: 16px;
        }

        .detail-group label {
          display: block;
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
          font-size: 13px;
        }

        .detail-group p {
          margin: 0;
          color: #666;
          word-wrap: break-word;
        }

        .message-text {
          background: #f9f9f9;
          padding: 12px;
          border-radius: 4px;
          border-left: 3px solid #007bff;
          white-space: pre-wrap;
          line-height: 1.5;
        }

        .detail-group a {
          color: #007bff;
          text-decoration: none;
        }

        .detail-group a:hover {
          text-decoration: underline;
        }

        .admin-loading,
        .admin-error {
          padding: 20px;
          text-align: center;
          border-radius: 4px;
        }

        .admin-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .admin-loading {
          background: #e7f3ff;
          color: #004085;
          border: 1px solid #b8daff;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #666;
        }
      `}</style>
    </Layout>
  );
};

export default ContactSubmissions;
