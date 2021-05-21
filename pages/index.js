import Head from "next/head";
import LinkinTheBioPage from "../components/linkinthebiopage";
import { getPageData } from "../lib/dbfunc";

// console.log(endpoint);
export async function getServerSideProps() {
  let data;
  try {
    // data = await fetch(`https://linkin-xi.vercel.app/api/view`).then((res) =>
    //    data = await fetch(`${endpoint}/api/view`).then((res) => res.json());
    data = await getPageData(false);
    console.log("nexttt");

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }

  return { props: { pageData: data.pageData, linkData: data.linkData } };
}

export default function Home({ pageData, linkData }) {
  return (
    <>
      <Head>
        {" "}
        <title> {`${pageData.handlerText}'s Link In The Bio Page`}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="og:description"
          content={`${pageData.handlerText}'s Link In The Bio Page`}
        />
        <meta name="og:site_name" content={pageData.handlerText} />
        <meta
          name="og:title"
          content={`${pageData.handlerText}'s Link In The Bio Page`}
        />
        <meta name="og:image" content={pageData.avatarUrl} />
      </Head>

      <LinkinTheBioPage {...pageData} linkData={linkData} />
    </>
  );
}
