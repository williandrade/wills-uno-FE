import React from 'react';
import './Loby.css';
import logo from '../../assets/uno-logo.svg';
import usePlayerStore from "../../stores/PlayerStore";

function Loby() {
    const playerName = usePlayerStore((state) => state.player.name);
    const { setName } = usePlayerStore();

    return (
        <>
            <div className="container mx-auto h-screen">
                <div className="flex justify-center content-center">
                    <div
                        className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                        <div
                            className="relative h-56 mx-4 m-6">
                            <img src={logo} alt="logo"/>
                        </div>
                        <div className="p-6">
                            <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Welcome to Will's Uno
                            </h5>
                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                It still a working in progress project, but feel free to join and play with your
                                friends.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="w-full">
                                <div className="relative w-full min-w-[200px] h-10">
                                    <input
                                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                        value={playerName}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder=""/>
                                    <label
                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                        Tell me your name...
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <button
                                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                                type="button">
                                Let's GOOOOO!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Loby;
