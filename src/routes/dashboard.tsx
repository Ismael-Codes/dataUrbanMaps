import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";


export function PhPlusCircleFill(props: any) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm40 112h-32v32a8 8 0 0 1-16 0v-32H88a8 8 0 0 1 0-16h32V88a8 8 0 0 1 16 0v32h32a8 8 0 0 1 0 16Z"></path></svg>
    )
}

const Dashboard = () => {

    const navigate = useNavigate()

    interface Places {
        name: string,
        coordinates: LatLngExpression
    };

    interface Category {
        name: string,
        places: Places[]
    }

    const [categories, setCategories] = useState<Category[]>([

        {
            name: 'vegetable',
            places: [
                {
                    name: 'carrot',
                    coordinates: [0, 0]
                }]
        },
        {
            name: 'fruit',
            places: [
                {
                    name: 'apple',
                    coordinates: [51.505, -0.09]
                },
                {
                    name: 'banana',
                    coordinates: [51.505, -0.08]
                }
            ]
        }
    ])

    const [position, setPosition] = useState<LatLngExpression>(categories[0].places[0].coordinates)

    const [category, setCategory] = useState(categories[0].name)

    const deployPlaces = (cat: Category[], currCat: string) => {
        let placesArr: Places[] = []
        cat.forEach(c => {
            if (c.name === currCat) {
                console.log(c.name, category);
                c.places.forEach(p => {
                    placesArr.push(p)
                })
            }
        });

        return JSON.stringify(placesArr)
    }


    const [name, setName] = useState(deployPlaces(categories, category))

    return <>
        <div className='p-4 flex flex-wrap justify-end'>
        </div>
        <div className='flex w-screen' style={{
            fontFamily: 'tahoma'
        }}>
            <div className='flex w-1/2 justify-center items-center'>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '500px', width: '500px' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div className='flex w-1/2 items-center flex-col'>

                <div className='flex h-20 justify-center items-center'>

                    <h2 className='text-2xl'>category: </h2>
                    <select style={
                        {
                            boxShadow: '4px 4px black',
                        }
                    } defaultValue={name} className='ml-2 h-8 bg-white border-solid border-2 border-black p-1 rounded-md' onChange={
                        (e) => {
                            setCategory(e.target.value);
                            setName(deployPlaces(categories, e.target.value));
                        }


                    } >

                        {categories.map(({ name, places }) =>
                            <option key={name} value={name}>{name}</option>
                        )
                        }


                    </select>
                    <button onClick={() => {
                        navigate('/createcategory')
                    }} className='pt-1 ml-2'>
                        <PhPlusCircleFill className='h-8 w-8' />
                    </button>


                </div>
                <div className='flex flex-col h-2 justify-center items-center '>
                    {JSON.parse(name).map((e: Places) =>
                        <h1>{e.name}</h1>
                    )}
                </div>
            </div>

        </div>

    </>

};


export default Dashboard;