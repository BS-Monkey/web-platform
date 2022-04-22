<template>
  <div> 
      <!-- Table for the Tagged Assets -->

    <!-- Table for the Untagged Assets -->

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class InventoryTable extends Vue {
/* Lifecycle
  private created(): void {
  }*/
}

</script>

<style lang="scss" scoped>

.item-texts div {
  line-height: 1.325;
  letter-spacing: .1rem;
  font-size: 1rem;
  padding-left: 1rem;
  padding: 6px;
  width: 10.89rem;
  border: .1rem solid var(--c-gray-500);
  font-size: .89rem;
}

.asset-untagged div {
  background: var(--c-info-400);
}
</style>