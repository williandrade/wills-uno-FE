import React, {useEffect} from "react";
import "./Loby.css";
import logo from '../../assets/uno-logo.svg';
import {usePlayerStore} from "../../stores/PlayerStore";
import {Button, Input} from "@material-tailwind/react";
import {lowerCase} from "lodash";
import {LOCAL_STORAGE_NAME_KEY} from "../../common/constants";

function Loby() {
    const playerName = usePlayerStore((state) => state.player.name);
    const {setName, ready} = usePlayerStore();

    useEffect(() => {
        if(localStorage.getItem(LOCAL_STORAGE_NAME_KEY)) {
            setName(localStorage.getItem(LOCAL_STORAGE_NAME_KEY) || '');
        }
    }, []);

    return (
        <>
            <div className="container mx-auto h-screen">
                <form className="flex content-center justify-center"
                      onSubmit={() => ready()}>
                    <div
                        className="relative mt-20 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700">
                        <div className="relative m-6 mx-4 flex justify-center">
                            <img className="h-44" src={logo} alt="logo"/>
                        </div>
                        <div className="p-6">
                            <h5 className="text-blue-gray-900 block font-sans text-4xl font-semibold leading-snug tracking-normal antialiased">
                                Welcome to
                            </h5>
                            <h5 className="text-blue-gray-900 mb-2 block font-sans text-4xl font-light leading-snug tracking-normal antialiased">
                                Will's Uno
                            </h5>
                            <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                                It still a working in progress project, but feel free to join
                                and play with your friends.
                            </p>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="w-full">
                                <Input
                                    crossOrigin={"anonymous"}
                                    type="text"
                                    placeholder="Choose ur playername"
                                    autoFocus={true}
                                    className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                    containerProps={{ className: "min-w-[100px]" }}
                                    value={playerName}
                                    onChange={(e) => setName(lowerCase(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="p-6 pt-0">
                            <Button placeholder="" type="submit">
                                Let's GOOOOO!
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Loby;
