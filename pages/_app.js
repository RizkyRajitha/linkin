import "../styles/global.css";
import "../styles/boostrap.min.css";
import { StateProvider } from "../components/context/state";

export default function App({ Component, pageProps }) {
  const initialState = {
    theme: { primary: "green" },
    links: [],
  };

  const reducer = (state, action) => {
    console.log("reducre");
    console.log(state);
    console.log(action);
    switch (action.type) {
      case "changeTheme":
        return {
          ...state,
          links: action.linkdata,
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
