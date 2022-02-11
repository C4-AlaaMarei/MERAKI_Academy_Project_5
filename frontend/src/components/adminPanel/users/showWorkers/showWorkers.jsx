/** @format */

import React, { useEffect, useState } from "react";
import Select from "react-select";
import PaginateReact from "react-paginate";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setWorkers, deleteWorkers } from "../../../../reducer/worker/index";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";

//===============================================================

const ShowWorkers = () => {
  const [message, setMessage] = useState("");
  const [id, setId] = useState();

  const dispatch = useDispatch();

  const { workers } = useSelector((state) => {
    return {
      workers: state.workerReducer.workers,
    };
  });

  //===============================================================

  const geAllWorker = async () => {
    try {
      const res = await axios.get("http://localhost:5000/worker");
      if (res.data.success) {
        dispatch(setWorkers(res.data.result));
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
    console.log(message);
  };
  //===============================================================
  console.log(workers);
  const deleteWorker = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/user/worker/${id}`);
      console.log(res);
      if (res.data.success) {
        setMessage(res.data.success);
        dispatch(deleteWorkers(id));
      } else {
        throw Error;
      }
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while deleting new data");
    }
  };
  //===============================================================
  useEffect(() => {
    geAllWorker();
  }, [id]);
  return (
    <div className="showUsers">
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th className="icon">Delete</th>
          </tr>
          {/* {workers.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>
                  <i>
                    <AiTwotoneDelete
                      onClick={() => {
                        setId(user.id);
                        deleteWorker(user.id);
                      }}
                      className="btn"
                    />
                  </i>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default ShowWorkers;
