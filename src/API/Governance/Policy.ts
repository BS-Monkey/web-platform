import http from '@/common/http';
import API from '@/API';

const Policy = {
    async getPolicy(organizationID: string): Promise<Policy[]> {
        const organizationId = API.Organization_v2.getCurrentId();
        const response = await http.get('/governance/policies', {
            params: {
            organization_id: organizationID,
            },
        });
        const policies = JSON.parse(JSON.stringify(response.data));
        return policies;
    },
};

export default Policy;
