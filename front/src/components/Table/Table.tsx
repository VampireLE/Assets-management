    import style from './Table.module.scss';
    import search from "./../../assets/search.png";
    import processor from "./../../assets/processor.png"
    import { useContext, useEffect, useRef, useState } from 'react';
    import { CellDataContext, SideDrawerContext } from '../Assets/Assets';
    import { useMutation, useQueryClient } from '@tanstack/react-query';

    function Table({data, overflow}) {

        const queryClient = useQueryClient();

        const {cellData, setCellData} = useContext(CellDataContext);
        const {
            showSideDrawer,
            setShowSideDrawer,
            typeAction, 
            setTypeAction
        } = useContext(SideDrawerContext)
        
        const label = useRef([]);

        const [statusID, setStatusID] = useState('');
        const [selectStatus, setSelectStatus] = useState({
            id: '',
            status: ''
        });

        // console.log(selectStatus)

        const handleStatusChange = useMutation({
                    mutationKey: ["assests"],
                    mutationFn: async (selectStatus) => {
                        await fetch(`http://localhost:3000/assets/${selectStatus.id}`, {
                            method: "PATCH",
                            'headers': {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(selectStatus.status)
                        })
                    },
                    onSuccess() {
                        queryClient.invalidateQueries(["assets"]);
                    }
                })

        const handleStatus = (event, id) => {
            const target = event.target.textContent;
                
            // setSelectStatus({
            //         id: statusID,
            //         status: event.target.textContent
            //     })

            handleStatusChange.mutate({
                id: id,
                status: { status: target }
            })
            }

    
        useEffect(() => {

            /*

            Нужно еще провернить насчет дублирования одного и тоже действия 

            */





            const elements = document.querySelectorAll(`.${style['table-row__label']}`);

            const open = (event) => {
                const target = event.target;
                const td = event.target.parentNode.parentNode;
                const label = td.querySelector(`.${style['label__menu']}`)

                elements.forEach((element) => {
                    const elementTableRow = (element.parentNode?.parentNode);
                    const menu = elementTableRow.querySelector(`.${style['label__menu']}`);
                    menu.style.display = 'none';
                })

                label.style.display = 'flex';
                
                const id = label.getAttribute('data-id');

                const onStatusClick = (e) => handleStatus(e, id);
                
                const buttons = label.querySelectorAll('div');
                buttons.forEach((button) => {
                    button.addEventListener('click', onStatusClick)
                })

                return () => {
                    buttons.forEach((button) => {
                        button.removeEventListener('click', onStatusClick)
                    })
                }
                
            }

            const toggle = (event) => {
                const target = event.target;
                if (!target.classList.contains(style['table-row__label']) &&
                    !target.classList.contains(style['table-row__label'])
                    ) {
                        elements.forEach((element) => {
                            const elementTableRow = (element.parentNode?.parentNode);
                            const menu = elementTableRow.querySelector(`.${style['label__menu']}`);
                            menu.style.display = 'none';
                        })
                    }
            }
            elements.forEach((element) => {
                element.addEventListener('click', open)
            })

            document.addEventListener('click', toggle)
            return () => {
                document.removeEventListener('click', toggle)
            }
        
    }, [data]);



















        const rowMenu = useRef(null);

        const [cellToggle, setCellToggle] = useState([]);
        // const rowItemToggle = useRef(null);

        const updateAsset = (_id: number, child) => {
            const parent = ((child.parentNode).parentNode).parentNode;
            const name = parent.querySelector('.asset-name').textContent;
            const company = parent.querySelector('.asset-company').textContent;
            const contact = parent.querySelector('.asset-contact').textContent;
            const status = parent.querySelector('.status').textContent;
            updateMutation.mutate({ id: _id, data: { name: 'Monitor', company, contact, status } });
        }

        useEffect(() => {

            const menu = document.querySelector(`${style["table-row__menu"]}`)
            const menuActive = document.querySelector(`${style["table-row__menu--active"]}`)
            const buttons = document.querySelectorAll(`.${style['table-row__menu-toggle']}`);
            const rowMenu = document.querySelectorAll(`.${style["table-row__menu"]}`);

            const clickOutside = () => {
                const menuActive = document.querySelectorAll(`.${style["table-row__menu--active"]}`)
                menuActive.forEach((el) => {
                    el.style.display = 'none'
                })
            }

            const openMenu = (event) => {
                const td = (((event.target).parentNode).parentNode)
                const btnActive = td.querySelector(`.${style["table-row__menu--active"]}`)
                const rowElements = document.querySelectorAll(`.${style['table-row__menu--active']}`);
                rowElements.forEach((el) => {
                    el.style.display = 'none';
                })

                btnActive.style.display = 'flex'
            }

            const toggleMenu = (event) => {
                const target = event.target as HTMLElement;
                if (!target.classList.contains(style['table-row__menu-toggle']) &&
                    target !== menu &&
                    target !== menuActive
                ) {
                    clickOutside()
                }
            }

            buttons.forEach((button, _) => {
                button.addEventListener('click', openMenu)
            })

            document.addEventListener('click', toggleMenu)

            return () => {
                buttons.forEach((el) => {
                    el.removeEventListener('click', openMenu)
                })
                document.removeEventListener('click', toggleMenu)
            }
        }, [data])




















        

        const styleStatus = (status: string) => {
            switch (status) {
                case "Broken":
                    return ({ backgroundColor: "#fcc3c3", width: '70px', height: '20px', borderRadius: '10px', lineHeight: '20px', border: '1px solid #ff4f4fff' });
                case "In stock":
                    return ({ backgroundColor: "#e1e1e1", width: '70px', height: '20px', lineHeight: '20px', borderRadius: '10px', border: '1px solid #5a5a5aff' });
                case "Issued":
                    return ({ backgroundColor: "#c5c6fc", width: '70px', height: '20px', lineHeight: '20px', borderRadius: '10px', border: '1px solid #5b5effff' });
                case "Ready for pickup":
                    return ({ backgroundColor: "#fcedc5", width: '150px', height: '20px', lineHeight: '20px', borderRadius: '10px', border: '1px solid #ffbb00ff' });
                default:
                    return {}
            }
        }

        return (
            <div className={style.table}>
                <table style={overflow}>
                    <thead>
                        <tr className={style.table__cell}>
                            <th
                                className={style['cell--toggle']}>
                            <input
                                checked={cellToggle.length > 0} 
                                onChange={
                                    () => {
                                        if (data?.data.length === cellToggle.length) {
                                            setCellToggle([])
                                        } else {
                                            setCellToggle(data?.data?.map(value => value._id))
                                        }
                                    }
                                } 
                                type="checkbox"/></th>
                            <th>Asset Name</th>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Product</th>
                            <th>Supplier</th>
                            <th>Location</th>
                            <th>Department</th>
                            <th>Serial Number</th>
                            <th>Order Number</th>
                            <th>Notes</th>
                            <th>Purchase Date</th>
                            <th>Warranty Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.data.map((value, _) => {
                                const {
                                    _id,
                                    name,
                                    company,
                                    contact,
                                    status,
                                    product,
                                    supplier,
                                    location,
                                    department,
                                    serialNumber,
                                    orderNumber,
                                    notes,
                                    purchaseDate,
                                    warrantyExpirationDate,
                                    icon,
                                } = value;

                                return (
                                    <tr key={_id} className={style['table-row']}>
                                        <td className={`${style['table__row-item']} ${style['row-item--toggle']}`}>
                                            <input 
                                                type="checkbox" 
                                                checked={cellToggle.includes(_id)} 
                                                onChange={() => {
                                                    setCellToggle(
                                                        prev => prev.includes(_id)
                                                        ? prev.filter(id => id !== _id)
                                                        : [...prev, _id]
                                                    )
                                                }}
                                            />
                                        </td>
                                        <td className={style['table__row-item']}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]}>{name}</div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]}>{company}</div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]}>{contact}</div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div ref={el => {
                                                if (el) label.current[_] = el;
                                            }} className={style["table__row-wrapper"]}>
                                                <div className={`${style["table-row__element"]} ${style["table-row__label"]}`} style={styleStatus(status)}>
                                                    {status}
                                                </div>
                                            </div>
                                            <div data-id={_id} className={style["label__menu"]}>
                                                <div>Broken</div>
                                                <div>In stock</div>
                                                <div>Issued</div>
                                                <div>Ready for pickup</div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(product)}>
                                                    {product}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(supplier)}>
                                                    {supplier}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(location)}>
                                                    {location}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(department)}>
                                                    {department}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(serialNumber)}>
                                                    {serialNumber}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(orderNumber)}>
                                                    {orderNumber}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(notes)}>
                                                    {
                                                        notes.length > 10
                                                        ? `${notes.substring(0, 10)}...`
                                                        : notes
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(purchaseDate)}>
                                                    {purchaseDate}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__element"]} style={styleStatus(warrantyExpirationDate)}>
                                                    {warrantyExpirationDate}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={style["table__row-item"]}>
                                            <div ref={rowMenu} className={style["table__row-wrapper"]}>
                                                <div className={style["table-row__menu-toggle"]}>
                                                    <div></div>
                                                    <div></div>
                                                    <div></div>
                                                </div>
                                            </div>
                                            <div className={`${style["table-row__menu"]} ${style["table-row__menu--active"]}`}>
                                                <div className={style["table-row__menu-item"]} onClick={() => {
                                                    setShowSideDrawer(true)
                                                    setTypeAction('update')
                                                    setCellData({
                                                        _id,
                                                        name,
                                                        company,
                                                        contact,
                                                        status,
                                                        product,
                                                        supplier,
                                                        location,
                                                        department,
                                                        serialNumber,
                                                        orderNumber,
                                                        notes,
                                                        purchaseDate,
                                                        warrantyExpirationDate,
                                                        icon
                                                    })
                                                }}>View more</div>
                                                <div 
                                                    className={style["table-row__menu-item"]} 
                                                    data-id={_id} 
                                                    onClick={(event) => {
                                                        setShowSideDrawer(true)
                                                        setTypeAction('clone')
                                                        setCellData({
                                                            _id,
                                                            name,
                                                            company,
                                                            contact,
                                                            status,
                                                            product,
                                                            supplier,
                                                            location,
                                                            department,
                                                            serialNumber,
                                                            orderNumber,
                                                            notes,
                                                            purchaseDate,
                                                            warrantyExpirationDate,
                                                            icon
                                                        })
                                                    }}>
                                                        Clone
                                                </div>
                                                <div 
                                                    className={style["table-row__menu-item"]} 
                                                    data-id={_id} 
                                                    onClick={(event) => deleteMutation.mutate(event.target.getAttribute('data-id'))}>
                                                        Delete
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    export default Table;