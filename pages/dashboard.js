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
    return { props: { pageDataSS: data.pageData, linkDataSS: data.linkData } };
  } catch (error) {
    return { props: { error } };
  }
}

const Admin = ({ pageDataSS, linkDataSS }) => {
  const [pageData, setpageData] = useState(pageDataSS);
  const [linkData, setlinkData] = useState(linkDataSS);
  console.log(pageDataSS);

  //TODO : add live update
  const updatedPageData = (data) => {
    console.log(data);
    // save(data);
    setpageData(data.pageData);
  };

  const updatedLinkData = (data) => {
    console.log(data);
    // save(data);
    setlinkData(data);
  };

  return (
    <>
      <div className="d-flex dashboardwrapepr">
        <Formwrapper
          pageData={pageData}
          linkData={linkData}
          updatedPageData={updatedPageData}
          updatedLinkData={updatedLinkData}
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
