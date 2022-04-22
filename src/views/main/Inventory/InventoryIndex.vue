<template>
  <div>
    <h1>Inventory Management</h1>
    <div class="row cxs12">
      <div>
        <button
          class="button primary outline medium">
          AWS
        </button>
      </div>&emsp;
      <div>
        <button
          class="button primary outline medium" disabled>
          GCP
        </button>
      </div>&emsp;
      <div>
        <button
          class="button primary outline medium" disabled>
          Azure
        </button>
      </div>
    </div>
    <br><br>
    <div class="card card-style">
      <div class="container-style">
        <inventory-table>
        </inventory-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import InventoryTable from './InventoryTable.vue';

@Component({
  components: {
    'inventory-table': InventoryTable,
  },
})

export default class InventoryIndex extends Vue {
/* Lifecycle
  private created(): void {
  }*/
}

</script>

<style lang="scss" scoped>

.button {
    width: 14rem;
}

.header-search {
  right: 0;
  width: 300px;
  float: right;
  margin-bottom: 0px;
  @media (max-width: 767px) {
    width: 100%;
  }
}

.search {
  display: flex;
  @media (max-width: 767px) {
    width: 100%;
  }
}

.search-style {
  position: absolute;
  right: 3rem;
}

.cb {
    padding-top: 1rem;
}

.cb-texts {
  margin: 0 0 0 0;
  line-height: 1.325;
  letter-spacing: .1rem;
  word-spacing: .5rem;
  text-shadow: .2rem 0rem 0 var(--c-gray-100), -.2rem 0rem 0 var(--c-gray-100);
}

.header-texts div {
  margin: 0 0 0 0;
  line-height: 1.325;
  letter-spacing: .1rem;
  word-spacing: .5rem;
  border: .1rem solid var(--c-gray-500);
  padding: 6px;
  width: 10.89rem;
  text-align: center;
  font-size: 1.45rem;
}

.card-style {
  border: 0rem;
  display: flex;
  width: 1450px;
}

.container-style {
   width: 140rem;
   padding: 0 0 0 0;
}

</style>