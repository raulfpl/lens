/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";
import { trayMenuItemInjectionToken } from "../tray/tray-menu-item/tray-menu-item-injection-token";
import quitAndInstallUpdateInjectable from "../electron-app/features/quit-and-install-update.injectable";
import discoveredUpdateVersionInjectable from "../../common/application-update/discovered-update-version/discovered-update-version.injectable";
import updateIsBeingDownloadedInjectable from "../../common/application-update/update-is-being-downloaded/update-is-being-downloaded.injectable";
import { withErrorSuppression } from "../../common/utils/with-error-suppression/with-error-suppression";
import { pipeline } from "@ogre-tools/fp";
import withErrorLoggingInjectable from "../../common/utils/with-error-logging/with-error-logging.injectable";

const installApplicationUpdateTrayItemInjectable = getInjectable({
  id: "install-update-tray-item",

  instantiate: (di) => {
    const quitAndInstallUpdate = di.inject(quitAndInstallUpdateInjectable);
    const discoveredVersionState = di.inject(discoveredUpdateVersionInjectable);
    const downloadingUpdateState = di.inject(updateIsBeingDownloadedInjectable);
    const withErrorLoggingFor = di.inject(withErrorLoggingInjectable);

    return {
      id: "install-update",
      parentId: null,
      orderNumber: 50,

      label: computed(() => {
        const versionToBeInstalled = discoveredVersionState.value.get()?.version;

        return `Install update ${versionToBeInstalled}`;
      }),

      enabled: computed(() => true),

      visible: computed(
        () => !!discoveredVersionState.value.get() && !downloadingUpdateState.value.get(),
      ),

      click: pipeline(
        quitAndInstallUpdate,

        withErrorLoggingFor(() => "[TRAY]: Update installation failed."),

        // TODO: Find out how to improve typing so that instead of
        // x => withErrorSuppression(x) there could only be withErrorSuppression
        (x) => withErrorSuppression(x),
      ),
    };
  },

  injectionToken: trayMenuItemInjectionToken,
});

export default installApplicationUpdateTrayItemInjectable;
