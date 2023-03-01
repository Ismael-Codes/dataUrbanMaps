import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mapImage from "../public/undraw_map_re_60yf.svg";

export function TablerBrandGithub(props: any) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
      ></path>
    </svg>
  );
}
const Root = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleLogin = async () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <img src={mapImage} alt="map" className="w-96 h-96 mr-10" />

        <div className="flex flex-col items-end mr-10">
          <h1
            style={{ fontFamily: "tahoma" }}
            className="text-2xl mb-4 font-bold"
          >
            Data Urban Maps
          </h1>
          <form
            id="githubButton"
            onSubmit={(e) => e.preventDefault()}
            action=""
            style={{
              boxShadow: "10px 10px black",
              border: "3px solid black",
              fontFamily: "tahoma",
            }}
            className="bg-white flex justify-center items-center flex-col w-80"
          >
            <input
              className="mt-5 w-60 border-b-2 border-black outline-none placeholder-[#6c6c60] pb-2"
              placeholder="Username"
              type="text"
              name="name"
              id="name"
              onChange={() => {
                setName(
                  (document.getElementById("name") as HTMLInputElement).value
                );
              }}
            />

            <input
              className="mt-5 w-60 border-b-2 border-black outline-none placeholder-[#6c6c60] pb-2"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              onChange={() => {
                setPassword(
                  (document.getElementById("password") as HTMLInputElement)
                    .value
                );
              }}
            />
            <button
              onClick={handleLogin}
              type="submit"
              className="bg-white border-2 border-black text-black w-60 mt-5 h-10 "
            >
              Login
            </button>
            <h2 className="text-[#35352f] py-1">or connect with</h2>

            <button className=" flex justify-center items-center bg-black w-60 h-10 cursor-not-allowed">
              <TablerBrandGithub className="text-white w-8 h-8"></TablerBrandGithub>
            </button>

            <h2 className="text-[#e35a5a] pt-1 pb-2">{response}</h2>
          </form>
        </div>
      </div>
    </>
  );
};

export default Root;
