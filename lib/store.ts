import { RpcConnection } from "@zmkfirmware/zmk-studio-ts-client";
import { PhysicalLayout } from "@zmkfirmware/zmk-studio-ts-client/keymap";
import { create } from "zustand";

type RpcStore = {
  rpcConnection: RpcConnection | undefined;
  physicalLayouts: PhysicalLayout[] | undefined;
  selectedLayout: number | undefined;
  setRpcConnection: (connection: RpcConnection) => void;
  setPhysicalLayouts: (layouts: PhysicalLayout[]) => void;
  setSelectedLayout: (index: number) => void; 
};

export const useRpcStore = create<RpcStore>((set) => ({
  rpcConnection: undefined,
  physicalLayouts: undefined,
  selectedLayout: undefined,
  setRpcConnection: (connection) => set({ rpcConnection: connection }),
  setPhysicalLayouts: (layouts) => set({ physicalLayouts: layouts }),
  setSelectedLayout: (index) => set({selectedLayout: index})
}));
