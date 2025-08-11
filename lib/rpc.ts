import {
  call_rpc as inner_call_rpc,
  Request,
  RequestResponse,
  RpcConnection,
} from "@zmkfirmware/zmk-studio-ts-client";
import { usagePages } from "./hid_data/keyboard-and-consumer-usage-tables.json";
import { hidOverrides } from "./hid_data/hid-usage-name-overrides.json";

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
 * this gets the hid label from a usage number
 *
 * response = await call_rpc(connection, {
 *    keymap: { getKeymap: true }
 * });
 *
 * @param usage response.keymap.layers.bindings[x].param1
 */
export function get_hid_label(usage: number): HidLabels {
  let usage_page = (usage >> 16) & 0xff;
  let usage_id = usage & 0xffff;

  return overrides[usage_page.toString()]?.[usage_id.toString()] || {
    short: usagePages.find((p) => p.Id === usage_page)?.UsageIds?.find(
      (u) => u.Id === usage_id
    )?.Name,
  };
}

export function remove_keyboard_prefix(s?: string) {
  return s?.replace(/^Keyboard /, "");
}