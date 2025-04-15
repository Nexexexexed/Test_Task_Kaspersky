import { IData_SnippetNews } from "../interfaces/interfaces";
import "./Element.scss";

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

  const countryCode = data.CNTR_CODE?.toLowerCase(); // fr, us и т.д.
  const flagUrl = `https://flagcdn.com/24x18/${countryCode}.png`;

  return (
    <div className="news-snippet">
      <div className="snippet-header">
        <span className="date">{formatDate(data.DP)}</span>
        <span className="reach">{formatNumber(data.REACH)} Reach</span>
        <div className="traffic-section">
          <h3 className="traffic-title">Top Traffic</h3>
          <div className="traffic-list">
            {data.TRAFFIC.slice(0, 3).map((country, index) => (
              <div key={index} className="traffic-item">
                <span className="country">{country.value}</span>
                <span className="percentage">
                  {(country.count * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="news-title">{data.TI}</h2>

      <div className="news-source">
        <span className="domain">{data.DOM}</span>

        <div className="country">
          <div>
            <img src={flagUrl} />
          </div>
          <span>{data.CNTR}</span>
        </div>
        <div>{data.LANG.toUpperCase()}</div>
        {data.AU.length > 0 && (
          <span className="authors">{data.AU.join(", ")}</span>
        )}
      </div>

      <div className="highlights">
        {data.HIGHLIGHTS.slice(0, 2).map((highlight, index) => (
          <p
            key={index}
            className="highlight"
            dangerouslySetInnerHTML={{
              __html: highlight
                .replace(/<kw>/g, "<strong>")
                .replace(/<\/kw>/g, "</strong>"),
            }}
          />
        ))}
        <button className="show-more">Show more</button>
      </div>

      <div className="keywords-section">
        <h3 className="keywords-title">Keywords</h3>
        <div className="keywords-list">
          {topKeywords.map((kw, index) => (
            <div key={index} className="keyword-item">
              <span className="keyword">{kw.value}</span>
              <span className="count">{kw.count}</span>
            </div>
          ))}
          <button className="show-all">Show All</button>
        </div>
      </div>
    </div>
  );
};

export default Element;
