import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { get_hid_label, remove_keyboard_prefix } from "@/lib/rpc";
import { useRpcStore } from "@/lib/store";
import { KeyPhysicalAttrs } from "@zmkfirmware/zmk-studio-ts-client/keymap";

type KeyProps = {
  attr: KeyPhysicalAttrs;
  idx: number;
};
export default function Key({ attr, idx }: KeyProps) {
  const keyMap = useRpcStore((state) => state.keyMap);

  let usage = keyMap?.layers[0].bindings[idx].param1;

  let hidLabel = usage
    ? remove_keyboard_prefix(get_hid_label(usage).short)
    : undefined;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          variant={"outline"}
          className="absolute"
          style={{
            width: `${attr.width}px`,
            height: `${attr.height}px`,
            top: `${attr.y}px`,
            left: `${attr.x}px`,
          }}
        >
          {hidLabel}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
