import { useQuery, useQueryClient } from "@tanstack/react-query";
import style from "./../Dashboard.module.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Content() {
    const [tab, setTab] = useState(1);
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    

    const {data: licencesLength, isLoading: isLoadinglicences} = useQuery({
        queryKey: ["licences"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/licences/count", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const json = await res.json();
            return json;
        }
    })

    const {data: accessoriesLength, isLoading: isLoadingAccessories} = useQuery({
        queryKey: ["accessories"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/accessories/count", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const json = await res.json();
            return json;
        }
    })

    const {data: componentsLength, isLoading: isLoadingComponents} = useQuery({
        queryKey: ["components"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/components/count", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token') 
                }
            });
            const json = await res.json();
            return json;
        } 
    })

    const {data: usersLength, isLoading: isLoadingUsers} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/users/count", {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const json = await res.json();
            return json;
        }
    })

    const {data: assetsLength, isLoading: isLoadingAssets} = useQuery({
        queryKey: ["assets"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/assets/count", {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const json = await res.json();
            return json;
        }
    })

    if (isLoadingAssets 
        && isLoadinglicences
        && isLoadingAccessories
        && isLoadingComponents
        && isLoadingUsers
    
    ) return <div>Loading</div>

    return (
        <div className={style.content}>
            <header className={style.header}>
                <div className={style.header__wrapper}>
                    <div className={style.header__text}>
                        <h1>Dashboard</h1>
                    </div>
                    <div className={style.category}>
                        <div className={style.category__title}>
                            <h2>Category</h2>
                        </div>
                        <div className={style.category__list}>
                            <div className={`${style['category-item']} ${style['category-item--assets']}`} onClick={() => navigate('/assets')}>
                                <p className={style['category-item__title']}>Assets</p>
                                <hr className={style['category-item__line']} />
                                <p className={style['category-item__total']}>{assetsLength?.data}</p>
                            </div>
                            <div className={`${style['category-item']} ${style['category-item--licence']}`} onClick={() => navigate('/licences')}>
                                <p className={style['category-item__title']}>Licences</p>
                                <hr className={style['category-item__line']} />
                                <p className={style['category-item__total']}>{licencesLength?.data}</p>
                            </div>
                            <div className={`${style['category-item']} ${style['category-item--accessories']}`} onClick={() => navigate('/accessories')}>
                                <p className={style['category-item__title']}>Accessories</p>
                                <hr className={style['category-item__line']} />
                                <p className={style['category-item__total']}>{accessoriesLength?.data}</p>
                            </div>
                            <div className={`${style['category-item']} ${style['category-item--components']}`} onClick={() => navigate('/components')}>
                                <p className={style['category-item__title']}>Components</p>
                                <hr className={style['category-item__line']} />
                                <p className={style['category-item__total']}>{componentsLength?.data}</p>
                            </div>
                            <div className={`${style['category-item']} ${style['category__item--users']}`} onClick={() => navigate('/users')}>
                                <p className={style['category-item__title']}>Users</p>
                                <hr className={style['category-item__line']} />
                                <p className={style['category-item__total']}>{usersLength?.data}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className={style.dashboard}>
                <div className={style.dashboard__wrapper}>
                    <div className={style.tabs}>
                        <div className={`${style.tabs__first} ${tab === 1 && ['tabs__activity--active']}`} onClick={() => setTab(1)}>Recent Activity</div>
                        <div className={`${style.tabs__second} ${tab === 2 && ['tabs__activity--active']}`} onClick={() => setTab(2)}>Activity by status</div>
                        <div className={`${style.tabs__three} ${tab === 3 && ['tabs__activity--active']}`} onClick={() => setTab(3)}>Three</div>
                        <div className={`${style.tabs__four} ${tab === 4 && ['tabs__activity--active']}`} onClick={() => setTab(4)}>Four</div>
                    </div>
                    <hr />
                    <div className={style.content}>
                        {tab === 1 && (
                            <>
                                {/* <div>
                                        <div><h2>Recent Activity</h2></div>
                                    </div> */}
                                <div style={{ marginTop: '30px', overflowY: 'auto', height: '400px' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Date</th>
                                                <th>Create</th>
                                                <th>Action</th>
                                                <th>Item</th>
                                                <th>Appointed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>

                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>
                                            <tr>
                                                <td>Return</td>
                                                <td>2025-10-28 1:44PM</td>
                                                <td>User create</td>
                                                <td>Create new</td>
                                                <td>(00278) - NoteBook</td>
                                                <td>User Appointed</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div style={{ width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'stretch', position: 'absolute', bottom: '40px', alignContent: 'stretch' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <label>Records</label>
                                        <select style={{ cursor: 'pointer' }}>
                                            <option value="">10</option>
                                            <option value="">20</option>
                                            <option value="">30</option>
                                            <option value="">50</option>
                                            <option value="">150</option>
                                            <option value="">200</option>
                                            <option value="">250</option>
                                            <option value="">300</option>
                                        </select>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', width: '100%', marginRight: '20px', marginLeft: '20px' }}>
                                        <div className="page">Prev</div>
                                        <div className="page">1</div>
                                        <div className="page">2</div>
                                        <div className="page">3</div>
                                        <div className="page">4</div>
                                        <div className="page">...</div>
                                        <div className="page">10</div>
                                        <div className="page">Next</div>
                                    </div>
                                </div>
                            </>
                        ) || tab === 2 && (<>2</>) || tab === 3 && (<>3</>) || tab == 4 && (<>4</>)}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Content;