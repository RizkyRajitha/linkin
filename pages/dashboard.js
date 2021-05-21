import { useState } from "react";

import { getPageData } from "../lib/dbfunc";
import { cookieValidate } from "../middleware/middleware";
import Home from "../components/linkinthebiopage";
import Formwrapper from "../components/formwrapper";
import Head from "next/head";

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
      <Head>
        {" "}
        <title> {`Linkin Dashboard`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:description" content={`Linkin Dashboard`} />
        <meta name="og:site_name" content="Linkin" />
        <meta name="og:title" content={`Linkin Dashboard`} />
      </Head>
      <div className="d-flex dashboardwrapepr">
        <Formwrapper
          pageData={pageData}
          linkData={linkData}
          updatedPageData={updatedPageData}
          updatedLinkData={updatedLinkData}
        />
        <div className="preview">
          <Home
            {...pageData}
            linkData={linkData.filter((ele) => ele.active)}
            preview
          />
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
