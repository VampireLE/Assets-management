import { useQuery, useQueryClient } from "@tanstack/react-query";
import style from "./Content.module.scss"
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";


function Content() {
    const [tab, setTab] = useState(1);
    const [perpage, setPerpage] = useState(5);
    const navigate = useNavigate();

    const COLORS = [
        '#2dcedd',
        '#ca2424',
        '#00fe08',
        '#feba00'
    ]
    

    const queryClient = useQueryClient();

    const {data: statusData, isLoading: isLoadingData} = useQuery({
        queryKey: ['status'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/assets/status');
            const json = await res.json();
            return json;
        }
    })

    const {data: licencesLength, isLoading: isLoadinglicences} = useQuery({
        queryKey: ["licences"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/licences/count", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            // if (res.status === 401) return navigate('/')
            const json = await res.json();
            return json;
        }
    })

    const {data: accessoriesLength, isLoading: isLoadingAccessories} = useQuery({
        queryKey: ["accessories"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/accessories/count", {
                headers: {
                    'Content-Type': 'application/json',
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
                    'Content-Type': 'application/json',
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
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const json = await res.json();
            return json;
        }
    })

    const {data: assetsLength, isLoading: isLoadingAssets} = useQuery({
        queryKey: ["assets", "count"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/assets/count", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            const json = await res.json();
            return json;
        }
    })

    const {data: historyData, isLoading: isLoadingHistory} = useQuery({
        queryKey: ['history'],
        queryFn: async () => {
            const req = await fetch(`http://localhost:3000/history?count=${perpage}`)
            const json = req.json();
            return json;
        }
    })

    const historyList = useMemo(
        () => Array.isArray(historyData?.data) 
            ? historyData.data 
            : [],[historyData]
    )

    const statusList = useMemo(
        () => Array.isArray(statusData) ? statusData : []
        , [statusData]
        )

    if (isLoadingHistory
        && isLoadingAssets 
        && isLoadinglicences
        && isLoadingAccessories
        && isLoadingComponents
        && isLoadingUsers
        && isLoadingData
        
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
                    <div className={style.content}>
                            <>
                                <div className={style.content__title}><h2>History</h2></div>
                                <div style={{ marginTop: '30px', height: '400px' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Date</th>
                                                <th>Create</th>
                                                <th>Action</th>
                                                <th>Item</th>
                                                <th>Note</th>
                                                <th>Appointed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {historyList.map((el) => (
                                                <tr key={el._id}>
                                                    <td>
                                                        <div>{el.type}</div>
                                                    </td>
                                                    <td>
                                                        <div>{el.date}</div>
                                                    </td>
                                                    <td>
                                                        <div>{el.create}</div>
                                                    </td>
                                                    <td>
                                                        <div>{el.action}</div>
                                                    </td>
                                                    <td>
                                                        <div>{el.item}</div>
                                                    </td>
                                                    <td>
                                                        <div>{el.note}</div>
                                                    </td>
                                                    <td>
                                                        <div>{el.appointed}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                    </div>

                    <div>
                        <div>
                            <h2>Status by active</h2>
                        </div>
                        <div>
                            <PieChart
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    maxWidth: '500px', 
                                    maxHeight: '80vh', 
                                    aspectRatio: 1 
                                }}
                                responsive
                            >
                                <Pie
                                    data={statusList}
                                    dataKey='count'
                                    nameKey='_id'
                
                                >
                                    {statusList.map((entry, index) => 
                                        <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                                    )}
                                </Pie>
                                <Tooltip formatter={(value, name, props) => [
                                    `${name}: ${value}`
                                ]}/>
                            </PieChart>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Content;