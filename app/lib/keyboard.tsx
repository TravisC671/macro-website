import { Button } from "@/components/ui/button";
import { useRpcStore } from "@/lib/store";
import { KeyPhysicalAttrs } from "@zmkfirmware/zmk-studio-ts-client/keymap";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function Keyboard() {
  const { physicalLayouts, selectedLayout } = useRpcStore(
    useShallow((state) => ({
      physicalLayouts: state.physicalLayouts,
      selectedLayout: state.selectedLayout,
    }))
  );

  useEffect(() => {}, [physicalLayouts]);

  if (selectedLayout == undefined || physicalLayouts == undefined) {
    return <></>;
  }

  let keys = physicalLayouts[selectedLayout].keys;

  let width = getMaxBoundary(keys, "width");
  let height = getMaxBoundary(keys, "height");

  console.log(physicalLayouts[selectedLayout]);

  return (
    <div
      className="relative"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {physicalLayouts[selectedLayout].keys.map((attr, idx) => (
        <Button
          variant={"outline"}
          className="absolute"
          key={`physKeys${idx}`}
          style={{
            width: `${attr.width}px`,
            height: `${attr.height}px`,
            top: `${attr.y}px`,
            left: `${attr.x}px`,
          }}
        ></Button>
      ))}
    </div>
  );
}

function getMaxBoundary(
  keys: KeyPhysicalAttrs[],
  direction: "width" | "height"
) {
  let max = 0;

  for (let i = 0; i < keys.length; i++) {
    let edge =
      direction == "width"
        ? keys[i].width + keys[i].x
        : keys[i].height + keys[i].y;

    if (edge > max) {
      max = edge;
    }
  }

  return max;
}
