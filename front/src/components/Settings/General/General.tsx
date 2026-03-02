import style from "./General.module.scss"

function General() {
    return (
        <section className={style.section}>
            <div className={style.section__wrapper}>
                <form className={style.form}>
                    <div className={style.form__field}>
                        <label className={style.field__label}>Name brand</label>
                        <span className={style.field__span}>Changes will update all URL`s</span>
                        <input className={style.field__input} type="text" />
                    </div>
                    <div className={style.form__field}>
                        <label className={style.field__label}>System address</label>
                        <span className={style.field__span}>A detailed explanation of how to navigate the interface seamleassly</span>
                        <input className={style.field__input} type="text" />
                    </div>
                    <div className={style.form__field}>
                        <label className={style.field__label}>Time zone</label>
                        <select className={style.field__select} name="" id="">
                            <option className={style.field__option} value="">Russian</option>
                            <option className={style.field__option} value="">English</option>
                        </select>
                    </div>
                    <div className={style.form__field}>
                        <label className={style.field__label}>
                            <span className={style.field__span}>An introduction to upcoming features and enchancements</span>
                            <input hidden className={style.field__input} type="file"/>
                        </label>
                    </div>
                    <div className={style.form__submit}>
                        <input className={style.submit} type="submit" value="Update"/>
                    </div>
                </form>
            </div>            
        </section>
    )
}

export default General;