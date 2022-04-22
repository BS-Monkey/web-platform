import http from '@/common/http';
import API from '@/API';
import Auth from '@/common/auth';


const Inventory = {
  async getInventory(): Promise<any []> {
    const accessToken: string | undefined = Auth.getSession().accessToken;

    // const organizationId = API.Organization_v2.getCurrentId();
    try {
      // const inventoryData = await http.get(`https://platform.staging.cascadeo.io/inventory/assets/servicetypes`);
      const url = 'https://platform.staging.cascadeo.io/inventory?integration_id=aaaaaaaaa-yyyy-xxxx-zzzz-1234567890';
      console.log(url, accessToken);
      const inventoryData = await http.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('--------------------inventoryData-------------------', inventoryData);
      const inventory = JSON.parse(JSON.stringify(inventoryData));
      return inventory;
    } catch (error) {
      API.UI.addNotification({
        type: 'danger',
        text: 'Error retrieving data.',
      });
      throw error;
    }
  },
};

export default Inventory;
