import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import Perks from "../Perks";
import axios from 'axios';
import PhotoUploader from "../PhotoUploader";
export default function PlacesPage() {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuest] = useState('');
    const[redirect, setRedirect] = useState("");

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4 ">{text}</h2>
        )
    }
    function inputDescription(text) {
        <p className="text-gray-500 text-sm">{text}</p>
    }
    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
        }
        
        async function addNewPlace(e) {
            e.preventDefault();
            await axios.post("/places" , {
                title, address, addedPhotos , description , perks, extraInfo, checkIn, checkOut, maxGuests
            });
            setRedirect('/account/places');
        } 
         if(redirect){
            return <Navigate to={redirect} />
         }
    return (

        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className=" inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add new place </Link>
                </div>
            )}
            {action == 'new' && (
                <div>
                    <form action="" onSubmit={addNewPlace}>
                        {preInput('Title')}
                        {/* <h2 className="text-2xl mt-4 ">Title</h2> */}
                        <input type="text" placeholder="title , for example :My lovely apartment" value={title} onChange={e => setTitle(e.target.value)} />
                        {preInput('Address', 'Address to this place ')}
                        {/* <h2 className="text-2xl mt-4 ">Address</h2> */}
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />
                        {preInput('Photos', 'Your photos here')}
                        {/* <h2 className="text-2xl mt-4 ">Photos</h2> */}
                        {/* <h2 className="text-gray-500 text-sm">Photos</h2> */}
                       
                            {/* {imageSrc && <img src={imageSrc}  />} */}
                            <PhotoUploader addedPhotos={addedPhotos} onchange={setAddedPhotos}/>
                        {preInput('Description ', 'description of the place')}
                        <textarea className="" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <div>
                            {preInput('Perks', 'Select all the perks of your place')}
                            <Perks selected={perks} onChange={setPerks} />
                        </div>
                        {preInput('ExtraInfo', 'House Rules etc')}
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                        {preInput('CheckIn', 'add check in and Checkout time, remeber to have some window for cleaning room')}
                        <div className="grid sm:grid-cols-3">
                            <div >
                                <h3 className="mt-2 -mb-1">Chech in time</h3>
                                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="14:30" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guest</h3>
                                <input type="number" value={maxGuests} onChange={e => setMaxGuest(e.target.value)} />
                            </div>
                        </div>
                        <button className="primary">Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}