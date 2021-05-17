import { useEffect, useState } from "react";

export default function Alert({ showmsg, type = "danger" }) {
  const [msg, setmsg] = useState(showmsg);

  useEffect(() => {
    setTimeout(() => {
      setmsg(false);
      //   showmsg = false;
      console.log("alert ", msg);
    }, 10000);
  }, [showmsg]);
  console.log("alert ", msg, type);
  return (
    <div className="mt-4 ">
      <div hidden={!msg} className={`text-center alert alert-${type}`}>
        {msg}
      </div>
    </div>
  );
}
