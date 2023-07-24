import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./Form.css"
const initialData = {
  task: "",
  Assignee: "",
  Completed: false,
  Priority: "",
  DateAssigned: new Date()
}
const Form = ({ showModal, setshowModal, selectedItem, setselectedItem }) => {

  const max = new Date().toISOString().split('T')[0];
  const [formdata, setformdata] = useState(initialData);
  const formRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault();
    setformDatatoLocalStorage(formdata)
    setselectedItem(initialData)
    setformdata(initialData);
    setshowModal(false);
  }
  const setformDatatoLocalStorage = (formdata) => {
    if (selectedItem.id) {
      localStorage.setItem(selectedItem.id, JSON.stringify(formdata))
    }
    else {
      const uniqueId = uuidv4();
      localStorage.setItem(uniqueId, JSON.stringify(formdata))
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value })
  }
  const handleCloseModal = (e) => {
    if (!formRef.current || !formRef.current.contains(e.target) || e.key === 'Escape') {
      setshowModal(false);
    }
  }

  useEffect(() => {
    if (showModal) {
      document.addEventListener('click', handleCloseModal)
      document.addEventListener('keydown', handleCloseModal)
    }
    else {
      document.removeEventListener('click', handleCloseModal);
      document.removeEventListener('keydown', handleCloseModal);
    }
    return () => {
      document.removeEventListener('click', handleCloseModal)
      document.removeEventListener('keydown', handleCloseModal)
    }
  }, [showModal])

  useEffect(() => {
    if (showModal) {
      if (selectedItem) {
        const { id, ...dataToSave } = selectedItem
        setformdata(dataToSave)
      }
      else {
        setformdata(initialData)
      }
    }
  }, [showModal])



  return (
    <>
      {showModal && (
        <div className='modal1'>
          <div className='modal-form' ref={formRef}>
            <div className='form-header'>
              <p>Enter the details of the task </p>
              <span className="close" onClick={() => setshowModal(false)}>
              &times;
            </span>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label>Task :</label>
                <input
                  type="text"
                  name="task"
                  value={formdata.task}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label>Assignee :</label>
                <input
                  type="text"
                  name="Assignee"
                  value={formdata.Assignee}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label>Completed :</label>
                <select
                  name="Completed"
                  value={formdata.Completed}
                  onChange={handleInputChange}
                >
                  <option value="">Status</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="form-field">
                <label>Priority :</label>
                <select
                  name="Priority"
                  value={formdata.Priority}
                  onChange={handleInputChange}
                >
                  <option value="">Priority</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Need to Do">Need to do</option>
                  <option value="EOD">EOD</option>
                </select>
              </div>
              <div className="form-field">
                <label for="datemax">Date Assigned: </label>
                <input type="date" max={max}

                  name="DateAssigned"
                  value={formdata.DateAssigned}
                  onChange={handleInputChange}
                />
              </div>
              <button onSubmit={handleSubmit} >Submit</button>
            </form>



          </div>
        </div>
      )


      }
    </>
  )
}

export default Form