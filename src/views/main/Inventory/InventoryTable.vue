<template>
  <div>
    <div>
      <div class="row cxs12">
        <div class="row cxs12">
          <div v-for="(check, index) in checkList" v-bind:key="check" style="display: contents">
            <div style="margin-right: 20px;">
              <input :id="`cb${index}`" :name="`cb${index}`" type="checkbox" :v-model="`${check}`" @click="checkedFun()" v-if="index==0" checked/>
              <input :id="`cb${index}`" :name="`cb${index}`" type="checkbox" :v-model="`${check}`" @click="checkedFun()" v-else/>
              <label :id="`cb${index}-${index}`" :for="`cb${index}`" class="cb-texts" style="text-transform: capitalize">{{ check }} </label>
            </div>
          </div>
          <div class="cxs5" inline>
            <div class="search">
              <input type="text" v-model="searchText" v-on:keyup="searchFunByEnter" class="searchTerm" placeholder="What are you looking for?">
              <button type="submit" class="searchButton" @click="searchFun()">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div>
      <div class="tree">
        <table border="1" class="styled-table" style="height:100px;overflow:auto;" width="100%">
          <thead style="background-color:hsl(192deg 71% 92%);">
            <tr>
              <!-- <th class="default">#</th> -->
              <th class="default" style="padding: 30px;">IntegrationID</th>
              <th class="default" style="padding: 30px">ResourceID</th>
              <!-- <th class="default" style="padding: 30px;">FirstSeen</th>
              <th class="default" style="padding: 30px;">LastSeen</th> -->
              <!-- <th class="default" style="padding: 30px">Region</th> -->
              <th class="default" style="padding: 30px">ServiceType</th>
              <!-- <th class="default" style="padding: 30px">Tags</th> -->
              <th class="default" style="padding: 30px">Metadata</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user) in inventoryData" v-bind:key="user.email">
              <td style="padding-left: 20px; width: 30% !important;">
                <!-- <td style="padding-left: 20px" v-if="!user.role.includes('owner')">-->
                <!--class="button danger link" -->
                <span v-if="user.integration_id">{{ user.integration_id }}</span><span v-else>-</span>
              </td>
              <!--<td style="padding-left: 40px;" v-if="user.role.includes('owner')">-->
              <td style="padding-left: 40px; width: 30% !important;"><span v-if="user.resource_id">{{ user.resource_id }}</span><span v-else>-</span></td>
              <!-- <td style="padding-left: 40px; width: 80.66% !important;">{{ user.id }}</td> -->
              <!-- <td style="padding: 15px; width: 18% !important;"><span v-if="user.first_seen">{{ user.first_seen | dateTime }}</span><span v-else>-</span></td>
              <td style="padding: 15px; width: 18% !important;"><span v-if="user.last_seen">{{ user.last_seen | dateTime }}</span><span v-else>-</span></td>
              <td style="text-align:center;width: 7% !important;"><span v-if="user.region">{{ user.region }}</span><span v-else>-</span></td> -->
              <td style="text-align:center;width: 25% !important;"><span v-if="user.service_type">{{ user.service_type }}</span><span v-else>-</span></td>
              <td class="right">
                  <pre id="json"></pre>
                  {{ user.metadata }}
                  JSON.stringify(data, undefined, 2)
                
                <span v-if="user.metadata.length > 2">Limit display</span>
                <span v-else>-nothing<br></span>
                <button v-if="user.metadata" @click="showMetadata(user.integration_id)">
                  show metadata
                </button>
                  <!-- <span v-for="val of user.metadata.Tags" v-bind:key="val.value">
                    <span class="tagContent" :title="val.Value">{{val.Value}}</span>
                  </span> -->
                <span v-else>
                -
                </span>
              </td>
              <!-- <td v-if="user.active" style="padding: 15px">
              {{ user.last_login | dateTime }}
            </td>
            <td v-else style="padding: 15px">
              -
              </td>-->
              <modal style="width: 100%" v-model="showModal">
                <h2>Metadata</h2>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">Architectures</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.Architectures">{{ metadata.Architectures[0] }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">CodeSha256</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.CodeSha256">{{ metadata.CodeSha256 }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">CodeSize</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.CodeSize">{{ metadata.CodeSize }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">Description</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.Description">{{ metadata.Description }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">Environment</label>
                  </div>
                  <div class="cb cxs9">
                    <div v-if="metadata !== {} && metadata.Environment">
                      <label for="cb1" class="cb-texts">{{ metadata.Environment.Variables.DYNAMODB_TABLE_NAME }}</label><br />
                      <label for="cb1" class="cb-texts">{{ metadata.Environment.Variables.QUEUE_URL }}</label>
                    </div>
                    <div v-else>
                      <label for="cb1" class="cb-texts"> - </label><br />
                    </div>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">FunctionArn</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.FunctionArn">{{ metadata.FunctionArn }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">FunctionName</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.FunctionName">{{ metadata.FunctionName }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">Handler</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.Handler">{{ metadata.Handler }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">LastModified</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.LastModified">{{ metadata.LastModified }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">MemorySize</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.MemorySize">{{ metadata.MemorySize }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">PackageType</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.PackageType">{{ metadata.PackageType }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">RevisionId</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.RevisionId">{{ metadata.RevisionId }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">Role</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.Role">{{ metadata.Role }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">Runtime</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.Runtime">{{ metadata.Runtime }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">Timeout</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.Timeout">{{ metadata.Timeout }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">TracingConfig</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.TracingConfig">{{ metadata.TracingConfig.Mode }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
                <div class="row cxs12">
                  <div class="cb cxs3">
                    <label for="cb1" class="cb-texts">Version</label>
                  </div>
                  <div class="cb cxs9">
                    <label for="cb1" class="cb-texts" v-if="metadata !== {} && metadata.Version">{{ metadata.Version }}</label>
                    <label for="cb1" class="cb-texts" v-else> - </label>
                  </div>
                </div>
              </modal>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Watch, Component } from 'vue-property-decorator';
import API from '@/API';
import _ from 'lodash';
import './inventery.css';

@Component
export default class InventoryTable extends Vue {
  private checkList: any = [];
  private inventoryData: any = [];
  private tempData: any = [];
  private assignData: any = [];
  private searchData: any = [];
  private ec2Check: boolean = false;
  private rdsCheck: boolean = false;
  private s3Check: boolean = false;
  private cloudWatchCheck: boolean = false;
  private lambdaCheck: boolean = false;
  private serviceTypeCheck: boolean = false;
  private regionCheck: boolean = false;
  private showRemoveModal: boolean = false;
  private searchText: string = '';
  private showModal: boolean = false;
  private metadata: any = JSON.stringify([], undefined, 2) ;
  private integrations: Array<Integration<All>> = [];

  private str_limit(value, size) {
      if (!value) {
        return '';
      }
      value = value.toString();

      if (value.length <= size) {
        return value;
      }
      return value.substr(0, size) + '...';
    }

  get currentOrg(): string {
    return API.Organization_v2.getCurrentId();
  }

  private created(): void {
    this.getInventoryDetails();
    this.getCheckBoxList();
    this.checkedFun();
    if (this.currentOrg) {
      this.getIntegrations();
    }
  }

  @Watch('currentOrg')
  private updateSelected() {
    this.getIntegrations();
  }

  private getIntegrations(): any {
    API.Integration.get().then((res) => {
      this.integrations = res;
      this.sort();
    });
  }

  @Watch('integrations')
  private sort(): void {
    this.integrations.forEach((x, i) => {
      // Hardcode threshold evaluator setting for now until we add new metadata to integrations
      if (x.definition_id === 'globe_billing') {
        this.integrations[i].metadata.threshold_evaluator = 'globe_billing';
      } else {
        this.integrations[i].metadata.threshold_evaluator = 'alertsv2';
      }
    });
  }

  @Watch('integrations')
  private getInventoryDetails(): void {
    if (this.integrations.length > 0) {
      console.log(this.integrations);
      for (const integration of this.integrations) {
        API.Inventory.getInventory(integration.id).then((response) => {
          /* tslint:disable:no-string-literal */
          this.inventoryData = this.inventoryData.concat(response ? response : []);
          this.tempData = this.inventoryData;
          /* tslint:enable:no-string-literal */
        // this.inventoryData .sort((a: any, b: any) => a.email.localeCompare(b.email));
        // });
        });
      }
    }
  }

  @Watch('inventoryData')
  private getCheckBoxList(): void {
    for (const integration of this.integrations) {
      API.Inventory.getServiceType(integration.id).then((response) => {
        console.log(response);
        /* tslint:disable:no-string-literal */
        for (const key in response) {
          if (this.checkList.length > 0) {
            for (let i = 0; i < this.checkList.length; i ++) {
              if (key.split('_')[0].toLowerCase() === this.checkList[i].toLowerCase()) {
                break;
              }
              if (i === this.checkList.length - 1) {
                this.checkList.push(key.split('_')[0].toLowerCase());
              }
            }
          } else {
            this.checkList.push(key.split('_')[0].toLowerCase());
          }
        }
      });
    }
  }

  private showMetadata(integrationId: string): void {
    this.showModal = !this.showModal;
    const selectedInventory = this.inventoryData.find((data) => data.integration_id === integrationId);
    this.metadata = selectedInventory ? selectedInventory.metadata : {};
  }

  @Watch('checkList')
  private checkedFun(): void {
    if (this.checkList.length < 1) { return; }
    this.assignData = [];
    for (let i = 0; i < this.checkList.length; i ++) {
      const check = document.getElementById(`cb${i}`) as HTMLInputElement;
      const checkName = document.getElementById(`cb${i}-${i}`) as HTMLLabelElement;

      if (check?.checked) {
        this.filterData(checkName.innerText);
      }
    }

    let allUnChecked = false;

    for (let i = 0; i < this.checkList.length; i ++) {
      const check = document.getElementById(`cb${i}`) as HTMLInputElement;
      if (check?.checked) { break; }
      if (i === this.checkList.length - 1) { allUnChecked = true; }
    }

    if (allUnChecked) {
      if (this.searchText === '') {
        this.inventoryData = this.tempData;
      } else {
        this.inventoryData = this.searchData;
      }
    } else {
      this.inventoryData = this.assignData;
    }
  }

  private filterData(serviceType): void {
    if (this.searchText === '') {
      console.log(this.inventoryData);
      _.filter(this.tempData, (item) => {
        if (item.service_type.toLowerCase().indexOf(serviceType.toLowerCase()) > -1) {
          this.assignData.push(item);
        }
      });
    } else {
      _.filter(this.searchData, (item) => {
        if (item.service_type.toLowerCase().indexOf(serviceType.toLowerCase()) > -1) {
          this.assignData.push(item);
        }
      });
    }
  }

  private searchFun(): void {
    if (this.searchText !== '') {
      console.log(this.inventoryData);
      // this.inventoryData.map((o) => console.log(JSON.stringify(o)));
      this.searchData = this.tempData.filter((o) =>  JSON.stringify(o).toLowerCase().includes(this.searchText.toLowerCase()) );
      this.inventoryData = this.searchData;
    } else {
      this.inventoryData = this.tempData;
    }
    this.checkedFun();
  }

  private searchFunByEnter(event): void {
    if (event.keyCode === 13) {
      this.searchFun();
    }
  }

  // /* Lifecycle
  // private created(): void {
  // }
  // }*/
}
</script>

<style lang="scss" scoped>
.item-texts div {
  line-height: 1.325;
  letter-spacing: 0.1rem;
  font-size: 1rem;
  padding-left: 1rem;
  padding: 6px;
  width: 10.89rem;
  border: 0.1rem solid var(--c-gray-500);
  font-size: 0.89rem;
}
.asset-untagged div {
  background: var(--c-info-400);
}

.class-lim {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.right {
    float: left;
    width: 100%;
    height: 210px;
    overflow: scroll;
    padding: 5%;
}

.styled-table tr:hover { 
  background-color: rgb(240, 243, 241); 
  text-align:left;
  width: 25% !important;
}
</style>