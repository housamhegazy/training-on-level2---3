import React, { useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Moment from "react-moment";
import { async } from "@firebase/util";
import { useTranslation } from "react-i18next";
export default function TaskSection({
  user,
  userId,
  checkboxFun,
  trashFun,
  addnewTaskFun,
  addtasksample,
  cancelAddTaskSampleFun,
  sendnewTaskTofireBaseFun,
  getinputvalue,
  inputvalue
}) {
  // const [checkbox,setcheckbox] = useState(false)
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  const { t, i18n } = useTranslation();
  if (value) {
    return (
      <section className="subtask-section w-50">
        <div className="info d-flex justify-content-between mt-5 mb-4">
          <div className="time">
            <Moment fromNow ago>
              {value.data().id}
            </Moment>
          </div>
          <div className="check d-flex">
            <input
              checked={value.data().completed}
              onChange={async (e) => {
                checkboxFun(e);
              }}
              id="checkbox"
              type="checkbox"
              name="completed"
            />
            <label htmlFor="checkbox" className="m-0">
              completed
            </label>
          </div>
        </div>
        <ul className="list-group ">
          {value.data().tasks.map((ele) => {
            return (
              <li
                dir="auto"
                key={ele}
                className="list-group-item d-flex justify-content-between my-2 py-0"
              >
                <p className="text-white">{ele}</p>
                <i
                  onClick={() => {
                    trashFun(ele);
                  }}
                  className="bi bi-trash fs-3"
                  role="button"
                ></i>
              </li>
            );
          })}
        </ul>
        {addtasksample && (
          <form className="addtask d-flex justify-content-start my-3">
            <input onChange={(e)=>{
              getinputvalue(e)
            }} type="text" className="form-control" value={inputvalue}/>
            <button
              onClick={(e) => {
                sendnewTaskTofireBaseFun(e);
              }}
              className="btn btn-primary mx-lg-2 mx-md-0"
              type="submit"
            >
              {t("add")}
            </button>
            <button
              onClick={(e) => {
                cancelAddTaskSampleFun(e);
              }}
              className="btn btn-danger mx-lg-2 mx-md-1"
            >
              {t("cancel")}
            </button>
          </form>
        )}
        <div className="add-more w-100 text-center my-2">
          <button
            onClick={() => {
              addnewTaskFun();
            }}
            className="btn btn-primary"
          >
            {t("add more")}
          </button>
        </div>
      </section>
    );
  }
}
