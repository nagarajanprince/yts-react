import React,{useState} from 'react'
import style from "../search/search.module.css"

const Search = (props) => {  
    const[searchdata,setsearchdata]=useState('')

    const handelchange = (e) =>{
        setsearchdata(e.target.value)
    }
    const onformsubmit=(event)=>{
        props.onSearch(searchdata)
        event.preventDefault();
    }
    return (
        <div className={style.searchwrap}>
            <form onSubmit={onformsubmit}>
            <input type="text" placeholder="Search Movies..." onChange={handelchange}/>
            </form>
    <span className={style.count}>Total Movies : <i>{props.total}</i></span>
        </div>
    )
}

export default Search
