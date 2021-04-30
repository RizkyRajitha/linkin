import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";

export async function getServerSideProps() {
  let data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  let jsondata = await data.json();
  console.log(jsondata);
  // const allPostsData = getSortedPostsData();
  return { props: { data: [jsondata] } };
}

const FirstPost = ({ data }) => {
  return (
    <>
      <Layout>
        <Head>
          <title>First post</title>
        </Head>
        <h1>First post</h1>
        <h2>
          <Link href="/">
            <a>back to home</a>
          </Link>
        </h2>

        {data.map((element) => {
          return (
            <>
              <p>{element.id}</p>
              <p>{element.title}</p>
              <p>{element.completed}</p>
            </>
          );
        })}
      </Layout>
    </>
  );
};
export default FirstPost;
