
function Toast({ message, type = "success" }) {
  if (!message) return null;

  const styles = {
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700"
  };

  return (
    <div
      className={`fixed top-5 right-5 z-[70] border rounded-lg px-5 py-3 shadow-lg ${styles[type]}`}
      role="status"
    >
      {message}
    </div>
  );
}

export default Toast;
