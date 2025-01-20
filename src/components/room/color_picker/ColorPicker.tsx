import {Button, Dialog, DialogBody, DialogHeader} from "@material-tailwind/react";
import {useState} from "react";
import {Color} from "../../../types";

function ColorPicker(props: { isOpen: boolean, handleOpen: (color?: Color) => void }) {
    return (<Dialog
        placeholder={""}
        size={"xs"}
        open={props.isOpen}
        handler={() => {
            props.handleOpen()
        }}
        animate={{
            mount: {scale: 1, y: 0, opacity: 1},
            unmount: {scale: 0.9, y: 1000, opacity: 0},
        }}>
        <DialogHeader placeholder={""}>What color do u wanna pick?</DialogHeader>
        <DialogBody placeholder={""}>
            <div className="flex flex-wrap gap-3 justify-between">
                <Button className="rounded-full" placeholder={""} color="blue"
                        onClick={() => props.handleOpen(Color.Blue)}>Blue</Button>
                <Button className="rounded-full" placeholder={""} color="red"
                        onClick={() => props.handleOpen(Color.Red)}>Red</Button>
                <Button className="rounded-full" placeholder={""} color="yellow"
                        onClick={() => props.handleOpen(Color.Yellow)}>Yellow</Button>
                <Button className="rounded-full" placeholder={""} color="green"
                        onClick={() => props.handleOpen(Color.Green)}>Green</Button>
            </div>
        </DialogBody>
    </Dialog>)
}

export default ColorPicker;