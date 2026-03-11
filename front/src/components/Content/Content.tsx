import { useContext, useEffect, useRef, useState } from "react";
import { Mutation, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from './Content.module.scss';
import SideBar from "../Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import Table from "../Table/Table";
import { SideDrawerContext } from "../Assets/Assets";

export default function Content({ mode, setMode, onOpenPopup }) {
    const {
        showSideDrawer, 
        setShowSideDrawer, 
        typeAction, 
        setTypeAction
    } = useContext(SideDrawerContext);

    const [overflow, setOverflow] = useState({});
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);
    const [paginationIsVisible, setPaginationIsVisible] = useState(true);

    const [nav, setNav] = useState(null);
    const [id, setId] = useState(null);
    const [perpage, setPerpage] = useState(10);

    const queryClient = useQueryClient();

    const [viewMore, setViewMore] = useState(false);

    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["assets", page, showAll, perpage],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/assets?page=${page}&&count=${perpage}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
        })
            // console.log(isLoading)
            // if (res.status === 401) navigate('/');
            const json = await res.json();

            if (Array.isArray(json)) {
                return { data: json }
            }
            return json;
        }
    })

    // const deleteMutation = useMutation({
    //     mutationKey: ["assets"],
    //     mutationFn: async (_id) => {
    //         await fetch(`http://localhost:3000/assets/${_id}`, {
    //             method: "DELETE"
    //         })
    //     }, onSuccess() {
    //         queryClient.invalidateQueries(["assets"]);
    //     }
    // })

    // useEffect(() => {
    //     const pages = document.querySelectorAll('.page');
    //     pages.forEach((value, index) => {
    //         value.style.border = 'none'
    //         value.style.color = 'black'
    //         if (value.innerText == String(page)) {
    //             value.style.border = '1px solid  #7140ff'
    //             value.style.color = '#4200ff'
    //         }
    //     })
    // }, [data, page])



    // const updateMutation = useMutation({
    //     mutationKey: ["assets"],
    //     mutationFn: async ({ id, data }) => {
    //         await fetch(`http://localhost:3000/assets/${id}`, {
    //             method: 'PATCH',
    //             'headers': {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)

    //         })
    //     }, onSuccess() {
    //         queryClient.invalidateQueries(['assets'])
    //     }, onError(error) {
    //         console.log(error)
    //     }
    // })

    

    // // const [cellData, setCellData] = useState({});

    // // useEffect(() => {
    // //     console.log(cellData)
    // // }, [])

    // const showAllBtn = () => {
    //     setPaginationIsVisible(false);
    //     setShowAll(true)
    //     setOverflow({ overflowX: "auto" })
    // }
    if (isLoading) return <>Loading</>

    return (
        <>
            <div className={style.content}>
                <div className={style.content__wrapper}>
                    <div className={style.content__inner}>
                        <div className={style.navigation}>
                            <div className={style.navigation__wrapper}>
                                <div className={style.navigation__add} onClick={() => {
                                    setShowSideDrawer(true)
                                    setTypeAction('create')
                                    }
                                }>
                                    <button>+ Add</button>
                                </div>
                                <div className={style.navigation__filter}>
                                </div>
                            </div>
                            {/* <div className={style.navigation__search}>
                                <img src={search} alt="search" />
                                <input placeholder="Search" />
                            </div> */}
                        </div>
                        <div>
                            <Table data={data} overflow={overflow}/>
                        </div>

                        {/* <div className={style.table__footer} style={paginationIsVisible ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                            <div className={style.perpage}>
                                <label htmlFor={style.perpage}>Per page</label>
                                <select name="perpage" defaultValue={perpage} onChange={(value) => setPerpage(value.target.value)}>
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="150">150</option>
                                    <option value="200">200</option>
                                </select>
                            </div>
                            <div className={style.pagination}>
                                <div className={style.pagination__wrapper}>
                                    <div className={`${style.pagination__control} ${style['pagination__control--prev']}`} style={page === 1 ? {} : {}} onClick={() => setPage(page === 1 ? page : page - 1)}></div>

                                    {[...Array(data.page)].map((_, index) => {
                                        return ((<div className={`${style.pagination__page} ${style["pagination__page--active"]}`} key={index} onClick={() => setPage(index + 1)}>{index + 1}</div>))
                                    })}

                                    <div className={`${style.pagination__control} ${style["pagination__control--next"]}`} style={page === data.page ? { backgroundColor: "#c8ced5" } : {}} onClick={() => data.page !== page ? setPage(page + 1) : page}></div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* <div className={style.notifications}>
                        Asset has been added
                    </div> */}
                </div>
            </div>
        </>
    )
}