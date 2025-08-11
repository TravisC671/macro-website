import { RpcConnection } from "@zmkfirmware/zmk-studio-ts-client";
import {
  Keymap,
  PhysicalLayout,
} from "@zmkfirmware/zmk-studio-ts-client/keymap";
import { create } from "zustand";

type RpcStore = {
  rpcConnection: RpcConnection | undefined;
  physicalLayouts: PhysicalLayout[] | undefined;
  selectedLayout: number | undefined;
  keyMap: Keymap | undefined;
  setRpcConnection: (connection: RpcConnection) => void;
  setPhysicalLayouts: (layouts: PhysicalLayout[]) => void;
  setSelectedLayout: (index: number) => void;
  setKeymap: (keymap: Keymap) => void;
};

export const useRpcStore = create<RpcStore>((set) => ({
  rpcConnection: undefined,
  physicalLayouts: undefined,
  selectedLayout: undefined,
  keyMap: undefined,
  setRpcConnection: (connection) => set({ rpcConnection: connection }),
  setPhysicalLayouts: (layouts) => set({ physicalLayouts: layouts }),
  setSelectedLayout: (index) => set({ selectedLayout: index }),
  setKeymap: (keymap) => set({ keyMap: keymap }),
}));
