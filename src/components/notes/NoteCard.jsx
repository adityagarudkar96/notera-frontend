function NoteCard({ note, onEdit, onDelete }) {
  const urgencyStyles = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <article className="bg-surface border border-line rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start gap-3">
        <h3 className="text-lg font-semibold text-slate-800 break-words">
          {note.title}
        </h3>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full capitalize whitespace-nowrap ${
            urgencyStyles[note.urgency] || "bg-slate-100 text-body"
          }`}
        >
          {note.urgency || "low"}
        </span>
      </div>

      <p className="text-body text-sm mt-4 whitespace-pre-wrap break-words min-h-12">
        {note.discription || "No description provided."}
      </p>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <small className="text-slate-400">
          {note.createdOn
            ? new Date(note.createdOn).toLocaleDateString()
            : "Date unavailable"}
        </small>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(note)}
            className="text-primary-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg text-sm font-medium"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(note._id)}
            className="text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
