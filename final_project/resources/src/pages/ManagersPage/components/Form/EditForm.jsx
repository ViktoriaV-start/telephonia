import React, { useState, useEffect } from 'react';
import { useFetching } from "@/hooks/useFetching";
import { ManagersService } from '@/api/ManagersService';
import classes from "./EditForm.module.scss";

export const EditForm = ({ manager, token, onClose }) => {
  const [formData, setFormData] = useState(manager);
  const [errors, setErrors] = useState({});
  const [errorStatus, setErrorStatus] = useState(null);
  const [formFocus, setFormFocus] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormFocus(e.target);

    sendData();
  };

  const sendForm = () => {
    if(errorStatus === false) {
      formFocus.submit();
    }
  }

  const {
    fetching: sendData,
    isLoading: isLoading,
    error: errorData,
  } = useFetching(async () => {
    const data = await ManagersService.setManagerData(manager.id, token, formData);

    if(data.message) {
      setErrors({});
      setErrorStatus(false);
    }

    if(data.errors) {
      setErrors(data.errors);
      setErrorStatus(true);
    } 
  });

  useEffect(() => {
    if(Object.keys(errors).length !== 0) {
      setErrorStatus(true);
    }
    sendForm();
  }, [errors]);
  
  return (
    <>
     <section className={classes.form__wrap}>
        <div className={classes.user__container}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.form__group}>
              <label className={classes.form__label} htmlFor="first_name">Имя:</label>
              <input type="text"
                     className={classes.form__field}
                     id="first_name"
                     name="first_name"
                     value={formData.first_name}
                     onChange={handleInputChange}
                     required
              />
            </div>
            {errors.first_name && <div className={classes.form__error}>* {errors.first_name}</div>}
            <div className={classes.form__group}>
              <label className={classes.form__label} htmlFor="surname">Фамилия:</label>
              <input type="text"
                     className={classes.form__field}
                     id="surname"
                     name="surname"
                     value={formData.surname}
                     onChange={handleInputChange}
                     required
              />
            </div>
            {errors.surname && <div className={classes.form__error}>* {errors.surname}</div>}
            <div className={classes.form__group}>
              <label className={classes.form__label} htmlFor="email">Почта:</label>
              <input type="email"
                     className={classes.form__field}
                     id="email"
                     name="email"
                     value={formData.email}
                     onChange={handleInputChange}
                     required
              />
            </div>
            {errors.email && <div className={classes.form__error}>* {errors.email}</div>}
            <div className={classes.form__group}>
              <label className={classes.form__label} htmlFor="phone">Телефон:</label>
              <input type="phone"
                     className={classes.form__field}
                     id="phone"
                     name="phone"
                     value={formData.phone}
                     onChange={handleInputChange}
                     required
              />
            </div>
            {errors.phone && <div className={classes.form__error}>* {errors.phone}</div>}
            <div className={classes.form__group}>
              <label className={classes.form__label} htmlFor="agent_id">ID агента:</label>
              <input type="text"
                     className={classes.form__field}
                     id="agent_id"
                     name="agent_id"
                     value={formData.agent_id}
                     onChange={handleInputChange}
                     required
              />
            </div>
            {errors.agent_id && <div className={classes.form__error}>* {errors.agent_id}</div>}
            <div className={classes.form__group}>
              <label className={classes.form__label} htmlFor="manager_id">ID менеджера:</label>
              <input type="text"
                     className={classes.form__field}
                     id="manager_id"
                     name="manager_id"
                     value={formData.manager_id}
                     onChange={handleInputChange}
                    //  required
              />
            </div>
            {errors.manager_id && <div className={classes.form__error}>* {errors.manager_id}</div>}
            <div className={classes.form__group}>
              <label className={classes.form__label} htmlFor="role">Роль:</label>
              <input type="text"
                     className={classes.form__field}
                     id="role"
                     name="role"
                     value={formData.role}
                     onChange={handleInputChange}
                     required
              />
            </div>
            {errors.role && <div className={classes.form__error}>* {errors.role}</div>}
            <div className={classes.form__group}>
              <label className={classes.form__label} htmlFor="status">Статус:</label>
              <input type="text"
                     className={classes.form__field}
                     id="status"
                     name="status"
                     value={formData.status}
                     onChange={handleInputChange}
                     required
              />
            </div>
            {errors.status && <div className={classes.form__error}>* {errors.status}</div>}
            <button className={classes.form__button} type="submit">Отправить</button>
            <button className={classes.form__buttonCancel} onClick={onClose}>Отмена</button>
          </form>
        </div>
      </section>
    </>
  );
};
