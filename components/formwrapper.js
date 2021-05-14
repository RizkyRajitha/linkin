import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

import GenaralForm from "./genaralform";

import styles from "../styles/formwrapper.module.css";

import { useRouter } from "next/router";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

function Formwrapper({ data }) {
  const router = useRouter();

  const logout = async () => {
    try {
      let res = await fetch(`${endpoint}/api/logout`).then((res) => res.json());
      console.log(res);

      if (res.success) {
        router.push("/admin");
      }
    } catch (error) {
      setshowmsg("Logout Error " + error.message);
    }
  };

  return (
    <>
      <div className={styles.dashform}>
        <div className="d-flex justify-content-end">
          {" "}
          <button
            className={`btn btn-primary logout-btn ${styles.logoutbtn}`}
            onClick={() => logout()}
          >
            {" "}
            logout
          </button>
        </div>

        <div className="container">
          <Tabs>
            <TabList>
              <Tab>Genaral Data</Tab>
              <Tab>Title 2</Tab>
            </TabList>

            <TabPanel>
              <GenaralForm data={data} />
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
          </Tabs>{" "}
          {/* <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Active
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              1
            </div>
          </div> */}
        </div>

        {/* <DataForm data={data} /> */}
      </div>
    </>
  );
}

export default Formwrapper;
