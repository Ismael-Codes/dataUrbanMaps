import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

export function MajesticonsLogoutLine(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9l-4-4m4 4l-4 4m4-4H9"></path></svg>
  )
}

export function MajesticonsPlusCircleLine(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="currentColor"><path d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12zm10-4a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H9a1 1 0 1 1 0-2h2V9a1 1 0 0 1 1-1z"></path></g></svg>
  )
}

export function MajesticonsSettingsCogLine(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 21h-4l-.551-2.48a6.991 6.991 0 0 1-1.819-1.05l-2.424.763l-2-3.464l1.872-1.718a7.055 7.055 0 0 1 0-2.1L3.206 9.232l2-3.464l2.424.763A6.992 6.992 0 0 1 9.45 5.48L10 3h4l.551 2.48a6.992 6.992 0 0 1 1.819 1.05l2.424-.763l2 3.464l-1.872 1.718a7.05 7.05 0 0 1 0 2.1l1.872 1.718l-2 3.464l-2.424-.763a6.99 6.99 0 0 1-1.819 1.052L14 21z"></path><circle cx="12" cy="12" r="3"></circle></g></svg>
  )
}

function ChangeCoordinates({ coordinates }: { coordinates: LatLngExpression }) {
    const map = useMap()
    map.setView(coordinates)
    return <></>
}

const Dashboard = () => {

    const [categories, setCategories] = useState<Category[]>([])

    const changeCategory = (e: any) => {
        const category = categories.find(category => category.name === e.target.value)
        if (category) {
            setActualPosition([category.places[0].lat, category.places[0].lng])
            setSelectedCategory(category.name)
        }
    }

    const [actualPosition, setActualPosition] = useState<LatLngExpression>([0, 0])

    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const size = useRef([window.innerWidth, window.innerHeight]);


    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('http://localhost/api/categories');
            const data = await res.json();
            setCategories(data);
            setActualPosition([data[0].places[0].lat, data[0].places[0].lng])
            setSelectedCategory(data[0].name)
        }
        fetchCategories()
    }, [])


    const createSideBar = () => {
        return <div className='w-[380px] h-screen bg-gray-200 fixed top-0 right-0 z-10'>
            <div className="absolute bottom-0 right-0 w-full h-[50px]">
                <div className='flex w-full h-full items-center font-roboto bg-slate-300'>
                    <button className='text-2xl w-1/3 h-full flex justify-center items-center hover:bg-gray-400'>
                            <MajesticonsPlusCircleLine />
                    </button>
                    <button className='text-2xl w-1/3 h-full flex justify-center items-center hover:bg-gray-400'>
                            <MajesticonsSettingsCogLine />
                    </button>
                    <button className='text-2xl w-1/3 h-full flex justify-center items-center hover:bg-gray-400'>
                            <MajesticonsLogoutLine />
                    </button>
                </div>
            </div>
            <h1 className='text-3xl p-2 pl-200 font-roboto font-semibold text-center'>Data Urban Maps</h1>
            <select onChange={changeCategory} className='w-full text-center font-roboto text-2xl h-12  border-b-2 border-gray-300 bg-gray-200' name="" id="">
                {categories.map(category => {
                    return <option value={category.name}>{category.name}</option>
                })}
            </select>

            {categories.map(category => {
                return category.name === selectedCategory ? category.places.map(place => {
                    return <>
                        <div key={place.name}>
                            <button className='text-2xl  w-full p-2 hover:bg-gray-300 font-roboto' onClick={() => {
                                setActualPosition([place.lat, place.lng])
                            }}>
                                <div className='flex items-center pl-2'>
                                    {place.name}

                                    <div className='text-xs pl-5 text-gray-500'>
                                        {place.lat}
                                        {', '}
                                        {place.lng}
                                    </div>
                                </div>
                            </button>
                        </div>
                    </>
                }) : null
            })}
        </div>
    }

    const navigate = useNavigate()


    interface Places {
        name: string,
        lat: number,
        lng: number,
    };

    interface Category {
        name: string,
        places: Places[]
    }
    return <>
        {createSideBar()}
        <MapContainer center={actualPosition} zoom={13} scrollWheelZoom={false} style={{ height: `${size.current[1]}px`, width: `${size.current[0]}px`, position: 'absolute', top: '0', left: '0', zIndex: '0' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
                categories.map(category => {
                    return category.name === selectedCategory ? category.places.map(place => {
                        return <Marker position={[place.lat, place.lng]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    }) : null
                })
            }

            <Marker position={actualPosition}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <ChangeCoordinates coordinates={actualPosition} />
        </MapContainer>
    </>
};


export default Dashboard;