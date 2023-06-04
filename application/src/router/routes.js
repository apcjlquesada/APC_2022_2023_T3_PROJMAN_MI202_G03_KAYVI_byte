const routes = [
  //{
  //  path:"/start",
  //  component: () => import("layouts/SplashLayout.vue"),
  //  children: [
  //    { path: "/",
  //      name: "Start",
  //      component: () => import("src/pages/Authentication/Start.vue")
  //    }
  //  ]
  //},

  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      /*
========================================================================================
      AUTHENTICATION
========================================================================================
      */
      {
        path: "/login",
        name: "login",
        component: () => import("src/pages/Authentication/Index.vue")
      },
      /*
========================================================================================
      GENERAL
========================================================================================
      */
      {
        path: "/home",
        name: "Home",
        component: () => import("src/pages/home.vue"),
      },
      {
        path: "/myprofile",
        name: "My Profile",
        component: () => import("src/pages/myprofile.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/ViewIR",
        name: "View Incident Report",
        component: () => import("src/components/IncidentReports/ViewIR.vue"),
      },

      /*
========================================================================================
      HEAD GUARD & Guard
========================================================================================
      */
      {
        path: "/headguardhome",
        name: "Head Guard Home",
        component: () => import("src/pages/headGuard/headGuardhome.vue"),
      },
      {
        path: "/newpatrol",
        name: "New Patrol",
        component: () => import("src/components/Patrols/NewPatrol.vue"),
      },
      {
        path: "/summary",
        name: "summary",
        component: () => import("src/pages/headGuard/Summary.vue"),
      },
      {
        path: "/createir",
        name: "Create Incident Report",
        component: () => import("src/components/IncidentReports/CreateIR.vue"),
      },
      {
        path: "/createlog",
        name: "Create Log",
        component: () => import("src/components/Logbook/CreateLog.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/viewlog",
        name: "View Log",
        component: () => import("src/components/Logbook/ViewLog.vue"),
        meta: {
          requiresAuth: true
        }
      },
      /*
========================================================================================
      BMO
========================================================================================
      */
      {
        path: "/bmoHome",
        name: "bmoHome",
        component: () => import("src/pages/bmo/bmoHome.vue"),
      },
      /*
========================================================================================
      ITRO
========================================================================================
      */
      {
        path: "/itroHome",
        name: "itroHome",
        component: () => import("src/pages/itro/itroHome.vue"),
      },
      {
        path: "/register",
        name: "User Registration",
        component: () => import("src/pages/itro/Register.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/viewusers",
        name: "Members",
        component: () => import("src/pages/itro/viewusers.vue"),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/userdetails",
        name: "userdetails",
        component: () => import("src/components/Modals/UserDetails.vue"),
        meta: {
          requiresAuth: true
        }
      },

      {
        path: "/insights",
        name: "Insights",
        component: () => import("src/components/Insights/Insights.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
