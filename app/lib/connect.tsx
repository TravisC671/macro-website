import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { call_rpc, get_hid_data, hid_usage_get_labels } from "@/lib/rpc";
import { useRpcStore } from "@/lib/store";
import { create_rpc_connection, Response } from "@zmkfirmware/zmk-studio-ts-client";
import { connect as serial_connect } from "@zmkfirmware/zmk-studio-ts-client/transport/serial";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

function remove_prefix(s?: string) {
  return s?.replace(/^Keyboard /, "");
}

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

    let response = await call_rpc(connection, {
      keymap: { getPhysicalLayouts: true },
    });

    let keymaps = response.keymap?.getPhysicalLayouts?.layouts;

    if (keymaps) {
      setPhysicalLayouts(keymaps);
      setSelectedLayout(0);
    }

    setRpcConnection(connection);

    // this is just a test to see how to get the data
    response = await call_rpc(connection, {
      keymap: { getKeymap: true }
    });

    console.log(response.keymap?.getKeymap?.layers[0].bindings[0])

    let {page, id} = get_hid_data(response.keymap?.getKeymap?.layers[0].bindings[0].param1!)

    let labels =  hid_usage_get_labels(page, id)

    console.log(remove_prefix(labels.short))
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
