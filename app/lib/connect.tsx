import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { call_rpc } from "@/lib/rpc";
import { useRpcStore } from "@/lib/store";
import { create_rpc_connection } from "@zmkfirmware/zmk-studio-ts-client";
import { connect as serial_connect } from "@zmkfirmware/zmk-studio-ts-client/transport/serial";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export default function Connect() {
  const [open, setOpen] = useState(true);

  const { setRpcConnection, setPhysicalLayouts, setSelectedLayout } =
    useRpcStore(
      useShallow((state) => ({
        setPhysicalLayouts: state.setPhysicalLayouts,
        setRpcConnection: state.setRpcConnection,
        setSelectedLayout: state.setSelectedLayout,
      }))
    );

  const connectToSerial = async () => {
    let transport = await serial_connect();

    let connection = create_rpc_connection(transport);

    const response = await call_rpc(connection, {
      keymap: { getPhysicalLayouts: true },
    });

    let keymaps = response.keymap?.getPhysicalLayouts?.layouts;

    if (keymaps) {
      setPhysicalLayouts(keymaps);
      setSelectedLayout(0);
    }

    setRpcConnection(connection);

    setOpen(false);
  };

  const serialConnect = () => {
    console.log("connected");
  };

  const serialDisconnect = () => {
    console.log("disconnected");
  };

  useEffect(() => {
    navigator.serial.addEventListener("connect", serialConnect);
    navigator.serial.addEventListener("disconnect", serialDisconnect);

    return () => {
      navigator.serial.removeEventListener("connect", serialConnect);
      navigator.serial.removeEventListener("disconnect", serialDisconnect);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-[300px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="mb-2">Please connect your device</DialogTitle>
          <DialogDescription>
            <Button onClick={connectToSerial}>Connect Device</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
