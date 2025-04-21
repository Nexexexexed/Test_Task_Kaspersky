import { useState } from "react";

import { IData_SnippetNews } from "../interfaces/interfaces";

import "./Element.scss";

import image_chevrone from "/favicons/chevron-down.svg";

import Header from "./Header";
import Source from "./Source";

const Element: React.FC<{ data: IData_SnippetNews }> = ({ data }) => {
  const [expandedHighlights, setExpandedHighlights] = useState(false);
  const [expandedKeywords, setExpandedKeywords] = useState(false);

  const displayedKeywords = expandedKeywords
    ? [...data.KW].sort((a, b) => b.count - a.count)
    : [...data.KW].sort((a, b) => b.count - a.count).slice(0, 3);

  const displayedHighlights = expandedHighlights
    ? data.HIGHLIGHTS
    : data.HIGHLIGHTS.slice(0, 1);

  return (
    <div className="news-snippet">
      <Header data={data} />
      <h2 className="news-title">{data.TI}</h2>
      <Source data={data} />

      <div className="highlights">
        {displayedHighlights.map((highlight, index) => (
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
        {data.HIGHLIGHTS.length > 1 && (
          <button
            className="show-more"
            onClick={() => setExpandedHighlights(!expandedHighlights)}
          >
            {expandedHighlights ? "Show less ▲" : "Show more ▼"}
          </button>
        )}
      </div>

      <div className="keywords-section">
        <div className="keywords-list">
          {displayedKeywords.map((kw, index) => (
            <div key={index} className="keyword-item">
              <p className="keyword">{kw.value}</p>
              <p className="count">{kw.count}</p>
            </div>
          ))}
          {data.KW.length > 3 && (
            <button
              className="show-all"
              onClick={() => setExpandedKeywords(!expandedKeywords)}
            >
              {expandedKeywords
                ? "Show less"
                : `Show All +${data.KW.length - 3}`}
            </button>
          )}
        </div>
        <a href={data.URL} className="original-source">
          Original Source
        </a>
        <div className="duplicates">
          <div>
            Duplicates: <strong>{data.DUPL}</strong>
          </div>
          <div className="relevance">
            By Relevance <img className="image_chevrone" src={image_chevrone} />
          </div>
        </div>
      </div>
      <div className="main_news">
        <Header data={data} />
        <h2 className="news-title">{data.TI}</h2>
        <Source data={data} />
      </div>
      <button className="button_view">
        <img className="image_chevrone" src={image_chevrone} /> View Duplicates
      </button>
    </div>
  );
};

export default Element;
