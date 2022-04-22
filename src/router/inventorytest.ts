/* InventoryTest */

import { RouteConfig } from 'vue-router';
import Utils from './utils';

import InventoryTest from '@/views/main/InventoryTest/InventoryTest.vue';
import InventoryTestIndex from '@/views/main/InventoryTest/InventoryTestIndex.vue';

const inventorytest: RouteConfig = {
    path: 'inventorytest',
    component: InventoryTest,
    children: [
      {
        path: '/',
        name: 'InventoryTestName',
        component: InventoryTestIndex,
      },
    ],
    beforeEnter: Utils.VueAppEnvProd,
};

export default inventorytest;
