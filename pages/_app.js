import "../styles/global.css";
import "../styles/boostrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { StateProvider } from "../components/context/state";

export default function App({ Component, pageProps }) {
  const initialState = {
    links: [],
    socialLinks: [],
  };

  const reducer = (state, action) => {
    // console.log("reducre");
    // console.log(state);
    // console.log(action);
    switch (action.type) {
      case "updateLink":
        return {
          ...state,
          links: action.linkdata,
        };

      case "updateSocial":
        return {
          ...state,
          socialLinks: action.socialdata,
        };

      case "deleteLink":
        // console.log(state.links.filter((ele) => ele.id != action.id));
        return {
          ...state,
          links: state.links.filter((ele) => ele.id != action.id),
        };

      case "deleteSocial":
        return {
          ...state,
          socialLinks: state.socialLinks.filter((ele) => ele.id != action.id),
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}
