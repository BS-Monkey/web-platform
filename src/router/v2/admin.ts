/* Admin Portal */

import { RouteConfig } from 'vue-router';

import Admin_Welcome from '@/views/v2/main/Welcome.vue';
import Admin_Dashboard from '@/views/v2/admin/main/Dashboard.vue';
import Admin_Organizations from '@/views/v2/main/Organizations/OrganizationsIndex.vue';
import Admin_Users from '@/views/v2/admin/main/Users.vue';
import Admin_Home from '@/views/v2/admin/Home.vue';

const admin: RouteConfig = {
  path: 'admin',
  component: Admin_Home,
  children: [
    {
      path: '/',
      name: 'Admin Home',
      component: Admin_Home,
      redirect: 'dashboard',
    },
    {
      path: 'welcome',
      name: 'Admin Welcome',
      component: Admin_Welcome,
    },
    {
      path: 'dashboard',
      name: 'Admin Dashboard',
      component: Admin_Dashboard,
    },
    {
      path: 'organizations',
      name: 'Admin Organizations',
      component: Admin_Organizations,
    },
    {
      path: 'users',
      name: 'Admin_Users',
      component: Admin_Users,
    },
  ],
};

export default admin;
