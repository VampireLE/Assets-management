import style from "./SideDrawer.module.scss";
import qr from "./../../assets/qr.svg"
import { useContext, useEffect, useRef, useState } from "react";
import avatar from "./../../assets/avatar.jpg";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CellDataContext, SideDrawerContext } from "../Assets/Assets";

function SideDrawer({ setShowSideDrawer, sideDrawerOverlay }) {
  const {cellData, setCellData} = useContext(CellDataContext);
  const { typeAction, setTypeAction } = useContext(SideDrawerContext)
  const queryClient = useQueryClient();
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showSubMenu, setSubShowMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // const detaildefaultValue = useRef(null);

  // const data = {
  //   'assetId': '',
  //   'assetName': '',
  //   'product': '',
  //   'status': '',
  //   'supplier': '',
  //   'location': '',
  //   'department': '',
  //   'serialNumber': '',
  //   'warrantyExpirationDate': '',
  //   'orderNumber': '',
  //   'purchaseDate': '',
  //   'notes': '',
  //   // 'img': '',
  // };

  // useEffect(() => {
  //   if (isEdit) {
  //     detaildefaultValue.current.removeAttribute('disabled')
  //   }
  // }, [isEdit])

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
  } = cellData ?? {};
  
  const defaultValue = typeAction === 'create' ? {} : {...cellData};
  
  const methods = useForm({
    defaultValues: {
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
    }
  });

  const { register, reset, handleSubmit } = methods;


  useEffect(() => {
    if (typeAction === 'create') {
        reset({
        name: '',
        company: '',
        contact: '',
        status: '',
        product: '',
        supplier: '',
        location: '',
        department: '',
        serialNumber: '',
        orderNumber: '',
        notes: '',
        purchaseDate: '',
        warrantyExpirationDate: '',
      }) 
    } else if (typeAction === 'clone') {
      reset({})
    }
  }, [typeAction])

  const onSubmit = (data) => {
    setIsEdit(false);
    const file = data.icon?.[0];
    const formData = new FormData();
    formData.append('icon', file);
    Object.keys(data).forEach(key => {
      if (key !== 'icon') {
        formData.append(key, data[key] ?? "")
      }
    })
    // console.log(formData)
    mutationCreate.mutate(formData)
    // console.log(data)
  }

  // const onDelete = (id) => {
  //   mutation2.mutate(id);
  // }


  const handleClone = () => {
    const cloned = { ...cellData }
    delete cloned._id;
    setTypeAction('clone');
    reset(cloned);
    setIsEdit(true);
  }

  const mutationCreate = useMutation({
        mutationFn: async (asset) => {
            const response = await fetch("http://localhost:3000/assets", {
                method: 'POST',
                body: asset
            });
            const data = await response.json();
            return data; 
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries(["assets"]);
            onClosePopup(false)
        }
    })

  const mutationUpdate = useMutation({
    mutationKey: ['assets'],
    mutationFn: async (data) => {
      await fetch(`http://server:3000/assets/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }, onSuccess: () => {
      queryClient.invalidateQueries(['assest'])
    }
  })

  const mutationDelete = useMutation({
    mutationKey: ['assets'],
    mutationFn: async () => {
      await fetch(`http://server:3000/assets/${_id}`, {
        method: 'DELETE'
      })
    }, onSuccess: async () => {
      queryClient.invalidateQueries(['assests'])
    }
  })

  return (
    <FormProvider {...methods} >
      <div className={style.overlay}>

        <div className={style.sidedrawer} ref={sideDrawerOverlay}>
          <div
            className={style.sidedrawer__overlay}
            onClick={() => setShowSideDrawer(false)}
          ></div>

          <div className={style.sidedrawer__content}>
            <div className={style.sidedrawer__header}>
              <div>
                {typeAction === 'create' || typeAction === 'clone'
                ? (<h2 className={style.sidedrawer__title}>New asset</h2>) 
                : (<h2 className={style.sidedrawer__title}>About asset</h2>)}
              </div>
              <div className={style.sidedrawer__actions}>
                {isEdit && (
                  <>
                    <div className={style.sidedrawer__action} onClick={handleSubmit((data) => {
                        onSubmit(data)
                        setIsEdit(false)
                      })}>Save</div>
                    {typeAction === 'clone' ? (
                      <div className={style.sidedrawer__action} onClick={() => setIsEdit(false)}>
                      Cancel
                    </div>  
                    ) : (
                      <div className={style.sidedrawer__action} onClick={() => setIsEdit(false)}>
                        Cancel edit
                      </div>
                    )}
                  </>
                )}

                {!isEdit && typeAction !== 'create' && (
                  <>
                    <div className={style.sidedrawer__action} onClick={() => setIsEdit(true)}>Edit</div>
                    <div 
                      className={style.sidedrawer__action}
                      onClick={handleClone}
                      >Clone</div>
                    <div className={style.sidedrawer__action} onClick={() => onDelete(_id)}>Delete</div>
                    <div className={style.sidedrawer__action} onClick={() => setShowSideDrawer(false)}>Cancel</div>
                  </>
                )}

                {!isEdit && typeAction === 'create' && (
                  <>
                    <div className={style.sidedrawer__action} onClick={handleSubmit((data) => {
                        onSubmit(data)
                        setIsEdit(false)
                      })}>Save</div>
                    <div className={style.sidedrawer__action} onClick={() => setShowSideDrawer(false)}>
                      Cancel
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={style.sidedrawer__separator}></div>

            <div className={style.sidedrawer__body}>
              <div className={style.sidedrawer__wrapper}>
                <form>
                <div className={style.sidedrawer__print}>
                  <div className={style.sidedrawer__icon}>
                    <div className={style['sidedrawer__icon-image']}>
                      <label>
                        <img 
                          className={style['sidedrawer__icon-avatar']} 
                          src={
                            icon ? 
                              `http://localhost:3000/uploads/${icon}` : 
                              avatar
                            } 
                          alt="#" />

                        <input
                          hidden
                          className={style['sidedrawer__icon-upload']}
                          type="file"
                          {...register('icon')}
                          />
                      </label>
                    </div>
                  </div>
                  
                  {typeAction !=='create' && typeAction !== 'clone' && (
                    <div className={style.sidedrawer__qr}>
                        <img src={qr} alt="" />
                    </div>
                  )}
                </div>
                </form>
                <div className={style.sidedrawer__separator}></div>
                <div className={style.sidedrawer__details}>
                  <div className={style['sidedrawer__detail-header']}>
                    <h3 className={style['sidedrawer__detail-title']}>Details</h3>
                  </div>
                  <div className={style['sidedrawer__detail-body']}>

                    <div className={style.sidedrawer__detail}>
                        <div className={style.sidedrawer__container}>
                          
                            <div>
                              <label>Id</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("id")}
                                />
                            </div>
                            <div>
                              <label>Name</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("name")}
                                />
                            </div>
                            <div>
                              <label>Company</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("company")}
                                />
                            </div>
                            <div>
                              <label>Contact</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("contact")}
                                />
                            </div>
                            <div>
                              <label>Status</label>
                              <select {...register("status")} disabled={typeAction === 'create' ? isEdit : !isEdit}>
                                <option value="Broken">Broken</option>
                                <option value="In stock">In stock</option>
                                <option value="Issued">Issued</option>
                                <option value="Ready for pickup">Ready for pickup</option>
                              </select>
                            </div>
                            <div>
                              <label>Product</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("product")}
                                />
                            </div>
                            <div>
                              <label>Supplier</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("supplier")}
                                />
                            </div>
                            <div>
                              <label>Location</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("location")}
                                />
                            </div>
                            <div>
                              <label>Department</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("department")}
                                />
                            </div>
                            <div>
                              <label>SerialNumber</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("serialNumber")}
                                />
                            </div>
                            <div>
                              <label>OrderNumber</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("orderNumber")}
                                />
                            </div>
                            <div>
                              <label>Notes</label>
                              <textarea 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("notes")}
                                />
                            </div>
                            <div>
                              <label>Purchase date</label>
                              <input 
                                type="text" 
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("purchaseDate")}
                                />
                            </div>
                            <div>
                              <label>Warranty expirationDate</label>
                              <input 
                                type="text"
                                disabled={typeAction === 'create' ? isEdit : !isEdit}
                                {...register("warrantyExpirationDate")}
                                />
                            </div>
                        </div>
                        {/* <label></label>
                          <input
                            ref={detaildefaultValue}
                            type="text"
                            // defaultValue={key}
                            disabled={!isEdit} /> */}
                      {/* <div style={{display: 'flex'}}>
                            <label></label>
                            <input type="text" />
                          </div> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={style.sidedrawer__qrInfo}>
                    <p>
                      You can customize text and size in the{" "}
                      <a href="#">Settings</a>
                    </p>
                    <button className={style.sidedrawer__qrPrint}>Print</button>
                    <p>
                      To print labels in bulk, go to the main Asset table, select
                      the checkboxes of the assets you want to print labels for and
                      click on the Print button that appears.
                    </p>
                  </div> */}

              {/* <div className={style.sidedrawer__details}>
                <div className={style.sidedrawer__detailsColumn}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={style.sidedrawer__detail}>
                      <div className={style.sidedrawer__detailHeader}>
                        <h3 className={style.sidedrawer__detailTitle}>Details</h3>
                        <a href="#" className={style.sidedrawer__detailEdit}>
                          edit
                        </a>
                      </div>
                      <span className={style.sidedrawer__detailLabel}>
                        Serial number
                      </span>
                      <p className={style.sidedrawer__detaildefaultValue}>-</p>
                    </div>
                  ))}
                </div>

                <div className={style.sidedrawer__detailsColumn}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={style.sidedrawer__detail}>
                      <div className={style.sidedrawer__detailHeader}>
                        <h3 className={style.sidedrawer__detailTitle}>Details</h3>
                        <a href="#" className={style.sidedrawer__detailEdit}>
                          edit
                        </a>
                      </div>
                      <span className={style.sidedrawer__detailLabel}>
                        Serial number
                      </span>
                      <p className={style.sidedrawer__detaildefaultValue}>-</p>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>

          {showEditMenu && (
            <div className={style['edit-menu']}>
              <div className={style['edit-menu__wrapper']}>
                <div className={style['edit-menu__close']} onClick={() => setShowEditMenu(false)}></div>
                <div className={style['edit-menu__inner']}>
                  <div className={style['edit-menu__title']}>
                    Edit Serial number
                  </div>

                  <div className={style['edit-menu__separator']}></div>

                  <div className={style['edit-menu__form']}>
                    <form>
                      <input type="text" />
                    </form>
                  </div>

                  {/* <div className={style['edit-menu__navigation']}>
                    <div onClick={() => setShowEditMenu(false)}>Cancel</div>
                    <div onClick={() => setShowEditMenu(false)}>Save</div>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FormProvider>

  );
}

export default SideDrawer;
