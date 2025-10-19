import { useState } from "react";
import SideBar from "../Sidebar/SideBar";
import './Dashboard.css'

export default function Dashboard() {
    const [tab, setTab] = useState(1);

    return (
        <>
            <SideBar />

            <div className="layout-dashboard">
                <header className="header">
                    <div className="header__wrapper">
                        <div className="header__text">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="header__category">
                            <div className="category__text">
                                <h2>Category</h2>
                            </div>
                            <div className="category__lists">
                                <div className="category__list__assets">
                                    <p className="assets__text">Assets</p>
                                    <hr />
                                    <p>Total</p>
                                </div>
                                <div className="category__list__licences">
                                    <p className="licences__text">Licences</p>
                                    <hr />
                                    <p>Total</p>
                                </div>
                                <div className="category__list__accessories">
                                    <p className="accessories__text">Accessories</p>
                                    <hr />
                                    <p>Total</p>
                                </div>
                                <div className="category__list__components">
                                    <p className="components__text">Components</p>
                                    <hr />
                                    <p>Total</p>
                                </div>
                                <div className="category__list__users">
                                    <p className="users__text">Users</p>
                                    <hr />
                                    <p>Total</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="section-dashboard">
                    <div className="dashboard__wrapper">
                        <div className="dashboard__tabs">
                            <div className="tabs__activity" onClick={() => setTab(1)}>Activity</div>
                            <div className="tabs__second" onClick={() => setTab(2)}>Second</div>
                            <div className="tabs__three" onClick={() => setTab(3)}>Three</div>
                            <div className="tabs__four" onClick={() => setTab(4)}>Four</div>
                        </div>
                        <hr />
                        <div className="dashboard__content">
                            {tab === 1 && (<>1</>) || tab === 2 && (<>2</>) || tab === 3 && (<>3</>) || tab == 4 && (<>4</>)}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}