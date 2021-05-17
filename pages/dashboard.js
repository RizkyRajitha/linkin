import { useState } from "react";

import { getPageData } from "../lib/dbfunc";
import { cookieValidate } from "../middleware/middleware";
import Home from "../components/linkinthebiopage";
import Formwrapper from "../components/formwrapper";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

export async function getServerSideProps({ req, res }) {
  try {
    let valid = cookieValidate(req, res);
    let data;
    if (valid) {
      data = await getPageData();
    }
    console.log(data);
    return { props: { data } };
  } catch (error) {
    return { props: { error } };
  }
}

const Admin = ({ data }) => {
  const [showmsg, setshowmsg] = useState("");
  const [loading, setloading] = useState(false);
  const [pageData, setpageData] = useState(data);

  const save = async (data) => {
    setloading(true);
    setshowmsg("");
    console.log(data);
    // let prePageData = { ...pageData };

    // let keys = Object.keys(data);

    // keys.map((item) => {
    //   prePageData[item] = data[item];
    // });

    // console.log(prePageData);

    try {
      let res = await fetch(`${endpoint}/api/updatepagedata`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        if (res.message === "invalid_credential") {
          setshowmsg("User creadentials are not valid");
        } else {
          setshowmsg("Server Error");
        }
        return;
      }
      setloading(false);

      console.log(res);
      setshowmsg("updated");
      setpageData(res.updatedPageData);
    } catch (error) {
      setloading(false);
      console.log(error);
      setshowmsg("Server Error " + error.message);
    }
  };

  //TODO : add live update
  const update = (data) => {
    // console.log(data);
    save(data);
  };

  return (
    <>
      <div className="d-flex">
        <Formwrapper
          data={pageData}
          update={update}
          loading={loading}
          showmsg={showmsg}
        />
        <div className="w-50">
          <Home {...pageData} preview={true} />
        </div>
      </div>
    </>
  );
};
export default Admin;
