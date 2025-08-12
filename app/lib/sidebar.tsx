import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRpcStore } from "@/lib/store";
import { useShallow } from "zustand/shallow";

export default function Sidebar() {
  const { keyMap, selectedLayout, setSelectedLayout } = useRpcStore(
    useShallow((state) => ({
      keyMap: state.keyMap,
      selectedLayout: state.selectedLayout,
      setSelectedLayout: state.setSelectedLayout,
    }))
  );

  console.log(keyMap?.layers);

  if (keyMap == undefined || selectedLayout == undefined) {
    return <></>
  }

  //TODO make it so that the right click is quick access menu and the left click brings up advanced options for the key
  return (
    <Card className="absolute top-5 left-5 w-[275px] rounded-reg">
      <CardHeader>
        <CardTitle>Keyboard Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <h2>Layer Properties</h2>
        <Select value={selectedLayout.toString()} onValueChange={(value) => parseInt(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {keyMap.layers.map((layer, index) => (
                <SelectItem
                  key={`layers${index}`}
                  value={index.toString()}
                >{`${index}${getLayerName(layer.name)}`}</SelectItem>
              ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

function getLayerName(name: string) {
  if (name == "") return name;

  return ` - ${name}`;
}
