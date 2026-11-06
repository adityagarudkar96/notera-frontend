function Loader({ message = "Loading..." }) {
  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center gap-3">
      <div className="w-9 h-9 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}

export default Loader;
