import { IData_SnippetNews } from "../interfaces/interfaces";
import "./Element.scss";
import image_info from "/favicons/info.svg";
import image_square from "/favicons/square.svg";
import image_lang from "/favicons/book_lang.svg";
import image_author from "/favicons/author.svg";

const Element: React.FC<{ data: IData_SnippetNews }> = ({ data }) => {
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

  const topKeywords = [...data.KW]
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const countryCode = data.CNTR_CODE?.toLowerCase();
  const flagUrl = `https://flagcdn.com/24x18/${countryCode}.png`;

  return (
    <div className="news-snippet">
      <div className="snippet-header">
        <div className="left-header">
          <strong className="date">{formatDate(data.DP)}</strong>
          <p>
            <strong className="reach">{formatNumber(data.REACH)} </strong>Reach
          </p>

          <span className="traffic-title">Top Traffic: </span>
          {data.TRAFFIC.slice(0, 3).map((country, index) => (
            <p>
              {country.value}:
              <strong key={index} className="traffic-item">
                {(country.count * 100).toFixed(0)}%{index < 2 ? " " : ""}
              </strong>
            </p>
          ))}
        </div>
        <div className="right-header">
          <span className={`sent ${data.SENT}`}>
            {data.SENT[0].toUpperCase() + data.SENT.slice(1)}
          </span>
          <img className="image_header" src={image_info} alt="Info" />
          <img className="image_header scale" src={image_square} alt="Expand" />
        </div>
      </div>

      <h2 className="news-title">{data.TI}</h2>

      <div className="news-source">
        <div className="domain_block">
          <img className="fav_ico" src={data.FAV}></img>
          <a href={data.DOM} className="domain">
            {data.DOM.slice(12)}
          </a>
        </div>

        <div className="country">
          <img src={flagUrl} alt={data.CNTR} />
          <span>{data.CNTR}</span>
        </div>
        <div className="language_block">
          <img className="language_image" src={image_lang}></img>
          <span className="language">{data.LANG.toUpperCase()}</span>
        </div>
        <div className="authors_block">
          <img src={image_author} className="author_image"></img>
          {data.AU.length > 0 && (
            <span className="authors">{data.AU.join(", ")} et al.</span> //доработать чтобы et al добавлялось если больше 3 человек и  писалось 3
          )}
        </div>
      </div>

      <div className="highlights">
        {data.HIGHLIGHTS.slice(0, data.HIGHLIGHTS.length).map(
          (highlight, index) => (
            <p
              key={index}
              className="highlight"
              dangerouslySetInnerHTML={{
                __html: highlight
                  .replace(/<kw>/g, "<strong>")
                  .replace(/<\/kw>/g, "</strong>"),
              }}
            />
          )
        )}
        <a href={data.URL} className="show-more">
          Show more
        </a>
      </div>

      <div className="keywords-section">
        <div className="keywords-list">
          {topKeywords.map((kw, index) => (
            <div key={index} className="keyword-item">
              <strong className="keyword">{kw.value}</strong>
              <strong className="count">{kw.count}</strong>
            </div>
          ))}
          <button className="show-all">Show All +{data.KW.length - 3}</button>
        </div>
      </div>
    </div>
  );
};

export default Element;
