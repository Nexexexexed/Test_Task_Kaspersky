import { IData_SnippetNews } from "../interfaces/interfaces";

import "./Header.scss";

import image_info from "/favicons/info.svg";
import image_square from "/favicons/square.svg";

interface HeaderProps {
  data: IData_SnippetNews;
  format?: boolean;
}

const Header: React.FC<HeaderProps> = ({ data, format = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) {
      return `${Math.floor(num / 1_000_000)}M`;
    } else if (num >= 1_000) {
      return `${Math.floor(num / 1_000)}K`;
    } else {
      return num.toString();
    }
  };

  return (
    <div className="snippet-header">
      <div className="left-header">
        <strong className="date">{formatDate(data.DP)}</strong>
        <p>
          <strong className="reach">{formatNumber(data.REACH)} </strong>Reach
        </p>

        {!format && (
          <>
            <span className="traffic-title">Top Traffic: </span>
            {data.TRAFFIC.slice(0, 3).map((country, index) => (
              <p key={index}>
                {country.value}:
                <strong className="traffic-item">
                  {(country.count * 100).toFixed(0)}%{index < 2 ? " " : ""}
                </strong>
              </p>
            ))}
          </>
        )}
      </div>
      <div className="right-header">
        {!format && (
          <span className={`sent ${data.SENT}`}>
            {data.SENT[0].toUpperCase() + data.SENT.slice(1)}
          </span>
        )}
        <img className="image_header" src={image_info} alt="Info" />
        <img className="image_header" src={image_square} alt="Expand" />
      </div>
    </div>
  );
};

export default Header;
