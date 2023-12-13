import React from "react";
import "./css/reset.css";
import { Search, Filter, Listings, Detail } from "./component";
import style from "./component/layout.module.css";

import { fetchYtsData } from "./api/api";

class App extends React.Component {
  state = {
    search: "",
    movieid: null,
    filterdata: "",
    commondata: "",
  };
  onSearch = (data) => {
    this.setState({
      search: data,
    });
  };

  getMovideid = (data) => {
    this.setState({
      movieid: data,
    });
  };
  closedetails = () => {
    this.setState({
      movieid: "",
    });
  };
  suggestId = (data) => {
    this.setState({
      movieid: data,
    });
  };
  getfilterid = (data) => {
    this.setState({
      filterdata: data,
    });
  };
  async componentDidMount() {
    this.setState({
      commondata: await fetchYtsData(),
    });
  }
  render() {
    const { search, movieid, filterdata, commondata } = this.state;
    return (
      <div className={style.container + " " + (movieid ? "stopscroll" : "")}>
        <div className={style.search}>
          <Search onSearch={this.onSearch} total={commondata.movie_count} />
        </div>
        <div className={style.filter}>
          <Filter setFilter={this.getfilterid} />
        </div>
        <div className={style.listings}>
          <Listings
            searchdata={search}
            getMovideid={this.getMovideid}
            filterData={filterdata}
          />
        </div>
        <Detail
          movieid={movieid}
          closedetails={this.closedetails}
          suggestId={this.suggestId}
        />
      </div>
    );
  }
}

export default App;
