import style from "./Integration.module.scss";
import settings from "./../../../assets/settings.svg"
import { useState } from "react";
import SideDrawer from "../../ui/SideDrawer/SideDrawer";
import { toggleIntegrateAD, toggleIntegrateKeycloak } from "../../../features/counter/integrateSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch } from "../../../app/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";

function Integration() {
    const [integrations, setIntegrations] = useState(false);
    console.log(integrations)
    
    const { data: settingsData, isLoading } = useQuery({
        queryKey: ["settings", "integration"],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/settings/integration')
            if (!res.ok) throw new Error("Failed to fetch settings")
            return res.json()
        }
    })

    const { data, isError, mutate } = useMutation({
        mutationKey: ["settings", "integration"],
        mutationFn: async (data) => {
            const res = await fetch(`http://localhost:3000/settings/integration/${Object.keys(data)[0]}`, {
                "method": 'PATCH',
                body: JSON.stringify(data)
            })
            if (!res.ok) throw new Error("Failed to fetch settings")
            return await res.json()
        }
    })

    console.log(data)

    if (isLoading) return
    const { ad, keycloak } = settingsData.body[0].integration;

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
                                <img src={settings} />
                            </div>
                            <div className={style.configurate__text}>
                                Manage
                            </div>
                        </div>

                        <div className={style.background__slider}>
                            <label className={style.integration__control}>
                                <input
                                    checked={ad}
                                    className={style.integration__checkbox}
                                    type="checkbox"
                                    onChange={(e) => mutate({ "query": e.target.checked })}
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
                                <img src={settings} />
                            </div>
                            <div className={style.configurate__text}>
                                Manage
                            </div>
                        </div>

                        <div className={style.background__slider}>
                            <label className={style.integration__control}>
                                <input
                                    checked={keycloak}
                                    className={style.integration__checkbox}
                                    type="checkbox"
                                    onChange={(e) => mutate({ "keycloak": e.target.checked })}
                                />
                                <span className={style.slider}></span>
                            </label>
                        </div>
                    </div>
                </div>

            </div>
            <SideDrawer
                open={open}
                onClose={onclose}
                title={'t'}
                children={'t'}
                actions={
                    <>
                        <button>Cancel</button>
                        <button>Connect</button>
                    </>
                }
            />

        </div>
    )

}

export default Integration;