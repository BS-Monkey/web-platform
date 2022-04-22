import http from '@/common/http';
import API from '@/API';
import Auth from '@/common/auth';

const Inventory = {
  async getInventory(integrationID: string, searchText: string = ''): Promise<any[]> {
    // const accessToken: string | undefined = Auth.getSession().accessToken;
    try {
      // const inventoryData = await http.get(`https://platform.staging.cascadeo.io/inventory/assets/servicetypes`);
      // const url = `${process.env.VUE_APP_API_BASE_V1}/inventory`;
      // const url = `${process.env.VUE_APP_API_BASE_V1}/asset/servicetypes?integration_id=${integrationID}`;
      const inventoryData = await http.get(
        '/inventory', {
        params: {
          integration_id: integrationID,
        },
      });
      console.log('--------------------inventoryData-------------------', inventoryData);
      const inventories = JSON.parse(JSON.stringify(inventoryData.data));

      if (searchText === '') {
        return inventories;
      }

      const searchResult: Inventory[] = [];
      const lowerSearchText: string = searchText.toLowerCase();
      inventories.forEach((value) => {
        /*
        if (value.name.toLowerCase().includes(lowerSearchText) || value.description.toLowerCase().includes(lowerSearchText)) {
          searchResult.push(value);
        }
        if (value.children) {
          searchResult = this.searchChildOrgByKeyword(value.children, lowerSearchText, searchResult);
        }
        */
      });
      return searchResult;
    } catch (error) {
      API.UI.addNotification({
        type: 'danger',
        text: 'Error retrieving data.',
      });
      throw error;
    }
  },

  async getServiceType(integrationID: string): Promise<Inventory[]> {
    // const integrationId = API.Organization_v2.getCurrentId();
    const response = await http.get(
      '/asset/servicetypes', {
      params: {
        integration_id: integrationID,
      },
    });
    const serviceTypes = JSON.parse(JSON.stringify(response.data));
    return serviceTypes;
  },
};

export default Inventory;

/*
==========================================================================


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
*/
