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
      // the filename you want
      a.download = "linkin-backup.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBackup = async (event) => {
    event.preventDefault();
    let data = document.getElementById("backup").files[0];

    let fr = new FileReader();
    fr.onload = async function () {
      const a = JSON.parse(fr.result);

      await fetch(`${endpoint}/api/user/backup`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(a),
      })
        .then(location.reload()) // reload for getting restored page data
        .catch((err) => console.log(err.message));
    };

    if (data) fr.readAsText(data);
  };

  return (
    <>
      <h4>Backup and Restore data</h4>
      <div className="mb-3 ">
        <button className={`btn btn-secondary`} onClick={getBackup}>
          Download Backup
        </button>
        <form>
          <label htmlFor="backup">Restore data from file</label>
          <input type="file" className="form-control" id="backup" />
          <button
            type="submit"
            className="btn btn-primary"
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
