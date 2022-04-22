<template>
  <div>
    <button class="button primary dashboardButton" @click="backToIntegration()">
      Clear Dashboard
    </button>
    <h1>{{ this.dashTitle }}</h1>
    <div class="row">
      <div>
        <label for="dashtype">Select a Dashboard Type</label>
      </div>
      <div class="cxs-custom20">
        <select
          id="dashtype"
          class="selectInt"
          name="dropdown"
          v-validate="'required'"
          v-model="chartSelect"
          @change="onChartSelectChange()"
        >
          <option disabled selected value="">Please select one</option>
          <option value="MonthlyBilling">Monthly Dashboard</option>
          <option value="TransactionTypeBilling">Transaction Type Dashboard</option>
          <!-- <option value="MonthToDateBilling">Month to Date chart</option> -->
        </select>
      </div>
      <div v-if="this.chartSelect  === 'MonthlyBilling'">
        <div class="row">
          <div class="csx">
            <label for="datepick">Select date Period</label>
          </div>
          <div class="csx">
            <date-picker id="datepick" input-class="datetime-picker" type="month" v-model="chartPeriod" format="YYYYMM" placeholder="Select date Period" range></date-picker>
          </div>
          <div class="csx">
            <button class="button primary outline" @click="createdashboard()">
                <i class="fas fa-chart-bar"></i>
              Generate Dashboard
            </button>
          </div>
        </div>
      </div>
      <div v-if="this.chartSelect  === 'TransactionTypeBilling'">
        <div class="row">
          <div class="csx">
            <label for="datepick">Select date Period</label>
          </div>
          <div class="csx">
            <date-picker id="datepick"  input-class="datetime-picker" type="month" v-model="chartPeriod" format="YYYYMM" placeholder="Select date Period" range></date-picker>
          </div>
          <div class="csx">
            <button class="button primary outline" @click="createdashboard()">
                <i class="fas fa-chart-bar"></i>
              Generate Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.chartSelect  === 'TransactionTypeBilling'">
      <hr />
      <div id="BillingChart">
          <div v-if="this.chartObject && Object.keys(this.chartObject).length > 0">
            <TransactionDashboard :cdata="this.chartObject" :initOptions="this.initOptions" autoresize :key="this.keycount" msg="Welcome to Monthly Overview Dashboard"/> 
          </div>
          <div v-else>
            <empty icon="fas fa-chart-bar">
              <div slot="description">
                <p>
                  Select the billing/usage period you want to view.
                </p>
              </div>
            </empty>
          </div>
      </div>
    </div>
    <div v-if="this.chartSelect  === 'MonthlyBilling'">
      <hr />
      <div id="BillingChart">
          <div v-if="this.chartObject && Object.keys(this.chartObject).length > 0">
            <MonthlyDashboard :cdata="this.chartObject" :initOptions="this.initOptions" autoresize :key="this.keycount" msg="Welcome to Transaction Type Dashboard"/> 
          </div>
          <div v-else>
            <empty icon="fas fa-chart-bar">
              <div slot="description">
                <p>
                  Select the billing/usage period you want to view.
                </p>
              </div>
            </empty>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';

import API from '@/API';
import router from '@/router/router';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import MonthlyDashboard from '@/components/globe-billing/MonthlyDashboard.vue';
import TransactionDashboard from '@/components/globe-billing/TransactionDashboard.vue';

@Component({
  components: {
    MonthlyDashboard,
    TransactionDashboard,
    DatePicker,
  },
})

export default class BillingChart extends Vue {

  /* Variables */
  @Prop()
  private id: string;

  private chartSelect: string = '';
  private keycount: number = 0;
  private dashTitle: string = 'Dashboard';

  private chartId: string = '';
  private chartPeriod: Date[] = new Array();
  private chartObject: object = new Object();

  private integration: Integration<GlobeBilling> = API.Integration.globeBilling.blank();

  private initOptions: object = new Object();

  @Watch('integrations')
  private onChartSelectChange(): void {
    this.init();
  }

  get currentOrg(): string {
    return API.Organization_v2.getCurrentId();
  }

  get name(): string {
    if (this.integration.metadata.friendly_name === '') {
      return this.integration.id;
    }
    return this.integration.metadata.friendly_name;
  }

  private async init(): Promise<void> {

    try {
      this.integration = await API.Integration.globeBilling.getOne(this.id);
    } catch {
      API.UI.addNotification({
        type: 'danger',
        text: 'Error getting integration.',
      });
    }

    if (this.chartSelect !== '') {

      // get past 6 months by default
      if ( this.chartPeriod.length === 0) {
        const cd = new Date();
        const psm = new Date();
        psm.setMonth(psm.getMonth() - 6);
        this.chartPeriod = [psm, cd];
        this.createdashboard();
      }

      // this.chartSelect = this.chartSelect;
      if (this.chartSelect === 'MonthlyBilling') {
        this.dashTitle = 'Billing Overview Dashboard';

      } else if (this.chartSelect === 'TransactionTypeBilling') {
        this.dashTitle = 'Transaction Type Dashboard';

      }
    }
  }

  private async createdashboard(): Promise<void> {

    function pad(num: number) {
      if (num < 10) {
        return '0' + num;
      }
      return num;
    }

    try {
      this.chartId = await API.GlobeBilling.dashboard.createDashboardPeriod(
          this.id,
          this.chartPeriod[0].getFullYear() + '-' + pad(this.chartPeriod[0].getMonth() + 1) + '-' + '01',
          this.chartPeriod[1].getFullYear() + '-' + pad(this.chartPeriod[1].getMonth() + 1) + '-' + '01'
      );

      if (this.chartId === '') {
        throw new Error('No dashboard request UUID returned.');
      }

      if (this.chartSelect === '' ) {
        throw new Error('"Select date Period" should not be empty');
      }

    } catch (error) {
        if (error.name === 'TypeError') {
          API.UI.addNotification({
            type: 'danger',
            text: '"Select date Period" must contain selected dates.',
          });
        } else {
          API.UI.addNotification({
            type: 'danger',
            text: 'Unable to create dashboard request. Try again later.',
          });
        }
        throw error;
    }

    /* put the chart get result here: .result */
    try {
      // this.chartObject = Object.assign( {}, this.chartObject, await API.GlobeBilling.dashboard.getDashboardResult(
      //   this.chartId,
      //   10,
      //   2000
      // ));
      this.chartObject = await API.GlobeBilling.dashboard.getDashboardResult(
        this.chartId,
        10,
        2000
      );


    } catch (error) {
        API.UI.addNotification({
            type: 'danger',
            text: 'Unable to get dataset for dashboard. Try again later.',
        });
        throw error;
    }

    this.initOptions = {
      renderer: 'canvas',
    };

    this.keycount = this.keycount + 1;

    // tslint:disable-next-line:no-console
    // console.log(this.chartObject);

  }

  private backToIntegration(): void {
    this.chartSelect = '';
    this.chartPeriod = new Array();
    this.chartObject = new Object();
  }
}

</script>

<style lang="scss" scoped>
  .selectInt {
    height: 37px;
    font-size: 15px;
    // width: 95%;
    width: 280px;
  }

  .cxs-custom20 {
    // -ms-flex-preferred-size: 18%;
    // flex-basis: 18%;
    width: 290px;
  }

  .dashboardButton {
    float: right;
    margin-left: 1rem;
  }
  .button {
    float: right;
    margin-left: 1rem;
  }
  .datetime-picker {
    height: 50px;
  }

  @media (prefers-color-scheme: dark) {
    /deep/ .mx-icon-calendar {
      color: rgba(255, 255, 255, 0.5) !important;
    }
    /deep/ .mx-icon-clear {
      color: rgba(255, 255, 255, 0.5) !important;
    }
    /deep/ .mx-icon-clear:hover {
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
</style>
