/* Governance */

import { RouteConfig } from 'vue-router';
import Utils from './utils';

import Governance from '@/views/main/Governance/Governance.vue';
import GovernanceIndex from '@/views/main/Governance/GovernanceIndex.vue';

const governance: RouteConfig = {
    path: 'governance',
    component: Governance,
    children: [
      {
        path: '/',
        name: 'GovernancePolicies',
        component: GovernanceIndex,
      },
    ],
    beforeEnter: Utils.VueAppEnvProd,
};

export default governance;
