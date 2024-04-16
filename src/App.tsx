import { useEffect, useState } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "./App.css";

// firebase
import { auth, database } from "./firebase/config";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { onValue, ref, set } from "firebase/database";

// import animation on scroll
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [sessLike, setSessLike] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [alreadyLikePopUp, setAlreadyLikePopUp] = useState<boolean>(false);

  useEffect(() => {
    AOS.init();
    onAuthStateChanged(auth, (user) => {
      if (user) return setLiked(true);
    });

    onValue(ref(database, "/count"), (snapshot) => setCount(snapshot.val()));
  }, []);

  const likeClicked = () => {
    if (liked) {
      setAlreadyLikePopUp(true);
      setTimeout(() => {
        setAlreadyLikePopUp(false);
      }, 1500);
    }

    let likeCount: number = count;
    onAuthStateChanged(auth, (user) => {
      if (user) return setLiked(true);
      signInWithEmailAndPassword(
        auth,
        "9d5eb1ea981e881ff7e9@mail.com",
        "i1ab6a99142d6ad01dnf"
      ).then(() => console.log("Liked!"));
      set(ref(database, "/count"), likeCount + 1);
      setSessLike(true);
      setLiked(true);
      setTimeout(() => {
        setSessLike(false);
      }, 100);
    });
  };

  // createUserWithEmailAndPassword(auth, '9d5eb1ea981e881ff7e9@mail.com', 'i1ab6a99142d6ad01dnf').then(() => console.log('haloo'))

  return (
    <BrowserRouter>
      {count > 0 ? (
        <div data-aos="fade" data-aos-duration="800" className="h-[100vh]">
          <div
            className={`${
              alreadyLikePopUp ? "top-[0px]" : "top-[-70px]"
            } transition-all absolute w-full text-center mt-8`}
          >
            <span className="bg-green-400 rounded-lg font-monot border-2 border-black text-black p-3">
              You are already like it!
            </span>
          </div>
          <div className="w-full overflow-hidden h-[100%] ">
            {/* <p onClick={() => {signOut(auth)}}>logout</p> */}
            {liked ? (
              <h1 className="text-white text-[42px] font-bold font-mono mt-10 mb-16">
                Like this page.
              </h1>
            ) : (
              <h1 className="text-white text-[42px] font-bold font-mono mt-10 mb-16">
                Like this page.
              </h1>
            )}
            <button
              className={`${
                sessLike ? "scale-[1.2]" : ""
              } transition-all w-full flex justify-center`}
              onClick={likeClicked}
            >
              <svg
                width="110"
                height="110"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.95"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 10V20H17.3604C18.3138 20 19.1346 19.3271 19.3216 18.3922L20.5216 12.3922C20.7691 11.1547 19.8225 10 18.5604 10H14L16.4258 6.36138C17.1929 5.2106 16.5885 3.64714 15.2467 3.31169L15.1992 3.2998C14.4642 3.11607 13.6886 3.36333 13.1956 3.9385L8 10Z"
                  fill={`${liked ? "rgb(255, 98, 90)" : "rgb(36, 36, 36)"}`}
                />
                <path
                  opacity={"0.95"}
                  d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"
                  stroke={`${liked ? "rgb(0, 0, 0)" : "#ffffff"}`}
                  fill={`${liked ? "rgb(90, 98, 255)" : ""}`}
                  strokeWidth="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="card">
              <h2 className="text-white opacity-55">
                {count} people already like it.
              </h2>
            </div>

            <footer className="absolute m-auto w-full bottom-[100px] left-0">
              <p className="read-the-docs mb-1">
                Like this page for no reason.
              </p>
              <p className="read-the-docs">
                You can also edit this page on{" "}
                <Link
                  target="_blank"
                  className="text-blue-400"
                  to="https://github.com/gettingdev/Just-like-this-page"
                >
                  GitHub🚀
                </Link>
              </p>
            </footer>
          </div>
        </div>
      ) : (
        <></>
      )}
    </BrowserRouter>
  );
}

export default App;
