/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectionToken } from "@ogre-tools/injectable";
import type { IComputedValue } from "mobx";
import type { LensMainExtension } from "../../../extensions/lens-main-extension";

export interface TrayMenuItem {
  id: string;
  parentId: string | null;
  orderNumber: number;
  enabled: IComputedValue<boolean>;
  visible: IComputedValue<boolean>;

  label?: IComputedValue<string>;
  click?: () => Promise<void> | void;
  tooltip?: string;
  separator?: boolean;
  extension?: LensMainExtension;
}

export const trayMenuItemInjectionToken = getInjectionToken<TrayMenuItem>({
  id: "tray-menu-item",
});
