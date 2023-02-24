import { useState } from "react"
import Modal from "../../shared/Modal";
import ReactLoading from 'react-loading';

export default function HomeModal({ closeModel,inputvalue,setTitlefun,title, showmodale, taskArray, setTitle, getinputfun, pushfunc,addTofirebase ,showLoading}) {
  
  return (<>
    {showmodale && <Modal closeModel={closeModel}>
      <input onChange={(e) => {
        setTitlefun(e)
      }} type="text" className="my-5" required value={title}/>
      <div className="d-flex-row">
        <input onChange={(e) => {
          getinputfun(e)
        }} type="text" className="mb-2" required value={inputvalue}/>
        <button onClick={(e) => {
          pushfunc(e)
        }} className="btn btn-primary small">add</button>
      </div>
      <ul>
        {taskArray.map((ele) => 
           <li key={ele}>{ele}</li>
        )}
      </ul>
      <button onClick={(e) => {
        e.preventDefault();
        addTofirebase()
      }} className="btn btn-primary" type="submit">
          {showLoading && <ReactLoading type={"spin"} color={"red"} height={20} width={20} />}
          {!showLoading && "add task"}
        </button>
    </Modal>}
  </>)
}