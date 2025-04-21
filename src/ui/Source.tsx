import { IData_SnippetNews } from "../interfaces/interfaces";

import "./Source.scss";

import image_lang from "/favicons/book_lang.svg";
import image_author from "/favicons/author.svg";

const Source: React.FC<{ data: IData_SnippetNews }> = ({ data }) => {
  const countryCode = data.CNTR_CODE?.toLowerCase();
  const flagUrl = `https://flagcdn.com/24x18/${countryCode}.png`;

  const formatAuthors = (authors: string[]) => {
    if (authors.length <= 3) {
      return authors.join(", ");
    }
    return `${authors.slice(0, 3).join(", ")} et al.`;
  };
  return (
    <div className="news-source">
      <div className="domain_block">
        <img className="fav_ico" src={data.FAV} alt="Favicon"></img>
        <a href={data.DOM} className="domain">
          {data.DOM.slice(12)}
        </a>
      </div>

      <div className="country">
        <img src={flagUrl} alt={data.CNTR} />
        <span>{data.CNTR}</span>
      </div>
      <div className="language_block">
        <img className="language_image" src={image_lang} alt="Language"></img>
        <span className="language">{data.LANG.toUpperCase()}</span>
      </div>
      <div className="authors_block">
        <img src={image_author} className="author_image" alt="Author"></img>
        {data.AU.length > 0 && (
          <span className="authors">{formatAuthors(data.AU)}</span>
        )}
      </div>
    </div>
  );
};

export default Source;
