import { toast } from "react-toastify";
import Swal from "sweetalert2";

const BackupComponent = () => {
  const endpoint =
    process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

  const getBackup = async () => {
    try {
      let res = await fetch(`${endpoint}/api/user/backup`).then((res) =>
        res.json()
      );
      let data = JSON.stringify(res, undefined, 2);
      let blob = new Blob([data], { type: "application/json" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;

      // filename = linkin-backup-date.json
      let filename = `linkin-backup-${new Date()
        .toISOString()
        .slice(0, 16)
        .replace(":", "-")}.json`;
      a.download = filename; // set filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // avoid memory leaks
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBackup = async (event) => {
    event.preventDefault();

    let file = document.getElementById("backup").files[0];
    if (!file) return toast.error(`No file selected`, { autoClose: 5000 });

    let confirm = await Swal.fire({
      title: "Restore Data",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Restore data",
    });

    if (!confirm.isConfirmed) return;

    let fr = new FileReader();

    fr.onload = async function () {
      const dataJson = JSON.parse(fr.result);

      await fetch(`${endpoint}/api/user/backup`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(dataJson),
      })
        .then(() => location.reload()) // reload for getting restored page data
        .catch((err) => toast.error(`${err.message}`, { autoClose: 10000 }));
    };

    fr.readAsText(file);
  };

  return (
    <>
      <h3>Backup and Restore data</h3>
      <div className="mb-3 form-control">
        <h5>Backup</h5>
        <button
          className={`btn btn-secondary d-inline mb-3`}
          onClick={getBackup}
        >
          Download Backup
        </button>
        <form>
          <label htmlFor="backup">
            <h5>Restore data from file</h5>
          </label>
          <input
            type="file"
            accept="application/json"
            className="form-control mb-2"
            id="backup"
          />
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleBackup}
          >
            Restore Data
          </button>
        </form>
      </div>
    </>
  );
};

export default BackupComponent;
