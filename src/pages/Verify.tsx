import { Fragment, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { API_HOST } from "../index";
import LoadingScreen from "../Components/LoadingScreen";
import css from "../styles/verify.module.scss";
import general from "../styles/general.module.scss";
import lottie from "lottie-web";

const TimedRedirect = (props: { href: string; verified: boolean }) => {
  const { href, verified } = props;
  let [num, setNum] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (num <= 0) {
      return navigate(href);
    }
    const id = setInterval(() => setNum(num - 1), 1000);
    return () => clearInterval(id);
  }, [num, href, navigate]);

  return verified ? (
    <p>Du wirst in {num}s zum Dashboard weitergeleitet</p>
  ) : (
    <p>Du wirst in {num}s zurückgeleitet</p>
  );
};

const Verify = () => {
  const { code } = useParams();

  const [verified, setVerified] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const successRef = useRef(null);
  const failureRef = useRef(null);

  useEffect(() => {
    fetch(`${API_HOST}/user/verify?code=${code}`, { credentials: "include" })
      .then((res) => {
        setLoaded(true);
        if (res.ok) {
          setVerified(true);
        }
      })
      .catch((e) => {
        setLoaded(true);
        setVerified(false);
      });
  }, [code]);

  useEffect(() => {
    lottie.destroy();
    if (successRef.current) {
      lottie.loadAnimation({
        container: successRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../assets/animations/success.json"),
      });
    }
    if (failureRef.current) {
      lottie.loadAnimation({
        container: failureRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../assets/animations/failure.json"),
      });
    }
  });

  return (
    <div id={css.container} className={general["weird-shadow"]}>
      {!loaded ? (
        <LoadingScreen loaded={loaded} />
      ) : (
        <Fragment>
          {verified ? (
            <Fragment>
              <h1>Erfolgreich verifiziert!</h1>
              <TimedRedirect href="/dashboard" verified={true} />
            </Fragment>
          ) : (
            <Fragment>
              <h1>Das hat nicht geklappt</h1>
              <TimedRedirect href="/" verified={false} />
            </Fragment>
          )}
          {verified ? (
            <div ref={successRef} id={css["animation-container"]}></div>
          ) : (
            <div ref={failureRef} id={css["animation-container"]}></div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Verify;
