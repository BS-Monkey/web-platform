import http from '@/common/http';
import API from '@/API';

const Inventory = {
    async getInventory(integrationID: string): Promise<Inventory[]> {
        // const integrationId = API.Organization_v2.getCurrentId();
        const integrationId = 'aaaaaaaaa-yyyy-xxxx-zzzz-1234567890';
        const response = await http.get('/inventory', {
            params: {
            integration_id: integrationID,
            },

        });
        const inventories = JSON.parse(JSON.stringify(response.data));
        return inventories;
    },
};


export default Inventory;
