import "../styles/message.css";

import { CiFaceSmile, CiFaceFrown, CiFaceMeh } from "react-icons/ci";

const Message = ({ emotion, name, time, content, title }) => {
  let icon;
  let messageClass = title === "AGENT" ? "message own" : "message";
  let titleClass = title === "AGENT" ? "titlee-agent" : "titlee";

  switch (emotion) {
    case "POSITIVE":
      icon = <CiFaceSmile className="icon green" />;
      break;
    case "NEGATIVE":
      icon = <CiFaceFrown className="icon red" />;
      break;
    case "NEUTRAL":
      icon = <CiFaceMeh className="icon blue" />;
      break;
    default:
      icon = <CiFaceMeh className="icon" />;
  }

  return (
    <section>
      <p className={titleClass}>{name + " " + time}</p>
      <div className={messageClass}>
        {icon}
        <div className="texts">
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
};

export default Message;