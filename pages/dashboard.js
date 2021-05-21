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
    return { props: { data: data.pageData, linkDataSS: data.linkData } };
  } catch (error) {
    return { props: { error } };
  }
}

const Admin = ({ data, linkDataSS }) => {
  const [showmsg, setshowmsg] = useState("");
  const [showmsgtype, setshowmsgtype] = useState("danger");

  const [loading, setloading] = useState(false);
  const [pageData, setpageData] = useState(data);
  const [linkData, setlinkData] = useState(linkDataSS);
  console.log(data);
  const save = async (data) => {
    setloading(true);
    setshowmsg("");
    setshowmsgtype("");
    console.log(data);

    try {
      let res = await fetch(`${endpoint}/api/updatepagedata`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        setshowmsgtype("danger");
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
      setshowmsgtype("success");
      setpageData(res.updatedPageData);
    } catch (error) {
      setloading(false);
      console.log(error);
      setshowmsgtype("danger");
      setshowmsg("Server Error " + error.message);
    }
  };

  //TODO : add live update
  const update = (data) => {
    // console.log(data);
    save(data);
  };

  const updateLinks = (data) => {
    console.log(data);
    // save(data);
  };

  return (
    <>
      <div className="d-flex dashboardwrapepr">
        <Formwrapper
          data={pageData}
          linkData={linkData}
          update={update}
          updateLinks={updateLinks}
          loading={loading}
          showmsg={showmsg}
          showmsgtype={showmsgtype}
        />
        <div className="preview">
          <Home {...pageData} preview={true} />
        </div>
      </div>
      <style jsx>{`
        .preview {
          width: 50vw;
        }

        @media (max-width: 768px) {
          .dashboardwrapepr {
            flex-direction: column;
          }
          .preview {
            width: 100vw;
          }
        }
      `}</style>
    </>
  );
};
export default Admin;
