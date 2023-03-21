import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//icons
import { MajesticonsLogoutLine } from "./icons/MajesticonsLogoutLine";
import { MajesticonsPlusCircleLine } from "./icons/MajesticonsPlusCircleLine";
import { MajesticonsSettingsCogLine } from "./icons/MajesticonsSettingsCogLine";
import { PhTrash } from "./icons/PhTrash";

const ChangeCoordinates = ({
  coordinates,
}: {
  coordinates: LatLngExpression;
}) => {
  const map = useMap();
  map.setView(coordinates);
  return <></>;
};

const Dashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  type Place = {
    name: string;
    lat: number;
    lng: number;
  };

  const [places, setPlaces] = useState<Place[]>([]);

  const changeCategory = (e: any) => {
    const category = categories.find(
      (category) => category.name === e.target.value
    );
    if (category !== undefined && category.places.length > 0) {
      setActualPosition([category.places[0].lat, category.places[0].lng]);
      setSelectedCategory(category.name);
      setPlaces(category.places);
    } else {
      setActualPosition([0, 0]);
      setSelectedCategory("");
      setPlaces([]);
    }
  };

  const createCategory = (categoryName: string) => {
    const category = {
      name: categoryName,
      places: [],
    };
    setCategories([...categories, category]);
    setShowAddMenu(false);

    const fetchCategories = async () => {
      await fetch("http://localhost/api/addcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });
    };

    fetchCategories();
  };

  const deletePlace = (placeName: string) => {
    const newPlaces = places.filter((place) => place.name !== placeName);
    setPlaces(newPlaces);
    fetch("http://localhost/api/deleteplace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: placeName, category: selectedCategory }),
    }).then((res) => {
      alert("Place deleted");
    });
  };

  const createPlace = (
    placeName: string,
    category: string,
    lat: number,
    lng: number
  ) => {
    const place = {
      name: placeName,
      category: category,
      location: {
        lat: lat,
        lng: lng,
      },
    };

    const fetchPlaces = async () => {
      const res = await fetch("http://localhost/api/addplace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });
    };

    fetchPlaces();

    const newPlaces = places;
    newPlaces.push({ name: placeName, lat: lat, lng: lng });
    setPlaces(newPlaces);
    setShowAddMenu(false);
  };

  const [actualPosition, setActualPosition] = useState<LatLngExpression>([
    0, 0,
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const size = useRef([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost/api/categories");
      const data = await res.json();
      setCategories(data);
      setActualPosition([data[0].places[0].lat, data[0].places[0].lng]);
      setSelectedCategory(data[0].name);
      setPlaces(data[0].places);
    };
    fetchCategories();
  }, []);

  const [showAddMenu, setShowAddMenu] = useState<boolean>(false);

  const createSideBar = () => {
    const navigate = useNavigate();

    const [categoryName, setCategoryName] = useState<string>("");
    const [placeName, setplaceName] = useState<string>("");
    const [placeLat, setPlaceLat] = useState<string>("");
    const [placeLng, setPlaceLng] = useState<string>("");
    const [placeCategory, setPlaceCategory] = useState<string>("");

    return (
      <div className="w-[380px] h-screen bg-gray-200 fixed top-0 right-0 z-10">
        {showAddMenu == true ? (
          <div className="absolute w-full h-full">
            <div className="relative">
              <div className="absolute w-full h-14">
                <div className="flex w-full h-full items-center justify-center">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {" "}
                    Creation Panel
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full h-full items-center justify-center font-roboto bg-gray-200">
              <h2 className="text-xl text-gray-800">Category</h2>
              <input
                className="mt-2 rounded-md w-60 border-2 border-gray-500 outline-none placeholder-[#6c6c60] p-1"
                placeholder="Category Name"
                type="text"
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  createCategory(categoryName);
                }}
                className="mt-2 rounded-md w-60 bg-slate-800 text-gray-200 font-bold p-1"
              >
                Create
              </button>

              <h2 className="text-xl mt-10">Create Place</h2>
              <input
                className="mt-2 rounded-md w-60 border-2 border-gray-500 outline-none placeholder-[#6c6c60] p-1"
                placeholder="Place Name"
                type="text"
                onChange={(e) => {
                  setplaceName(e.target.value);
                }}
              />
              <input
                className="mt-2 rounded-md w-60 border-2 border-gray-500 outline-none placeholder-[#6c6c60] p-1"
                placeholder="Latitude"
                type="text"
                onChange={(e) => {
                  setPlaceLat(e.target.value);
                }}
              />
              <input
                className="mt-2 rounded-md w-60 border-2 border-gray-500 outline-none placeholder-[#6c6c60] p-1"
                placeholder="Longitude"
                type="text"
                onChange={(e) => {
                  setPlaceLng(e.target.value);
                }}
              />
              <div className="flex mt-2 w-60 items-center justify-start">
                <h2 className="text-sm">Select The Category</h2>
              </div>
              <select
                className="mt-1 rounded-md w-60 border-2 border-gray-500 outline-none placeholder-[#6c6c60] p-1"
                size={4}
                onChange={(e) => {
                  setPlaceCategory(e.target.value);
                }}
              >
                {categories.map((category) => {
                  return <option value={category.name}>{category.name}</option>;
                })}
              </select>
              <button
                onClick={() => {
                  setPlaces([
                    ...places,
                    {
                      name: placeName,
                      lat: parseFloat(placeLat),
                      lng: parseFloat(placeLng),
                    },
                  ]);
                  setActualPosition([
                    parseFloat(placeLat),
                    parseFloat(placeLng),
                  ]);

                  createPlace(
                    placeName,
                    placeCategory,
                    parseFloat(placeLat),
                    parseFloat(placeLng)
                  );
                }}
                className="mt-2 mb-10 rounded-md w-60 bg-slate-800 text-gray-200 font-bold p-1"
              >
                Create
              </button>
            </div>
          </div>
        ) : null}
        <div className="absolute bottom-0 right-0 w-full h-[50px]">
          <div className="flex w-full h-full items-center font-roboto bg-slate-300">
            <button
              onClick={() => {
                setShowAddMenu(!showAddMenu);
              }}
              className="text-2xl w-1/3 h-full flex justify-center items-center hover:bg-gray-400"
            >
              <MajesticonsPlusCircleLine />
            </button>
            <button className="text-2xl w-1/3 h-full flex justify-center items-center hover:bg-gray-400">
              <MajesticonsSettingsCogLine />
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="text-2xl w-1/3 h-full flex justify-center items-center hover:bg-gray-400"
            >
              <MajesticonsLogoutLine />
            </button>
          </div>
        </div>
        <h1 className="text-3xl p-2 pl-200 font-roboto font-semibold text-center">
          Data Urban Maps
        </h1>
        <select
          onChange={changeCategory}
          className="w-full text-center font-roboto text-2xl h-12  border-b-2 border-gray-300 bg-gray-200"
          name=""
          id=""
        >
          {categories.map((category) => {
            return <option value={category.name}>{category.name}</option>;
          })}
        </select>

        {places.map((place) => {
          return places.length > 0 ? (
            <>
              <div key={place.name}>
                <button
                  className="text-2xl  w-full p-2 hover:bg-gray-300 font-roboto"
                  onClick={() => {
                    setActualPosition([place.lat, place.lng]);
                  }}
                >
                  <div className="flex items-center pl-2">
                    {place.name}

                    <div className="text-xs pl-5 text-gray-500">
                      {place.lat}
                      {", "}
                      {place.lng}
                    </div>

                    <button
                      onClick={() => {
                        deletePlace(place.name);
                      }}
                      className="absolute right-0 mr-2 bg-gray-400 p-1 rounded-md"
                    >
                      <PhTrash></PhTrash>
                    </button>
                  </div>
                </button>
              </div>
            </>
          ) : null;
        })}
      </div>
    );
  };

  interface Places {
    name: string;
    lat: number;
    lng: number;
  }

  interface Category {
    name: string;
    places: Places[];
  }
  return (
    <>
      {createSideBar()}
      <MapContainer
        center={actualPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: `${size.current[1]}px`,
          width: `${size.current[0]}px`,
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "0",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {categories.map((category) => {
          return category.name === selectedCategory
            ? category.places.map((place) => {
                return (
                  <Marker position={[place.lat, place.lng]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                );
              })
            : null;
        })}

        <Marker position={actualPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeCoordinates coordinates={actualPosition} />
      </MapContainer>
    </>
  );
};

export default Dashboard;
