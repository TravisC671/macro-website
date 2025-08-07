"use client";

import { call_rpc } from "@/lib/rpc";
import { delay } from "@/lib/utils";
import {
  create_rpc_connection,
  Request,
} from "@zmkfirmware/zmk-studio-ts-client";
import { RpcTransport } from "@zmkfirmware/zmk-studio-ts-client/transport/index";
import { connect as serial_connect } from "@zmkfirmware/zmk-studio-ts-client/transport/serial";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const connectToSerial = async () => {
    let transport = await serial_connect();
    console.log(transport);

    let connection = create_rpc_connection(transport);

    delay(5000);
    
    call_rpc(connection, {
      keymap: { getPhysicalLayouts: true },
    });
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
    <div className="">
      <button onClick={connectToSerial}>RAAAAAAAAAAAH</button>
    </div>
  );
}
