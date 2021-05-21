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
  const [pageData, setpageData] = useState(data);
  const [linkData, setlinkData] = useState(linkDataSS);
  console.log(data);

  //TODO : add live update
  const update = (data) => {
    console.log(data);
    // save(data);
    setpageData(data.pageData);
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
