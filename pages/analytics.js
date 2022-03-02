import Head from "next/head";
import Dynmic from "next/dynamic";
import LinkinTheBioPage from "../components/linktree";
import { getPageDatawLinkAndSocialData } from "../lib/dbfuncprisma";
import Table from "../components/analytics/table";
import BarDiagram from "../components/analytics/bar";
import MetricsBar from "../components/analytics/metricsbar";

export async function getServerSideProps({ req, res }) {
  try {
    let valid = cookieValidate(req, res);
    let data;
    if (valid) {
      data = await getPageDatawLinkAndSocialData();
    }
    return {
      props: {
        pageDataSS: data.pageData,
      },
    };
  } catch (error) {
    // console.log(error);
    return { props: { error: error.message } };
  }
}

const MyPie = Dynmic(() => import("../components/analytics/bar"), {
  ssr: false,
});

export default function Analytics({ pageData, linkData, socialData }) {
  return (
    <>
      {/* <Head>
        <title> {`${pageData.handlerText}'s Link tree Page`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="og:description"
          content={`${pageData.handlerText}'s Link tree Page`}
        />
        <meta name="og:site_name" content={pageData.handlerText} />
        <meta
          name="og:title"
          content={`${pageData.handlerText}'s Link tree Page`}
        />
        <meta name="og:image" content={pageData.avatarUrl} />
      </Head> */}
      <div className="container">
        <div className="d-flex justify-content-center mt-2">
          <h2>Analytics</h2>
        </div>
        <div className="">
          <MetricsBar />
        </div>
        <div className="h-25">
          <MyPie />
        </div>
        <div className="d-flex justify-content-evenly">
          <Table name="Refrees" />
          <Table name="Buttons" />
        </div>
      </div>
    </>
  );
}
