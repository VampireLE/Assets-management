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
                <div ref={clickOnBgPopup} className="overlay" onClick={(event) => {
                    if (event.target === clickOnBgPopup.current) {
                        onClosePopup(false)
                    }
                }}>
            <div className="popup">
                <div className="popup__close" onClick={() => onClosePopup(false)}></div>
                <div className="popup__wrapper">
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div className="form__field">
                            <label>Name</label>
                            <input {...register('name')} type="text" />
                        </div>
                        <div className="form__field">
                            <label>Contact</label>
                            <input {...register('contact')} type="text" />
                        </div>
                        <div className="form__field">
                            <label>Company</label>
                            <input {...register('company')} type="text" />
                        </div>
                        <div className="form__field">
                            <select {...register('status')} name="status">
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