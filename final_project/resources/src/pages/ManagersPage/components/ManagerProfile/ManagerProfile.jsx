import React, {useState, useEffect} from 'react';
import classes from "./ManagerProfile.module.scss";
import { Modal } from '../Modal/index';

export const ManagerProfile = ({ adminData, token }) => {
  const el = adminData;
  const [show, setShow] = useState(false);
  const [manager, setManager] = useState({});

  const setManagerToModal = (elem) => {
    setShow(true);
    setManager(elem);
  };

  return (
    <>
      <tr key={adminData.id} className={classes.table__tr}>
        <td key={adminData.id} className={classes.table__data}>{adminData.id}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.first_name}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.surname}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.email}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.phone}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.agent_id}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.manager_id}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.role}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.status}</td>
        <td key={adminData.id} className={classes.table__data}>{adminData.created_at}</td>
        <td key={adminData.id} className={classes.table__data}>
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
    </>
  );
};
