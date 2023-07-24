import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrashCan, faSort } from '@fortawesome/free-solid-svg-icons'
import Form from './Form'
import "./Todolist.css"

const initialData = {
  task: "",
  Assignee: "",
  Completed: false,
  Priority: "",
  DateAssigned: new Date()
}

function Todolist() {
  const [showModal, setshowModal] = useState(false)
  const [selectedItem, setselectedItem] = useState(initialData)
  const [allData, setallData] = useState([])
  const [showSort, setShowsort] = useState(false)

  useEffect(() => {
    getDataFromLocalStorage();
  }, [showModal]);

  const handleClick = (e) => {
    e.stopPropagation();

    setshowModal(true);
  }

  const priorityOrder = { "Urgent": 1, "Need to Do": 2, "EOD": 3 }

  const sortData = (data, field) => {
    if (field === "Priority") {
      data.sort((a, b) => priorityOrder[a.Priority] - priorityOrder[b.Priority])
    }
    else {
      data.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] < b[field]) {
          return 1;
        }
        return 0;
      })
    }
    console.log(field, data)
    setallData(data)
    setShowsort(false)
  }


  const getDataFromLocalStorage = () => {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const d = JSON.parse(localStorage.getItem(key))

      if (typeof d === 'object' && d !== null) {
        data.push({ id: key, ...d })
      }
    }
    sortData(data, 'Priority')
    setallData(data)

  }
  const handleEdit = (e, data) => {
    e.stopPropagation();
    setselectedItem(data);
    setshowModal(true);
  }
  const handleDelete = (id) => {
    localStorage.removeItem(id)
    setselectedItem(initialData)
    const updatedData = allData.filter((data) => data.id !== id);
    setallData(updatedData);
  }

  return (
    <>
      <div className='main-div'>
        <div className="child-div">
          <p>Feeling confused...</p>
          <p>Make your day organised here</p>
          <div className='addItems'>
            <input type="text" placeholder='add your tasks here' value={selectedItem.task} onChange={(e) =>
              setselectedItem((prevSelectedItem) => ({
                ...prevSelectedItem,
                task: e.target.value,
              }))
            }></input>
            <FontAwesomeIcon icon={faPlus} size="lg" className='add-btn' onClick={handleClick} />
          </div>

          <div className='showItems'>
            <div className='sort-dropdown'>
              <FontAwesomeIcon icon={faSort} onClick={() => (setShowsort(!showSort))} className='sort-btn' />
              {showSort && (
                <div className='dropdown-content'>
                  <div onClick={() => sortData(allData, 'Priority')}>Priority</div>
                  <div onClick={() => sortData(allData, 'task')}>Task</div>
                  <div onClick={() => sortData(allData, 'DateAssigned')}>Date</div>
                  <div onClick={() => sortData(allData, 'Assignee')}>Assignee</div>
                </div>
              )}
            </div>
            <br></br>

            <div className="header-item">
              <p className="header-item-cell">Task</p>
              <p className="header-item-cell">Assignee</p>
              <p className="header-item-cell">Completed</p>
              <p className="header-item-cell">Priority</p>
              <p className="header-item-cell">Date Assigned</p>
              <div className="actions-cell"></div>
            </div>

            {allData &&
              allData.map((data) => (
                <div className="each-item" id={data.id}>
                  <p className="each-item-cell">{data.task}</p>
                  <p className="each-item-cell">{data.Assignee}</p>
                  <p className="each-item-cell">{data.Completed}</p>
                  <p className="each-item-cell">{data.Priority}</p>
                  <p className="each-item-cell">{data.DateAssigned}</p>
                  <div className="actions-cell">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={(e) => handleEdit(e, data)}
                      className="edit-btn"
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(data.id)}
                      className="delete-btn"
                    />
                  </div>
                </div>
              ))}





          </div>
          <Form showModal={showModal} setshowModal={setshowModal} selectedItem={selectedItem} setselectedItem={setselectedItem} />
        </div>

      </div>
    </>
  )
}

export default Todolist