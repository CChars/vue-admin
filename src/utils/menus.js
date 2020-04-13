import { getRequest } from "../api/fourRequest.js";

export const initMenu = (router, store) => {
  if (store.state.route.route.length > 0) {
    return;
  }

  getRequest("/system/config/menu").then(data => {
    if (data) {
      // console.log("data" + data.data);
      let fmtRoute = formatRoute(data.data);

      // console.log("data");
      // console.log(fmtRoute);

      router.addRoutes(fmtRoute);
      store.commit("route/INIT_ROUTE", fmtRoute);
    }
  });
};

export const formatRoute = route => {
  let fmtRoute = [];

  route.forEach(router => {
    let { path, component, name, meta, iconcls, children } = router;

    if (children && children instanceof Array) {
      children = formatRoute(children);
    }

    let fmtRoutes = {
      path: path,
      name: name,
      icon: iconcls,
      meta: meta,
      children: children,
      component(resolve) {
        if (component.startsWith("Layout")) {
          require(["../views/Layout/" + component + ".vue"], resolve);
        } else if (component.startsWith("Console")) {
          require(["../views/console/" + component + ".vue"], resolve);
        } else if (component.startsWith("Info")) {
          require(["../views/Info/" + component + ".vue"], resolve);
        } else if (component.startsWith("User")) {
          require(["../views/User/" + component + ".vue"], resolve);
        }
      }
    };
    fmtRoute.push(fmtRoutes);
  });
  return fmtRoute;
};
