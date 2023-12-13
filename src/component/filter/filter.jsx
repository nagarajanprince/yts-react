import React from 'react'
import style from "./filter.module.css"
import data from "./filterjson.json"
const Filter = ({setFilter}) => {
    return (
   
           <div className={style.filterlist}>
              <h4>Year</h4>
                 <ul>
                   {data.year.map((data) => <li key={data} onClick={() => setFilter(data)}>{data}</li>
                   )}                   
               </ul>
                <h4>Genre</h4>
                <ul>
                {data.genre.map((data) =>  <li key={data} onClick={() => setFilter(data)}>{data}</li>
                   )}  
                </ul>
           </div>
    )
}

export default Filter
