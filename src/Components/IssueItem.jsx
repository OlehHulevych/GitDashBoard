import React from 'react'
import {DndProvider, useDrag, useDrop} from "react-dnd"

export default function IssueItem({item, id}) {
  const updateFunction = (value) =>{
    if(value ===1){
      return `Last opened yesterday`
    }
    else if(value===0){
      return `Last opened today`
    }
    else{
      return `Last opened ${value} days ago`
    }
  }
  
  const [{isDragging}, drag] = useDrag({
   item:item,
   type:"item",
   collect:(monitor)=>({
     isDragging:monitor.isDragging()
   })
  })

  
  return (
    <div ref={drag} className="issue_item">
        <div className="name_issue">{item.name}</div>
        <div className="open_status">{updateFunction(item.lastOpened)}</div>
        <div className="issue_information">
        <div className="author_issue">{item.author} | </div>
        <div className="comment_count">{item.comments}</div>
        </div>
     </div> 
  )
}
