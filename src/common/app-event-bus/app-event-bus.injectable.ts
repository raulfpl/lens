/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { appEventBus } from "./event-bus";

const appEventBusInjectable = getInjectable({
  id: "app-event-bus",
  instantiate: () => appEventBus,
  causesSideEffects: true,
});

export default appEventBusInjectable;
