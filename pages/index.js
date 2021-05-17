import Head from "next/head";

import LinkinTheBioPage from "../components/home";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

console.log(endpoint);
export async function getServerSideProps() {
  let data;
  try {
    // data = await fetch(`https://linkin-xi.vercel.app/api/view`).then((res) =>
    data = await fetch(`${endpoint}/api/view`).then((res) => res.json());

    console.log("nexttt");

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }

  return { props: { data } };
}

export default function Home({ data }) {
  return <LinkinTheBioPage {...data} />;
}
