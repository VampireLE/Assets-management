import { useRef, useState } from 'react'
import './Popup.css'
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export default function Popup({popupIsShow, onClosePopup}) {
    const clickOnBgPopup = useRef(null);
    // const [asset, setAsset] = useState({});
    
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // const onSubmit = data => setAsset(data);
    
    const mutation = useMutation({
        mutationFn: async (asset) => {
            console.log(asset)
            const { data } = await fetch("http://localhost:3000/assets", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(asset)
            });
            return data; 
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["assets"]);
            onClosePopup(false)
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    return (
        <>
            {popupIsShow && (
                <div ref={clickOnBgPopup} className="popup-bgd" onClick={(event) => {
                    if (event.target === clickOnBgPopup.current) {
                        onClosePopup(false)
                    }
                }}>
            <div className="popup">
                <div className="cls-popup" onClick={() => onClosePopup(false)}></div>
                <div className="popup__wrapper">
                    <form onSubmit={handleSubmit(onSubmit)} className="popup__form">

                        <div className="form__name">
                            <label>Name</label>
                            <input {...register('name')} type="text" />
                        </div>
                        <div className="form__contact">
                            <label>Contact</label>
                            <input {...register('contact')} type="text" />
                        </div>
                        <div className="form__company">
                            <label>Company</label>
                            <input {...register('company')} type="text" />
                        </div>
                        <div className="form__status">
                            <select {...register('status')} name="status" id="status">
                                <option value="Issued">Issued</option>
                                <option value="In stock">In stock</option>
                                <option value="Broken">Broken</option>
                                <option value="Ready for pickup">Ready for pickup</option>
                            </select>
                        </div>
                        <div className="form__submit">
                            <input type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            )}
        </>
    )
}