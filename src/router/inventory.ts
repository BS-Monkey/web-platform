/* Inventory */

import { RouteConfig } from 'vue-router';
import Utils from './utils';

import InventoryManagement from '@/views/main/Inventory/InventoryManagement.vue';
import InventoryIndex from '@/views/main/Inventory/InventoryIndex.vue';

const assetmanager: RouteConfig = {
    path: 'asset-manager',
    component: InventoryManagement,
    children: [
      {
        path: '/',
        name: 'Inventories',
        component: InventoryIndex,
      },
    ],
    beforeEnter: Utils.VueAppEnvProd,
};

export default assetmanager;
