<template>
  <div>
    <div v-if="!permissions" class="csm12 cxs12">
      <p style='text-align: center'><i>Nothing to display</i></p>
    </div>

    <div v-if="permissions" class="cxs12">
      <div class="row cxs12 table-header">
          <div class="cxs5">
            Scope
          </div>
          <div class="cxs5">
            Action
          </div>
          <div class="cxs2">
            Actions
          </div>
      </div>

      <div class="row cxs12 item"
        v-for="(permission, i) in permissions" :key="permission.id"
      >
          <div class="cxs5">
            {{ permission.scope}}
          </div>
          <div class="cxs5">
            {{ permission.action}}
          </div>
          <div class="cxs2">
            <button :disabled=true class="button danger outline small" @click="confirmDelete(i)">
              Delete
            </button>
          </div>
      </div>

    </div>

    <!-- Confirmation Modal -->
    <modal v-model="showDeleteModal">
      <h2>
        Confirmation
      </h2>

      <p>
        Are you sure you want to delete this permission?
      </p>
      <button class="button success outline left" @click="deletePermission(deleteIdx)" style="margin-right:10px">
        <i class="fas fa-check"></i>
        Yes
      </button>
      <button class="button default outline left" @click="showDeleteModal = false">
        <i class="fas fa-times"></i>
        No
      </button>
    </modal>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import API from '@/API';

@Component
export default class PermisionsList extends Vue {
  @Prop()
  private permissions: Permission[];

  private showDeleteModal = false;
  private deleteIdx = -1;

  private async confirmDelete(i: number) {
      this.showDeleteModal = true;
      this.deleteIdx = i;
  }

  private async deletePermission(i: number) {
    let response;
    try {
      response = await API.Permission.delete(this.permissions[i]);
    } catch (error) {
      API.UI.addNotification({
        type: 'danger',
        text: 'permission could not be deleted.',
      });
      return;
    }

    API.UI.addNotification({
      type: 'primary',
      text: `permission deleted successfully.`,
    });

    this.showDeleteModal = false;

    this.$emit('deletePermissionSucceeded');
  }
}

</script>

<style lang="scss" scoped>
.item:hover {
  background: none;
  box-shadow: inset .4rem 0 0 var(--c-primary-500);
  cursor: pointer;
  transition: var(--transition-short) all;
}

</style>