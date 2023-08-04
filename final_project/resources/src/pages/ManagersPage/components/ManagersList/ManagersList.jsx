import React, {useState} from 'react';
import classes from "./ManagersList.module.scss";
import { Modal } from '../Modal/index';

export const ManagersList = ({ data, token }) => {
  const [show, setShow] = useState(false);
  const [manager, setManager] = useState({});

  const setManagerToModal = (elem) => {
    setShow(true);
    setManager(elem);
  };
  const createdAt = (createdAt) => {
      const dateTimeString = createdAt;
      const dateTime = new Date(dateTimeString);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return(date + ' ' + time);
  }
  return (
    <>
      {data.map((el) => (
        <tr key={el.id} className={classes.table__tr}>
          <td key={el.id} className={classes.table__data}>{el.id}</td>
          <td key={el.id} className={classes.table__data}>{el.first_name}</td>
          <td key={el.id} className={classes.table__data}>{el.surname}</td>
          <td key={el.id} className={classes.table__data}>{el.email}</td>
          <td key={el.id} className={classes.table__data}>{el.phone}</td>
          <td key={el.id} className={classes.table__data}>{el.agent_id}</td>
          <td key={el.id} className={classes.table__data}>{el.manager_id}</td>
          <td key={el.id} className={classes.table__data}>{el.role}</td>
          <td key={el.id} className={classes.table__data}>{el.status}</td>
          <td key={el.id} className={classes.table__data}>{createdAt(el.created_at)}</td>
          <td key={el.id} className={classes.table__data}>
            <Modal onClose={() => setShow(false)}
                  show={show}
                  manager={manager}
                  token={token}
            />
            <button className={classes.admin__btn} onClick={setManagerToModal.bind(null, {el})}>
            Edit
            </button>
          </td>
        </tr>
       ))}
    </>
  );
};
