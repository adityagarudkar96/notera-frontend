import NoteCard from "./NoteCard";

function NotesList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="bg-surface border border-dashed border-slate-300 rounded-2xl p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-700">No notes found</h3>

        <p className="text-sm text-muted mt-2">
          Create your first note to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NotesList;
