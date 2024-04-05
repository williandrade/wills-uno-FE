import logo from "../../assets/uno-logo.svg";
import React from "react";
import {generateAvatarUrl} from "../../common/helper";
import {useUnoStore} from "../../stores/UnoStore";
import {usePlayerStore} from "../../stores/PlayerStore";
import {Avatar, Button, Tooltip} from "@material-tailwind/react";
import {motion} from "framer-motion"

function AwaitingRoom() {
    const {startGame} = useUnoStore();
    const players = useUnoStore(state => state.players);
    const player = usePlayerStore(state => state.player);

    return (
        <div className="container mx-auto h-screen">
            <div className="flex content-center justify-center">
                <div
                    className="relative mt-20 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700">
                    <div className="relative m-6 mx-4 flex justify-center">
                        <img className="h-24" src={logo} alt="logo"/>
                    </div>
                    <div className="p-6">
                        <h5 className="text-blue-gray-900 block font-sans text-4xl font-semibold leading-snug tracking-normal antialiased">
                            Awaiting Players
                        </h5>
                        <p className="block text-base font-light">
                            Awaiting the minimum number of players to join
                        </p>
                    </div>
                    <div className="flex flex-row -space-x-2.5 justify-center mb-14 mt-10">
                        <motion.div
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{
                                duration: 0.3,
                                ease: [0, 0.71, 0.2, 1.01],
                                scale: {
                                    type: "spring",
                                    damping: 5,
                                    stiffness: 100,
                                    restDelta: 0.001
                                }
                            }}
                        >
                            <Tooltip content={player.name} key={0}>
                                <Avatar
                                    placeholder={player.name}
                                    variant="circular"
                                    alt={player.name}
                                    className="border-2 border-white hover:z-10 focus:z-10"
                                    size="lg"
                                    src={generateAvatarUrl()}
                                />
                            </Tooltip>
                        </motion.div>
                        {players.map((eachPlayer, index) => (
                            <motion.div
                                initial={{opacity: 0, scale: 0.5}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{
                                    duration: 0.3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                    scale: {
                                        type: "spring",
                                        damping: 5,
                                        stiffness: 100,
                                        restDelta: 0.001
                                    }
                                }}
                            >
                                <Tooltip content={eachPlayer.name} key={index + 1}>
                                    <Avatar
                                        placeholder={eachPlayer.name}
                                        variant="circular"
                                        alt={eachPlayer.name}
                                        className="border-2 border-white hover:z-10 focus:z-10"
                                        size="lg"
                                        src={generateAvatarUrl()}
                                    />
                                </Tooltip>
                            </motion.div>
                        ))}
                    </div>
                    <p className="block text-base font-light text-center text-gray-500">
                        {players.length + 1} players on
                    </p>
                    <div className="flex justify-center mt-10">
                        <Button placeholder="" type="button" onClick={() => startGame()}>
                            Start the Game
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AwaitingRoom;