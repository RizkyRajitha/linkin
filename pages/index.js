import Head from "next/head";
import LinkinTheBioPage from "../components/linkinthebiopage";
import { getPageDatawLinkData } from "../lib/dbfuncprisma";

export async function getServerSideProps() {
  let data;
  //console.log(process.env);
  try {
    data = await getPageDatawLinkData(false);
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }

  return { props: { pageData: data.pageData, linkData: data.linkData } };
}

export default function Home({ pageData, linkData }) {
  return (
    <>
      <Head>
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
      </Head>

      <LinkinTheBioPage {...pageData} linkData={linkData} />
    </>
  );
}
