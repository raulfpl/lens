/**
 * Copyright (c) OpenLens Authors. All rights reserved.
 * Licensed under MIT License. See LICENSE in root directory for more information.
 */
import { getInjectable } from "@ogre-tools/injectable";
import { computed } from "mobx";

import clusterRoleBindingsRouteInjectable from "./cluster-role-bindings-route.injectable";
import navigateToRouteInjectable from "../../../routes/navigate-to-route.injectable";
import currentRouteInjectable from "../../../routes/current-route.injectable";
import { userManagementSidebarItemId } from "../user-management-sidebar-items.injectable";
import { sidebarItemsInjectionToken } from "../../layout/sidebar-items.injectable";

const clusterRoleBindingsSidebarItemsInjectable = getInjectable({
  id: "cluster-role-bindings-sidebar-items",

  instantiate: (di) => {
    const route = di.inject(clusterRoleBindingsRouteInjectable);
    const currentRoute = di.inject(currentRouteInjectable);
    const navigateToRoute = di.inject(navigateToRouteInjectable);

    return computed(() => [
      {
        id: "cluster-role-bindings",
        parentId: userManagementSidebarItemId,
        title: "Cluster Role Bindings",
        onClick: () => navigateToRoute(route),
        isActive: route === currentRoute.get(),
        isVisible: route.isEnabled(),
        priority: 40,
      },
    ]);
  },

  injectionToken: sidebarItemsInjectionToken,
});

export default clusterRoleBindingsSidebarItemsInjectable;