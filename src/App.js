import axios from "axios";
import React, { useState } from "react";
import { Vortex } from "react-loader-spinner";

function SearchResult({ result }) {
  const sortedResults = result.result_qdrant?.sort((a, b) => b.Score - a.Score);

  return (
    <section
      class="
          all-question-area
          bg-disable
          pt-100
          pb-120
          d-flex
          justify-content-center
        "
    >
      <div class="container">
        <div class="row">
          {sortedResults?.map((res, index) => (
            <div class="col-xl-7 ps-xxl-7">
              <div key={index} class="all-question-widget-2 ps-xl-3">
                <div class="widget-content">
                  <div class="single-question-widget-2">
                    <a href={res.source}>
                      <h6>{res.titre}</h6>
                    </a>
                    <div class="user-ans">
                      <div class="answer">Reference : {res.La_loi}</div>
                    </div>
                    <p>{res.Paragraphe}</p>
                    <div class="d-flex align-items-center justify-content-between">
                      <a class="read-more" href={res.source}>
                        Read more
                      </a>
                      <a class="action_btn btn_small_two" href="#">
                        <i class="icon_pencil"></i> Answer
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://aymanemalih-qdrant-flask.hf.space/chat",
        {
          messages: [{ role: "user", content: query }],
        }
      );
      console.log("response: ", response);

      setResults(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="banner-area-3 has_search">
        <div className="banner-shapes">
          <div className="shape">
            <img
              data-parallax='{"x": -60, "y": 0}'
              src="img/home_two/banner-shape-1.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": -20, "y": 0}'
              src="img/home_two/banner-shape-2.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": 60, "y": 0}'
              src="img/home_two/banner-shape-3.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": 40, "y": 0}'
              src="img/home_two/banner-shape-4.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": 200, "y": 90, "rotateY":700}'
              src="img/home_two/banner-shape-5.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": 200, "y": 70, "rotateZ":700}'
              src="img/home_two/banner-shape-6.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": -150, "y": 90, "rotateZ":0}'
              src="img/home_two/banner-shape-7.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": -200, "y": 90, "rotateX":700}'
              src="img/home_two/banner-shape-8.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": -150, "y": 90, "rotateZ":0}'
              src="img/home_two/banner-shape-9.png"
              alt="shape"
            />
          </div>
          <div className="shape">
            <img
              data-parallax='{"x": -200, "y": 70, "rotateX":700}'
              src="img/home_two/banner-shape-10.png"
              alt="shape"
            />
          </div>
        </div>
        <div className="container">
          <div className="row doc_banner_content">
            <div className="col-12 px-0">
              <h1 className="banner-title-h1">Welcome to MFI Support Center</h1>
              <p className="banner-text-p">
                Meet other Ama users like you. Get answers & discover new ways
                to use Ama.
              </p>
            </div>
            <div className="col-lg-8 mx-auto">
              <div className="banner-search-box mt-40">
                <form action="#">
                  <div className="input-wrapper">
                    <input
                      placeholder="Search your forum of topic here..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      type="search"
                      id="searchbox"
                      autocomplete="off"
                      name="search"
                    />
                    <button
                      type="submit"
                      className="search-btn"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading indicator */}
      {loading && (
        <div className="d-flex justify-content-center">
          <Vortex height="200" width="200" />
        </div>
      )}

      {/* Display search results */}
      {results && <SearchResult result={results} />}
    </>
  );
}

export default App;
