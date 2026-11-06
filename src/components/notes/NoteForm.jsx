function NoteForm({
  formData,
  setFormData,
  onSubmit,
  editingId,
  onCancel,
  submitting,
}) {
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-surface p-6 rounded-2xl border border-line shadow-sm space-y-4"
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          {editingId ? "Edit Note" : "Create a New Note"}
        </h2>

        <p className="text-sm text-muted mt-1">
          {editingId
            ? "Update your note details."
            : "Capture your thoughts and stay organized."}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Title</label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title"
          required
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>

        <textarea
          name="discription"
          value={formData.discription}
          onChange={handleChange}
          placeholder="Write your note..."
          rows="4"
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none resize-y focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Urgency</label>

        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-3 rounded-lg font-medium disabled:opacity-60"
        >
          {submitting ? "Saving..." : editingId ? "Update Note" : "Create Note"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-lg font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
