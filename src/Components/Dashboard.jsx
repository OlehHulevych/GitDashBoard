import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {DndProvider, useDrag, useDrop} from "react-dnd"
import {HTML5Backend} from 'react-dnd-html5-backend'
import Column from './Column'
import IssueItem from './IssueItem'


export default function Dashboard() {
  
  const repository = useSelector(state => state.repo.currentRepo)
  const issues_repo = repository['issuesData']
  const [issues, setIssues] = useState([])
  useEffect(()=> setIssues(issues_repo), [issues_repo])
  const sortedIssues = (array, title) => {
    const items = array && array.filter(issue => issue.columnTitle === title)
    return items
  }

  
  return (
        <main>
          <div className="app_row row text-center mx-auto">
          <DndProvider backend={HTML5Backend}>
            <Column setIssues= {setIssues} id ={1} title ={"To do"} items = {sortedIssues(issues, "To do")}/>
            <Column setIssues= {setIssues} id = {2} title ={"Doing"} items = {sortedIssues(issues, "Doing")}/>
            <Column setIssues= {setIssues} id = {3} title = {"Done"} items = {sortedIssues(issues, "Done")}/>
         </DndProvider>  
          </div>
        </main>
  )
}
