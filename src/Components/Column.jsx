import React from 'react'
import {DndProvider, useDrag, useDrop} from "react-dnd"
import IssueItem from './IssueItem.jsx'
import {useSelector ,useDispatch} from 'react-redux'

export default function Column({setIssues, items, title}) {
  const dispatch = useDispatch()
  const currentRepo = useSelector(state=> state.repo.currentRepo)
  const [{isOver}, drop] = useDrop({
    accept:"item",
    drop:(item) =>{
      setIssues((prevItems)=>{
        const newState = [...prevItems]
        const index = newState.findIndex((i)=>i.id===item.id)
        
        if (index !== -1) { 
          newState[index].columnTitle = title;
        }
        
        
        dispatch({type:"UPDATE_REPO", payload:{id:currentRepo.id, updatedIssues:newState, propertyName:'issuesData'}})
        
        return newState;
      })
    }
  })
  return (
    <div ref={drop} className="git_column col-md-3">
        <div className="name_section">{title}</div>
            <div className="issues_section">
                {items && items.map(el=>
                    <IssueItem id={el.id}  item ={el} key={el.id}/>
                )}
            </div>
    </div>
  )
}
