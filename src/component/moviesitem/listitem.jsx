import React from 'react'
import style from "./listitem.module.css"

const Listitems = ({ moviedata,getMovideid }) => {
  
    const dataitem = moviedata.map((data) => {
        return (
            <div className={style.item} key={data.id} id={data.id} onClick={() => getMovideid(data.id)}>
                <figure>
                    <img src={data.medium_cover_image} alt={data.title} />
                </figure>
                <div className={style.info}>
                    <h1>{data.title}</h1>
                    <div className={style.short}>                        
                        <span>Year: {data.year}</span>
                        <span>Rate: {data.rating}/10</span>
                    </div>
                </div>
            </div>)
    })

    return (
        <React.Fragment>
            {dataitem}
        </React.Fragment>
    )
}

export default Listitems
