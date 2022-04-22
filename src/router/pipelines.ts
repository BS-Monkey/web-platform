/* Pipelines */

import {RouteConfig} from 'vue-router';
import Utils from './utils';

import Pipelines from '@/views/main/Pipelines/Pipelines.vue';
import PipelinesIndex from '@/views/main/Pipelines/PipelinesIndex.vue';
import PipelineSettings from '@/views/main/Pipelines/PipelineSettings.vue';

const pipelines: RouteConfig = {
  path: 'pipelines',
  component: Pipelines,
  children: [
    {
      path: '/',
      name: 'Pipelines',
      component: PipelinesIndex,
    },
    {
      path: 'settings/:id',
      name: 'Pipeline Settings',
      component: PipelineSettings,
      props: true,
      beforeEnter: Utils.CheckRole,
    },
  ],
};

export default pipelines;
