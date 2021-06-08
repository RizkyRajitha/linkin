// import { useEffect, useState } from "react";

export default function Alert({ msg, type = "danger" }) {
  // const [msgstate, setmsg] = useState(msg);

  // console.log("alert ", msg, type);
  return (
    <div className="mt-4">
      <div hidden={!msg} className={`text-center alert alert-${type}`}>
        {msg}
      </div>
    </div>
  );
}
