import React from 'react'
import {useSelector} from "react-redux"
import { FaStar } from "react-icons/fa";


export default function Repo_Information() {
    const repository = useSelector(state => state.repo.currentRepo)

    const handlerating = (num) =>{
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K': Math.sign(num)*Math.abs(num)
     
    }

  return (
    <div className="repo_information">
      {repository && <ul>
      <li><a href = {`https://github.com/${repository.author}/`} target ="_blank">{repository.author}</a></li>
      <li><a href = {`https://github.com/${repository.author}/${repository.name}`} target ="_blank">{repository.name}</a></li>
      <li>  <FaStar className = "rating_star"/> <a href = "#"> {handlerating(repository.ratings)} stars</a></li>
      </ul>}
    </div>
  )
}
