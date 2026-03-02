import style from "./Integration.module.scss";
import settings from "./../../../assets/settings.svg"
import { useState } from "react";

function Integration() {
    const [integrations, setIntegrations] = useState(false);
    console.log(integrations)
    
    return (
        <div className={style.section__wrapper}>

            <div className={style.section__header}>
                <div className={style.section__text}>
                    <h2>Integration</h2>
                    <p>Connect the apps you use to your account.</p>
                </div>
            </div>

            <div className={style.integration}>

                <div className={style.integration__item}>
                    <div>
                        <div className={style.integration__info}>
                            <div className={style.integration__name}>AD</div>
                        </div>
                    </div>
                    <div 
                    className={style.integration__actions}>
                        <div className={style.integration__configurate}>
                            <div className={style.configurate__icon}>
                                <img src={settings}/>
                            </div>
                            <div className={style.configurate__text}>
                                Manage
                            </div>
                        </div>
                        
                        <div className={style.background__slider}>
                            <label className={style.integration__control}>
                                <input
                                    // checked={integrations}
                                    className={style.integration__checkbox}
                                    type="checkbox"
                                    // onChange={(e) => setIntegrations(e.target.checked)}
                                    />
                                    <span className={style.slider}></span>
                            </label>
                        </div>
                    </div>

                </div>

                <div className={style.integration__item}>
                    <div className={style.integration__info}>
                        <div className={style.integration__name}>Keycloak</div>
                    </div>

                    <div className={style.integration__actions}>
                        <div className={style.integration__configurate}>
                            <div className={style.configurate__icon}>
                                <img src={settings}/>
                            </div>
                            <div className={style.configurate__text}>
                                Manage
                            </div>
                        </div>
                        
                        <div className={style.background__slider}>
                            <label className={style.integration__control}>
                                <input
                                    checked={integrations}
                                    className={style.integration__checkbox}
                                    type="checkbox"
                                    onChange={(e) => setIntegrations(e.target.checked)}
                                    />
                                    <span className={style.slider}></span>
                            </label>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default Integration;