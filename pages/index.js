import Head from "next/head";
import LinkinTheBioPage from "../components/linktree";
import { getPageDatawLinkAndSocialData } from "../lib/dbfuncprisma";

export async function getServerSideProps() {
  let data;
  // console.log(process.env.NODE_ENV);
  try {
    data = await getPageDatawLinkAndSocialData(false);
    // console.log(data);
  } catch (error) {
    console.log(error.message);
  }

  return {
    props: {
      pageData: data.pageData,
      linkData: data.linkData,
      socialData: data.socialData,
    },
  };
}

export default function Home({ pageData, linkData, socialData }) {
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

      <LinkinTheBioPage
        {...pageData}
        linkData={linkData}
        socialData={socialData}
      />
    </>
  );
}
