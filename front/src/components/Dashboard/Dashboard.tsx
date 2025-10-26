import { useState } from "react";
import SideBar from "../Sidebar/SideBar";
import './Dashboard.css'

export default function Dashboard() {
    const [tab, setTab] = useState(1);

    return (
        <>
            <SideBar />
<<<<<<< HEAD

=======
>>>>>>> afbca29 (refactor: rename classes to follow BEM convention)
            <div className="layout">
                <header className="header">
                    <div className="header__wrapper">
                        <div className="header__text">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="category">
                            <div className="category__title">
                                <h2>Category</h2>
                            </div>
<<<<<<< HEAD


=======
>>>>>>> afbca29 (refactor: rename classes to follow BEM convention)
                            <div className="category__list">
                                <div className="category-item category-item--assets">
                                    <p className="category-item__title">Assets</p>
                                    <hr className="category-item__line" />
                                    <p className="category-item__total">Total</p>
                                </div>
<<<<<<< HEAD

=======
>>>>>>> afbca29 (refactor: rename classes to follow BEM convention)
                                <div className="category-item category-item--licence">
                                    <p className="category-item__title">Licences</p>
                                    <hr className="category-item__line"/>
                                    <p className="category-item__total">Total</p>
                                </div>
<<<<<<< HEAD
                                
=======
>>>>>>> afbca29 (refactor: rename classes to follow BEM convention)
                                <div className="category-item category-item--accessories">
                                    <p className="category-item__title">Accessories</p>
                                    <hr className="category-item__line"/>
                                    <p className="category-item__total">Total</p>
                                </div>
<<<<<<< HEAD
                                
=======
>>>>>>> afbca29 (refactor: rename classes to follow BEM convention)
                                <div className="category-item category-item--components">
                                    <p className="category-item__title">Components</p>
                                    <hr className="category-item__line"/>
                                    <p className="category-item__total">Total</p>
                                </div>
<<<<<<< HEAD
                                
=======
>>>>>>> afbca29 (refactor: rename classes to follow BEM convention)
                                <div className="category-item category__item--users">
                                    <p className="category-item__title">Users</p>
                                    <hr className="category-item__line"/>
                                    <p className="category-item__total">Total</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </header>
<<<<<<< HEAD

=======
>>>>>>> afbca29 (refactor: rename classes to follow BEM convention)
                <section className="dashboard">
                    <div className="dashboard__wrapper">
                        <div className="tabs">
                            <div className="tabs__activity" onClick={() => setTab(1)}>Activity</div>
                            <div className="tabs__second" onClick={() => setTab(2)}>Second</div>
                            <div className="tabs__three" onClick={() => setTab(3)}>Three</div>
                            <div className="tabs__four" onClick={() => setTab(4)}>Four</div>
                        </div>
                        <hr />
                        <div className="content">
                            {tab === 1 && (<>1</>) || tab === 2 && (<>2</>) || tab === 3 && (<>3</>) || tab == 4 && (<>4</>)}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}