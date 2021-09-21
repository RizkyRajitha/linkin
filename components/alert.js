
export default function Alert({ msg, type = "danger" }) {
  return (
    <div className="mt-4">
      <div hidden={!msg} className={`text-center alert alert-${type}`}>
        {msg}
      </div>
    </div>
  );
}
