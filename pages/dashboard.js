import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { getPageData } from "../lib/dbfunc";
import { cookieValidate } from "../middleware/middleware";

// import styles from "../styles/dashboard.module.css";
import Home from "./homeview";

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
    return { props: { data } };
  } catch (error) {
    return { props: { error } };
  }
}

const Admin = ({ data }) => {
  const router = useRouter();

  const [showmsg, setshowmsg] = useState("");
  const [loading, setloading] = useState(false);
  const [pageData, setpageData] = useState(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: data });

  let imageUrl = watch(["avatarUrl"]);

  // watch((data, { name, type }) => {
  //   console.log(data, name, type);

  //   let prePageData = { ...pageData };

  //   let keys = Object.keys(data);

  //   keys.map((x) => {
  //     prePageData[x] = data[x];
  //   });

  //   setpageData(prePageData);
  // });

  // const watchAllFields = watch();

  // useEffect(() => {
  // let prePageData = { ...pageData };

  // let keys = Object.keys(watchAllFields);

  // keys.map((x) => {
  //   prePageData[x] = watchAllFields[x];
  // });

  // setpageData(prePageData);
  // }, [watchAllFields]);

  // useWatch();

  // form;

  const save = async (data) => {
    setloading(true);
    setshowmsg("");
    console.log(data);
    let prePageData = { ...pageData };

    let keys = Object.keys(data);

    keys.map((item) => {
      prePageData[item] = data[item];
    });

    console.log(prePageData);

    try {
      let res = await fetch(`${endpoint}/api/updatepagedata`, {
        method: "POST",
        body: JSON.stringify(prePageData),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        if (res.message === "invalid_credential") {
          setshowmsg("User creadentials are not valid");
        } else {
          setshowmsg("Server Error");
        }
        return;
      }
      setloading(false);

      console.log(res);
      // setshowmsg("updated");
      setpageData(res.updatedPageData);
    } catch (error) {
      setloading(false);
      console.log(error);
      setshowmsg("Server Error " + error.message);
    }
  };

  return (
    <>
      <div className="d-flex">
        {/* <div className={styles.Wrapper}> */}
        <Formwrapper data={data} />
        <Home {...pageData} />
        {/* </div> */}
      </div>
    </>
  );
};
export default Admin;
