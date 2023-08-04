import classes from "./Title.module.scss";


export const Title = () => {

  return (
    <section className={classes.applications__wrap}>
      <header className={'admin__container' + ' ' + classes.applications__title}>
        <h1 className={classes.applications__header}>
          Администрирование - Добавить нового сотрудника
        </h1>
      </header>
    </section>
  )
};
