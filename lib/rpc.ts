import {
  call_rpc as inner_call_rpc,
  Request,
  RequestResponse,
  RpcConnection,
} from "@zmkfirmware/zmk-studio-ts-client";
import { usagePages } from "./hid_data/keyboard-and-consumer-usage-tables.json"
import { hidOverrides } from "./hid_data/hid-usage-name-overrides.json"

interface HidLabels {
  short?: string;
  med?: string;
  long?: string;
}

const overrides: Record<string, Record<string, HidLabels>> = hidOverrides;

export async function call_rpc(
  conn: RpcConnection,
  req: Omit<Request, "requestId">
): Promise<RequestResponse> {
  console.log("RPC Request", req);
  return inner_call_rpc(conn, req)
    .then((r) => {
      console.log("RPC Response", r);
      return r;
    })
    .catch((e) => {
      console.error("RPC Error", e);
      return e;
    });
}

/**
 * from zmk-studio project
 * 
 * this gets the page and id from the value returned by using 
 * 
 * response = await call_rpc(connection, {
 *    keymap: { getKeymap: true }
 * });
 * 
 * this function extracts the upper 4 bytes as the page and the lower 4 bytes as the id
 * 
 * @param usage this is from response.keymap.layers.bindings[x].param1
 */
export function get_hid_data (usage:number): {page:number, id: number} {
  return ({
    page: (usage >> 16) & 0xffff,
    id: usage & 0xffff
  })
}


/**
 * This is directly from zmk studio
 * 
 * @param usage_page 
 * @param usage_id 
 * @returns 
 */
export const hid_usage_get_labels = (
  usage_page: number,
  usage_id: number
): { short?: string; med?: string; long?: string } =>
  overrides[usage_page.toString()]?.[usage_id.toString()] || {
    short: usagePages.find((p) => p.Id === usage_page)?.UsageIds?.find(
      (u) => u.Id === usage_id
    )?.Name,
  };