<template>
    <div>
        <h1>InventoryTest</h1>
        ASSETS :
                
                <div v-for="(inventoryt,index) in inventorytests" :key="index" :value="inventoryt">
                  <span>Data :   {{ inventoryt.resourceID }} {{ inventoryt.integrationID }} </span>
                </div>
                <div v-if="inventorytests.length">
                     <p style='text-align: center'><i>Yes</i></p>
                </div>
                <div v-else>
                    <p style='text-align: center'><i>No </i></p>
                </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';

import API from '@/API';

@Component
export default class InventoryTestIndex extends Vue {
  /* Variables */
  private inventorytests: InventoryTest[] = [];

  get currentOrg(): string { return API.Organization_v2.getCurrentId(); }

  /* Lifecycle */
  private created(): void {
    if (this.currentOrg) {
        this.getInventoriesTest(this.currentOrg);
    }
  }
  private getInventoriesTest(integId: string): void {
      API.InventoryTest.getInventoryTest('6c99124a-4135-4e16-95ea-084cded29ff8')
      .then((response) => {
        this.inventorytests = response;
      });
  }
}
</script>

<style lang="scss" scoped>

.card-style {
    width: 70rem;
}

.item-text div {
    line-height: 1.325;
    letter-spacing: .1rem;
    font-size: 3rem;
}

hr.hr-style {
    content: '';
    display: block;
    position: relative;
    border-bottom: .01rem solid var(--c-gray-900);
    z-index: -1;
    margin: 0 1rem 1rem .2rem;
    border-top: 2rem;
    padding: 0rem;
}

.btn {
    background-color: transparent;
    height: 4rem;
    width: 5rem;
    border: 0rem;
    position: relative;
    margin: 0rem;
    //right: 0rem;
    border-top: -1rem;
}

.container {  
    position: relative; 
}

.btn-save {  
    margin: 0;
    position: relative;
    left: 45%;
    width: 10rem;
}

.cb-texts {
  margin: 0 0 0 0;
  line-height: 1.325;
  letter-spacing: .1rem;
  word-spacing: .5rem;
  text-shadow: .2rem 0rem 0 var(--c-gray-100), -.2rem 0rem 0 var(--c-gray-100);
}
</style>