import { useEffect, useState } from "react";

export default function Alert({ msg, type = "danger" }) {
  const [msgstate, setmsg] = useState(msg);

  useEffect(() => {
    setTimeout(() => {
      setmsg(false);
      //   msg = false;
      console.log("alert ", msg);
    }, 10000);
  }, [msg]);
  console.log("alert ", msg, type);
  return (
    <div className="mt-4 ">
      <div hidden={!msgstate} className={`text-center alert alert-${type}`}>
        {msgstate}
      </div>
    </div>
  );
}
