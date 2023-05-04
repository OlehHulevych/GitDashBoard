import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { get } from 'lodash'
import {useDispatch, useSelector} from "react-redux"
import Repo_Information from './Repo_Information'

const handleRepoIssues = async(repoUrl)=>{
  try{
    const url = new URL(repoUrl)
    const author = url.pathname.split('/')[1]
    const repo = url.pathname.split('/')[2]
    const response = await axios.get(`https://api.github.com/repos/${author}/${repo}/issues`)
    console.log("Work")
    return response.data 
  }
  catch(error){
    console.log(error)
  }
}

const getRepoInformation = async(repoUrl) =>{
  try{
    const url = new URL(repoUrl)
    const author = url.pathname.split('/')[1]
    const repo = url.pathname.split('/')[2]
    const response = await axios.get(`https://api.github.com/repos/${author}/${repo}`)
    console.log("Data work")
    return response.data
  }
  catch(error){
    console.log(error)
  }
}


function Header() {
  const [repoUrl, setRepoUrl] = useState('')
  const [repoInfo, setRepoInfo] = useState(null)
  const [repoObj, setRepoObj] = useState({})

  const repositories = useSelector(state=> state.repo.repositories)
  

  const dispatch = useDispatch()

  const handleFetchRepo = async() =>{
    const fetchedIssues = await handleRepoIssues(repoUrl)
    const fetchedRepoInfo = await getRepoInformation(repoUrl)
    
    setRepoInfo(fetchedRepoInfo)
    const issues = fetchedIssues.map((issue, index) => ({
      id:index,
      name:issue.title,
      columnTitle:"To do",
      author:issue.user.login,
      lastOpened: Math.round((new Date() - new Date(issue.updated_at)) / (1000 * 60 * 60 * 24)),
      comments:issue.comments.length
    })) 
    

    

    const repo = {
      id:repositories.length,
      name:fetchedRepoInfo.name,
      author:fetchedRepoInfo.owner.login,
      ratings:fetchedRepoInfo.stargazers_count,
      'issuesData':issues,
    }

   

    
    const index = repositories.findIndex(el => el.name === repo.name)
    if(index === -1){
      dispatch({type:"ADD_REPOSITORY", payload:repo})
      dispatch({type:"CURRENT_REPO", payload:repo})
    }
    else{
      dispatch({type:"CURRENT_REPO", payload:repositories[index]})
    }
    setRepoObj({})
    setRepoInfo(null)
    console.log("Done")
    
  }
  



  

  return (
    <header>
    <div className='header_inner text-center'>
      <input className='git_input col-md-8 col-sm-8 col-xs-8' value={repoUrl} type="text" onChange={(e) => setRepoUrl(e.target.value)} placeholder='type url git repository' />{' '}
      <button onClick={handleFetchRepo} className='git_btn col-md-2 col-sm-2 col-xs-2'>Get issues</button>
    </div>
    <Repo_Information/>
  </header>
  )
}

export default Header