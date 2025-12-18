import React from 'react'
import App from "../App";
import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../Views/Layouts/BaseLayout';

import Register from '../Views/Screens/Register';
import NewChargerController from '../Views/Screens/NewChargerController';

// import ChargerController from '../Views/Screens/ChargerController';
import InternationalDonor from '../Views/Screens/InternationalDonor';
import InternationalPartner from '../Views/Screens/InternationalPartner';
// import MobileDevice from '../Views/Screens/MobileDevice';
import Administrator from '../Views/Screens/Administrator';
import ShowGraph from '../Views/Screens/ShowGraph';
import CleanCache from '../Views/Screens/CleanCache';
import Dashboard2 from '../Views/Screens/Dashboard2';


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Register />
            },
            // {
            //     path: "/home2",
            //     element: <BaseLayout><Dashboard /></BaseLayout>
            // },
            {
                path: "/dashboard",
                element: <BaseLayout><Dashboard2 /></BaseLayout>
            },
              {
                path: "/new_charger_controller",
                element: <BaseLayout><NewChargerController /></BaseLayout>
            },
          
            // {
            //     path: "/charger_controller",
            //     element: <BaseLayout><ChargerController /></BaseLayout>
            // },
            {
                path: "/international_donor",
                element: <BaseLayout><InternationalDonor /></BaseLayout>
            },
            {
                path: "/international_partner",
                element: <BaseLayout><InternationalPartner /></BaseLayout>
            },
            // {
            //     path: "/mobile_device",
            //     element: <BaseLayout><MobileDevice /></BaseLayout>
            // },
            {
                path: "/administrator",
                element: <BaseLayout><Administrator /></BaseLayout>
            },
            {
                path: "/show_graph",
                element: <BaseLayout><ShowGraph /></BaseLayout>
            },
            {
                path: "/clean_cache",
                element: <BaseLayout><CleanCache /></BaseLayout>
            },
        ]
    }
])
export default routes