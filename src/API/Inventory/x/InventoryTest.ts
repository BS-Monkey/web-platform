import http from '@/common/http';
import API from '@/API';

const InventoryTest = {
    async getInventoryTest(integrationID: string): Promise<InventoryTest[]> {
        // const integrationId = API.Organization_v2.getCurrentId();
        const integrationId = '920d9f4d-55ae-44b1-85f8-e801e510a723';
        const response = await http.get('/inventory', {
            params: {
            integration_id: integrationID,
            },

        });
        const inventorytests = JSON.parse(JSON.stringify(response.data));
        return inventorytests;
    },
};

export default InventoryTest;
