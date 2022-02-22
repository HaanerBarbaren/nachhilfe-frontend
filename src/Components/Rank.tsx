import { AuthLevel } from "../Models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import general from "../styles/general.module.scss";

export function Rank(props: { authLevel?: AuthLevel }) {
  const { authLevel } = props;
  return (
    <div style={{ display: "inline-flex", gap: "0.3rem" }}>
      {(authLevel || 0) > 0 ? (
        <FontAwesomeIcon icon={faCheckCircle} className={general.icon} />
      ) : null}
      {(authLevel || 0) === AuthLevel.Admin ? (
        <FontAwesomeIcon icon={faStar} className={general.icon} />
      ) : null}
    </div>
  );
}
