import style from "./Integration.module.scss";

function Integration() {
    return (
        <div className={style.section__wrapper}>
            <div className={style.section__header}>
                <div className={style.section__text}>
                    <h2>Integration</h2>
                    <p>Connect the apps you use to your account.</p>
                </div>
            </div>
            <div>
                <div>
                    <div>AD</div>
                    <div><input type="checkbox" /></div>
                </div>
                <div>
                    <div>Keycloak</div>
                    <div>
                        <input type="checkbox" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Integration;