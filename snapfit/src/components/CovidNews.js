import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Axios from "axios";

function CovidNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const style = {
    height: "20rem"
  };
  const options = {
    method: "GET",
    url: "https://coronavirus-smartable.p.rapidapi.com/news/v1/US/",
    headers: { "x-rapidapi-key": "c3080fb81fmshd3d1c99e923f897p19babfjsn829989476e27", "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com" }
  };

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const res = await Axios.request(options);
      if (res) {
        console.log(res.data.news);
        setNews(res.data.news);
      } else {
        console.log("no news");
      }
      setLoading(false);
    };
    getNews();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center align-content-center pt-2">
        <h3>Covid-19 News</h3>
      </div>
      <div style={style} className="shadow mt-1 px-1 overflow-auto">
        <ul>
          {news.map((aNews) => {
            return (
              <li>
                <Button block href={aNews.webUrl} target="_blank" variant="light">
                  <div className="d-flex justify-content-start">{aNews.title}</div>
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CovidNews;

/*  {news.maps((aNews) => {
            return (
              <li>
                <a src={aNews.webUrl}>{aNews.title}</a>
              </li>
            );
          })} */