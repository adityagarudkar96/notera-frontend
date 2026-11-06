import { useState, useEffect, useMemo } from "react";

import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteService";

import NoteForm from "../components/notes/NoteForm";
import NotesList from "../components/notes/NotesList";
import Loader from "../components/common/Loader";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Toast from "../components/common/Toast";

function Notes() {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    discription: "",
    urgency: "low",
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  async function fetchNotes() {
    try {
      setLoading(true);

      const response = await getAllNotes();
      setNotes(response.data);
    } catch (err) {
      console.error(err);
      showToast(
        err.response?.data?.message || "Unable to fetch notes.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }

  function showToast(message, type = "success") {
    setToast({ message, type });
  }

  function openCreateModal() {
    setEditingId(null);

    setFormData({
      title: "",
      discription: "",
      urgency: "low",
    });

    setIsModalOpen(true);
  }

  function openEditModal(note) {
    setEditingId(note._id);

    setFormData({
      title: note.title,
      discription: note.discription || "",
      urgency: note.urgency || "low",
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);

    setFormData({
      title: "",
      discription: "",
      urgency: "low",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitting(true);

      if (editingId) {
        await updateNote(editingId, formData);
        showToast("Note updated successfully!");
      } else {
        await createNote(formData);
        showToast("Note created successfully!");
      }

      closeModal();
      await fetchNotes();
    } catch (err) {
      console.error(err);

      showToast(err.response?.data?.message || "Unable to save note.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    try {
      await deleteNote(deleteId);

      setNotes((prev) => prev.filter((note) => note._id !== deleteId));

      showToast("Note deleted successfully!");
    } catch (err) {
      console.error(err);

      showToast(
        err.response?.data?.message || "Unable to delete note.",
        "error",
      );
    } finally {
      setDeleteId(null);
    }
  }

  const filteredNotes = useMemo(() => {
    let result = [...notes];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter(
        (note) =>
          note.title?.toLowerCase().includes(query) ||
          note.discription?.toLowerCase().includes(query),
      );
    }

    if (urgencyFilter !== "all") {
      result = result.filter((note) => note.urgency === urgencyFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdOn) - new Date(a.createdOn);
      }

      if (sortBy === "oldest") {
        return new Date(a.createdOn) - new Date(b.createdOn);
      }

      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }

      return 0;
    });

    return result;
  }, [notes, searchQuery, urgencyFilter, sortBy]);

  const highUrgencyCount = notes.filter(
    (note) => note.urgency === "high",
  ).length;

  const mediumUrgencyCount = notes.filter(
    (note) => note.urgency === "medium",
  ).length;

  const lowUrgencyCount = notes.filter((note) => note.urgency === "low").length;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Dashboard heading and summary */}
        <header className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">My Notes</h1>

              <p className="text-muted mt-1">Manage and organize your notes.</p>
            </div>

            <button
              onClick={openCreateModal}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-lg font-medium transition"
            >
              + Create Note
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm">
            <span className="text-muted">{notes.length} total notes</span>

            <span className="flex items-center gap-1.5 text-red-600">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              High: {highUrgencyCount}
            </span>

            <span className="flex items-center gap-1.5 text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Medium: {mediumUrgencyCount}
            </span>

            <span className="flex items-center gap-1.5 text-green-600">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Low: {lowUrgencyCount}
            </span>
          </div>
        </header>

        {/* Search and filters */}
        <section className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-line rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full bg-surface border border-line rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All urgency levels</option>
              <option value="low">Low urgency</option>
              <option value="medium">Medium urgency</option>
              <option value="high">High urgency</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-surface border border-line rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
        </section>

        {/* Notes list */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-slate-800">Your Notes</h2>

            <p className="text-sm text-muted">{filteredNotes.length} results</p>
          </div>

          {loading ? (
            <Loader message="Loading your notes..." />
          ) : (
            <NotesList
              notes={filteredNotes}
              onEdit={openEditModal}
              onDelete={(id) => setDeleteId(id)}
            />
          )}
        </section>
      </div>

      {/* Create / Edit modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingId ? "Edit Note" : "Create a New Note"}
      >
        <NoteForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          editingId={editingId}
          onCancel={closeModal}
          submitting={submitting}
        />
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Delete Note?"
        message="This action cannot be undone. Are you sure you want to delete this note?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} />
    </main>
  );
}

// Reusable summary card
function SummaryCard({ title, count, color = "text-slate-800" }) {
  return (
    <div className="bg-surface border border-line rounded-xl p-5">
      <p className="text-sm text-muted">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{count}</h2>
    </div>
  );
}

export default Notes;
