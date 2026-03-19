import { useContext, useEffect, useRef, useState } from "react";
import { Mutation, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import style from './Content.module.scss';
import SideBar from "../Sidebar/SideBar";
import { useNavigate } from "react-router-dom";
import search from "./../../assets/search.png"
import Popup from "../Popup/Popup";
import Table from "../Table/Table";
import { CellDataContext, SideDrawerContext } from "../Assets/Assets";

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
    const [handleTrash, setHandleTrash] = useState([]);

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

    


    const handleRemove = (id) => {
        console.log(id)
    }
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
                                <div className={style.navigation__actions}>
                                    <div className={style.navigation__add} onClick={() => {
                                        setShowSideDrawer(true)
                                        setTypeAction('create')
                                        }
                                    }>
                                        <button>
                                                    <svg width={'14px'} height={'18px'} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="
                                                        M7.39046 
                                                        2.14443C7.39055 
                                                        1.80799 7.66366 
                                                        1.5351 8.00006 
                                                        1.53483C8.33675 
                                                        1.53484 8.61038 
                                                        1.80846 8.61038 
                                                        2.14515L8.60975 
                                                        7.39031L13.8556 
                                                        7.39038C14.1923 
                                                        7.39038 14.4652 
                                                        7.66331 14.4652 
                                                        8C14.4652 8.33669 
                                                        14.1923 8.6096 
                                                        13.8556 8.6096L8.60976 
                                                        8.60953L8.61053 
                                                        13.8547C8.61053 
                                                        14.1913 8.33753 
                                                        14.4642 8.00093 
                                                        14.4643C7.66424 
                                                        14.4643 7.39131 
                                                        14.1914 7.39131 
                                                        13.8547L7.39054 
                                                        8.60952L2.14538 
                                                        8.61015C1.80869 
                                                        8.61015 1.53507 
                                                        8.33652 1.53506 
                                                        7.99983C1.53506 
                                                        7.66337 1.80829 
                                                        7.39059 2.14466 
                                                        7.39023L7.39053 
                                                        7.3903L7.39046 
                                                        2.14443Z"/>
                                                    </svg>
                                                Add
                                        </button>
                                    </div>
                                    <div className={style.navigation__filter}>
                                    </div>
                                    <div
                                        onClick={() => handleRemove()}
                                    >   
                                        <svg width={'25px'} height={'25px'} viewBox="0 0 18 18">
                                            <path fill="red" d="
                                            M8.87335 1C9.49676 1 9.97847 1.13373 10.2926 1.48734C10.5641 1.79292 
                                            10.6298 2.19161 10.6736 2.45784L10.6799 2.49581L10.8263 3.34083L10.8287 
                                            3.35591C11.9039 3.41072 12.9782 3.49031 14.0493 3.59398C14.3241 
                                            3.62058 14.5248 3.85974 14.4975 4.12814C14.4703 4.39654 14.2255 
                                            4.59259 13.9507 4.566C13.7102 4.54272 13.4696 4.52073 13.2288 
                                            4.49992L12.6323 12.7263L12.6321 12.7289L12.6312 12.7413C12.6136 
                                            12.9863 12.5943 13.2557 12.5426 13.5064C12.489 13.7663 12.3946 
                                            14.0406 12.2032 14.284C11.8024 14.7937 11.1203 15 10.14 
                                            15H5.85997C4.87963 15 4.19758 14.7937 3.7968 14.284C3.6054 
                                            14.0406 3.51093 13.7663 3.45733 13.5064C3.40566 13.2557 
                                            3.38635 12.9863 3.36879 12.7413L3.36792 12.7289L3.36774 
                                            12.7263L2.82713 4.49145L2.0488 4.566C1.774 4.5923 
                                            1.52937 4.39606 1.50242 4.12765C1.47548 3.85921 
                                            1.67644 3.62023 1.95127 3.59392L3.31051 3.46377C3.93258 3.40241 4.5547 
                                            3.35535 5.17682 3.32254L5.32023 2.48837L5.32811 2.44222C5.37402 2.17141 
                                            5.44135 1.77413 5.71247 1.47384C6.02851 1.12379 6.51073 1 7.12665 
                                            1H8.87335ZM7.32004 4.24278C6.1617 4.24278 5.00327 4.29367 3.84473 
                                            4.39527L4.36556 12.6621C4.38438 12.9243 4.40029 13.1323 4.43767 13.3135C4.47407 
                                            13.4901 4.52462 13.6061 4.58989 13.6891C4.70244 13.8322 4.98038 14.0233 
                                            5.85997 14.0233H10.14C11.0196 14.0233 11.2975 13.8322 11.4101 13.6891C11.4754 
                                            13.6061 11.5259 13.4901 11.5623 13.3135C11.5997 13.1323 11.6156 12.9242 11.6344 
                                            12.662L11.6345 12.6607L12.1874 4.41768C10.5663 4.30193 8.94127 4.24278 7.32004 
                                            4.24278ZM9.10667 10.4418C9.38281 10.4418 9.60667 10.6604 9.60667 
                                            10.9302C9.60667 11.1999 9.38281 11.4186 9.10667 11.4186H6.88669C6.61055 
                                            11.4186 6.38669 11.1999 6.38669 10.9302C6.38669 10.6604 6.61055 10.4418 6.88669 
                                            10.4418H9.10667ZM9.66669 7.83718C9.94282 7.83719 10.1667 8.05584 10.1667 
                                            8.32555C10.1667 8.59526 9.94281 8.81391 9.66669 8.81392H6.33337C6.05724 
                                            8.81392 5.83339 8.59527 5.83337 8.32555C5.83337 8.05583 6.05723 7.83718 
                                            6.33337 7.83718H9.66669ZM7.12665 1.97674C6.61595 1.97674 6.49482 2.08409 6.46253 
                                            2.11985C6.40111 2.18787 6.36646 2.30215 6.3064 2.65037L6.19789 3.28154C6.57193 
                                            3.27122 6.94599 3.26604 7.32004 3.26604C8.14851 3.26604 8.97785 3.28126 9.807 
                                            3.31134L9.69316 2.65437C9.63739 2.32031 9.60212 2.20039 9.53735 2.12748C9.50149 
                                            2.08713 9.37651 1.97674 8.87335 1.97674H7.12665Z"/>
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <div className={style.navigation__search}>
                                        <img src={search} alt="search" />
                                        <input placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.test}>
                            <Table data={data} overflow={overflow}/>
                        </div>

                        <div className={style.table__footer} style={paginationIsVisible ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                            <div className={style.perpage}>
                                <label htmlFor={style.perpage}>Page</label>
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
                                        return ((<div className={index +1 === page ? `${style.pagination__page} ${style['pagination__page--active']}` : `${style.pagination__page}`} key={index} onClick={() => setPage(index + 1)}>{index + 1}</div>))
                                    })}

                                    <div className={`${style.pagination__control} ${style["pagination__control--next"]}`} style={page === data.page ? { backgroundColor: "#c8ced5" } : {}} onClick={() => data.page !== page ? setPage(page + 1) : page}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className={style.notifications}>
                        Asset has been added
                    </div> */}
                </div>
            </div>
        </>
    )
}