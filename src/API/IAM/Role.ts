import http from '@/common/http';
import Iam from '@/common/iam';

const Role = {
  async getAll(organizationID: string, includeInternal: boolean): Promise<Role[]> {
    const response = await http.get(`iam/roles`, { params: {
      organization_id: organizationID,
      include_internal: includeInternal,
    }});
    return response.data;
  },
  async get(roleID: string): Promise<Role> {
    const response = await http.get(`iam/roles/${roleID}`);
    return response.data;
  },
  async add(role: Role): Promise<Role> {
    const response = await http.put(`iam/roles`, role);
    return response.data;
  },
  async delete(roleID: string): Promise<Role> {
    const response = await http.delete(`iam/roles/${roleID}`);
    return response.data;
  },
};
export default Role;
