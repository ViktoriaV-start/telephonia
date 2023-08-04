import React, {useEffect, useRef} from 'react';
// import classes from "./Modal.module.scss";

import './modal.css';
import { EditForm } from '../Form/EditForm';

export const Modal = props => {
    if (!props.show) { 
        return null
    }

   return (
        <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
            <h4 className="modal-title"></h4>
        </div>
        <div className="modal-body">
            <EditForm manager={props.manager.el} token={props.token} onClose={props.onClose}/>
        </div>
        <div className="modal-footer">
        </div>
        </div>
    </div>
   )
}
