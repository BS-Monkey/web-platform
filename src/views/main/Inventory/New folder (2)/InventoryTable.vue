<template>
  <div>
    <div>
      <div class="row cxs12">
        <div class="row cxs12">
          <div class="cb cxs1">
            <input id="cb1" name="cb1" type="checkbox" v-model="ec2Check" @click="checkedFun()"/>
            <label for="cb1" class="cb-texts">EC2 </label>
          </div>
          <div class="cb cxs1">
            <input id="cb2" name="cb2" type="checkbox" v-model="rdsCheck" @click="checkedFun()"/>
            <label for="cb2" class="cb-texts">RDS</label>
          </div>
          <div class="cb cxs1">
            <input id="cb3" name="cb3" type="checkbox" v-model="s3Check" @click="checkedFun()"/>
            <label for="cb3" class="cb-texts">S3</label>
          </div>
          <div class="cb cxs2">
            <input id="cb4" name="cb6" type="checkbox" v-model="cloudWatchCheck" @click="checkedFun()"/>
            <label for="cb4" class="cb-texts">Cloudwatch</label>
          </div>
          <div class="cb cxs2">
            <input id="cb5" name="cb6" type="checkbox" v-model="lambdaCheck" @click="checkedFun()"/>
            <label for="cb5" class="cb-texts">Lambda</label>
          </div>
          <div class="cxs5" inline>
            <div class="wrap">
              <div class="search">
                  <input type="text" v-model="searchText" class="searchTerm" placeholder="What are you looking for?">
                  <button type="submit" class="searchButton" @click="searchFun()">
                    <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div>
      <div class="tree">
        <table border="1" class="styled-table" style="height:100px;overflow:auto;">
          <thead style="background-color:hsl(192deg 71% 92%);">
            <tr>
              <!-- <th class="default">#</th> -->
              <th class="default" style="padding: 30px;">IntegrationID</th>
              <th class="default" style="padding: 30px">ResourceID</th>
              <th class="default" style="padding: 30px;">FirstSeen</th>
              <th class="default" style="padding: 30px;">LastSeen</th>
              <!-- <th class="default" style="padding: 30px">Metadata</th> -->
              <th class="default" style="padding: 30px">Region</th>
              <th class="default" style="padding: 30px">ServiceType</th>
              <th class="default" style="padding: 30px">Tags</th>
              <!-- <th class="default" style="padding: 30px">Tags</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user) in inventoryData" v-bind:key="user.email">
              <!-- <td>
                <div class="cb cxs1">
                  <input id="user.email" :name="'checkbox'+ index" type="checkbox"  v-bind:key="user.email"/>
                  <label for="user.email" class="cb-texts"></label>
                  </div>
              </td> -->
              <td style="padding-left: 20px; width: 30% !important;">
                <!-- <td style="padding-left: 20px" v-if="!user.role.includes('owner')">-->
                <!--class="button danger link" -->
                <!--<i
                class="fas fa-trash-alt small"
                style="cursor: pointer;"
                @click="showRemoveUser(user)"
                :disabled="disabledAccess"
                />&nbsp; &nbsp;-->
                <span v-if="user.integration_id">{{ user.integration_id }}</span><span v-else>-</span>

              </td>
              <!--<td style="padding-left: 40px;" v-if="user.role.includes('owner')">-->
              <td style="padding-left: 40px; width: 30% !important;"><span v-if="user.resource_id">{{ user.resource_id }}</span><span v-else>-</span></td>
              <!-- <td style="padding-left: 40px; width: 80.66% !important;">{{ user.id }}</td> -->
              <td style="padding: 15px; width: 18% !important;"><span v-if="user.first_seen">{{ user.first_seen | dateTime }}</span><span v-else>-</span></td>
              <td style="padding: 15px; width: 18% !important;"><span v-if="user.last_seen">{{ user.last_seen | dateTime }}</span><span v-else>-</span></td>
              <td style="text-align:center;width: 7% !important;"><span v-if="user.region">{{ user.region }}</span><span v-else>-</span></td>
              <td style="text-align:center;width: 25% !important;"><span v-if="user.service_type">{{ user.service_type }}</span><span v-else>-</span></td>
              <td style="text-align:center;width: 20% !important;">
                <span v-if="user.metadata.Tags">
                  <span v-for="val of user.metadata.Tags" v-bind:key="val.value">
                    <span class="tagContent" :title="val.Value">{{val.Value}}</span>
                  </span>
                </span>
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
import './inventory.css';
@Component
export default class InventoryTable extends Vue {
  private inventoryData: any = [];
  private tempData: any = [];
  private assignData: any = [];
  private searchData: any = [];
  private ec2Check: boolean = false;
  private rdsCheck: boolean = false;
  private s3Check: boolean = false;
  private cloudWatchCheck: boolean = false;
  private lambdaCheck: boolean = false;
  private showRemoveModal: boolean = false;
  private searchText: string = '';
  private created(): void {
    this.getInventoryDetails();
  }
  private checkedFun(): void {
    const ec2Check = document.getElementById('cb1') as HTMLInputElement;
    const rdsCheck = document.getElementById('cb2')  as HTMLInputElement;
    const s3Check = document.getElementById('cb3') as HTMLInputElement;
    const cloudWatchCheck = document.getElementById('cb4') as HTMLInputElement;
    const lambdaCheck = document.getElementById('cb5') as HTMLInputElement;
    this.assignData = [];
    if (ec2Check?.checked) { this.filterData('ec2_volumes'); }
    if (rdsCheck?.checked) { this.filterData('rds_db-snapshots'); }
    if (s3Check?.checked) { this.filterData('s3'); }
    if (cloudWatchCheck?.checked) { this.filterData('cloudwatch_alarms'); }
    if (lambdaCheck?.checked) { this.filterData('lambda_functions'); }
    if (!ec2Check?.checked && !rdsCheck?.checked && !s3Check?.checked && !cloudWatchCheck?.checked && !lambdaCheck?.checked) {
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
      _.filter(this.tempData, (item) => { if (item.service_type === serviceType) { this.assignData.push(item); } });
    } else {
      _.filter(this.searchData, (item) => { if (item.service_type === serviceType) { this.assignData.push(item); } });
    }
  }
  private searchFun(): void {
    if (this.searchText !== '') {
        this.searchData = this.tempData.filter((o) =>  o.integration_id.includes( this.searchText) );
        this.inventoryData = this.searchData;
    } else {
      this.inventoryData = this.tempData;
    }
    this.checkedFun();
  }
  private getInventoryDetails(): void {
    // API.Inventory.getInventory().then((response) => {
    //   console.log(response);
    //   /* tslint:disable:no-string-literal */
    //   this.inventoryData = response && response['data'] ? response['data'] : [];
    //   /* tslint:enable:no-string-literal */
    //   this.tempData = this.inventoryData;
    // // this.inventoryData .sort((a: any, b: any) => a.email.localeCompare(b.email));
    // // });
    // });
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
</style>