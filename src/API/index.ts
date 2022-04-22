import Organization from './Organization';
import Integration from './Integration';
import Thresholdsv2 from './Thresholdsv2';
import Pipeline from './Pipeline';
import User from './User';
import UI from './UI';
import Dashboard from './Dashboard';
import Dashboardv2 from './Dashboardv2';
import Reports from './Reports';
import Masterfile from './Masterfile';
import Organization_v2 from './IAM/Organization';
import Role from './IAM/Role';
import Permission from './IAM/Permission';
import Scope from './IAM/Scope';
import IntegrationPolicy from './Governance/IntegrationPolicy';
import Policy from './Governance/Policy';
import Inventory from './Inventory/Inventory';
import InventoryTest from './Inventory/InventoryTest';

/* Integration APIs */
import GlobeBilling from './GlobeBilling';

const API = {
  Organization,
  Integration,
  Thresholdsv2,
  Pipeline,
  User,
  UI,
  Dashboard,
  Dashboardv2,
  Reports,
  GlobeBilling,
  Masterfile,
  Organization_v2,
  Role,
  Permission,
  Scope,
  IntegrationPolicy,
  Policy,
  Inventory,
  InventoryTest,
};

export default API;
