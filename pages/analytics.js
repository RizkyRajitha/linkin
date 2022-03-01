import Head from "next/head";
import LinkinTheBioPage from "../components/linktree";
import { getPageDatawLinkAndSocialData } from "../lib/dbfuncprisma";

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
        linkDataSS: data.linkData,
        socialDataSS: data.socialData,
      },
    };
  } catch (error) {
    // console.log(error);
    return { props: { error: error.message } };
  }
}
export default function Analytics({ pageData, linkData, socialData }) {
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
