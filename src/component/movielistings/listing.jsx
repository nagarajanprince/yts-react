import React, { useState, useEffect, Fragment } from 'react'

import { fetcYtsMovies } from "../../api/api"
import Listitem from "../moviesitem/listitem"
import Loading from "../layout/loading"


const Listing = ({ searchdata,getMovideid,filterData }) => {

  const [moviedata, setytsmovie] = useState(null);
  if(searchdata){
    filterData = ''
  }if(filterData){
    searchdata = ''
  }
  
  useEffect(() => {
    const apiData = async () => {
      setytsmovie(await fetcYtsMovies(searchdata,filterData));
    }
    apiData();
  }, [searchdata,filterData])

  if (!moviedata) return <Loading/>
  return (
    moviedata ?
      <Fragment>
        <Listitem moviedata={moviedata} getMovideid={getMovideid} />
      </Fragment>

      : null
  )
}

export default Listing
