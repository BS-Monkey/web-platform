<template>
  <div v-if="(viewDeactOrganization && item.is_active) || !viewDeactOrganization && !item.is_active">
    <organization-tree
      v-for="(child, index) in item.children"
      :key="index"
      :item="child"
      :level="level+1"
      :accessibleOrgs=accessibleOrgs
      :orgName="orgName + '.' + child.name"
      :viewDeactOrganization=viewDeactOrganization
      ></organization-tree>
  </div>
  <div v-else-if="(viewDeactOrganization && !item.is_active) || !viewDeactOrganization && item.is_active">
    <div class="cxs12 tree">
      <div class="row cxs12">
          <div class="item cxs12" :class="{bold: isFolder(), disabled: actionsDisabled(item)}">
            <div class="name cxs5">
              <!--<div :style="`padding-left: ${level*20}px`">
                <router-link :to="`/organizations/${item.id}`">{{ item.name }}</router-link>
              </div>-->
              <span v-if="(viewDeactOrganization && !item.is_active) || !viewDeactOrganization && item.is_active">
              <span v-if="envIsMainPortal() || (!envIsMainPortal() && !viewDeactOrganization)">
                <div :style="`padding-left: ${level*20}px`">
                  {{orgName}}
                </div>
              </span>
              <span v-else-if="!envIsMainPortal() && viewDeactOrganization">
                {{orgName}}
              </span>
              </span>
            </div>
            <div class="description cxs5">
              <span v-if="(viewDeactOrganization && !item.is_active) || !viewDeactOrganization && item.is_active">
              <p> {{ item.description }} </p>
              </span>
            </div>
            <!-- Actions -->
            <div class="actions cxs2" v-if="envIsMainPortal() || (!envIsMainPortal() && !viewDeactOrganization)">
              <span v-if="(viewDeactOrganization && !item.is_active) || !viewDeactOrganization && item.is_active">
              <span v-if="envIsMainPortal()">
                <router-link 
                :disabled=actionsDisabled(item)
                :to="`/organizations/${item.id}`" class="button primary outline small">
                View
              </router-link>
              &nbsp;
              <button
                :disabled=actionsDisabled(item)
                @click="confirm(`${item.id}`)" class="button primary outline small danger">
                Delete
              </button>
              &nbsp;</span>
              <button v-if="isFolder() && !isOpen"  @click="toggle" class="button primary outline small fas fa-chevron-right">
              </button>
              <button v-if="isFolder() && isOpen"  @click="toggle" class="button primary outline small fas fa-chevron-down">
              </button>              
              
              </span>
            </div>
          </div>
      </div>
      <span v-if="envIsMainPortal()"> 
        <transition name="slide-fade">
          <div class="row-child cxs12" v-show="isOpen" v-if="isFolder()">
              <organization-tree
                v-for="(child, index) in item.children"
                :key="index"
                :item="child"
                :level="level+1"
                :accessibleOrgs=accessibleOrgs
                :orgName=child.name
                :viewDeactOrganization=viewDeactOrganization
              ></organization-tree>
          </div>
        </transition>
      </span>
      <span v-else-if="!envIsMainPortal() && viewDeactOrganization">
        <span v-for="(child, index) in item.children" :key="index">
          <span v-if="!child.is_active">
              <organization-tree
                :item="child"
                :level="level+1"
                :accessibleOrgs=accessibleOrgs
                :orgName="orgName + '.' + child.name"
                :viewDeactOrganization=viewDeactOrganization
              ></organization-tree>
          </span>
          <span v-else-if="child.is_active">
              <organization-tree
                :item="child"
                :level="level+1"
                :accessibleOrgs=accessibleOrgs
                :orgName="orgName + '.' + child.name"
                :viewDeactOrganization=viewDeactOrganization
              ></organization-tree>
          </span>
        </span>
      </span>
      <span v-if="!envIsMainPortal() && !viewDeactOrganization">
            <span v-for="(child, index) in item.children" :key="index">
              <span v-if="child.is_active">
                <transition name="slide-fade">
                  <div class="row-child cxs12" v-show="isOpen" v-if="isFolder()">     
                    <organization-tree
                      :item="child"
                      :level="level+1"
                      :accessibleOrgs=accessibleOrgs
                      :orgName=child.name
                      :viewDeactOrganization=viewDeactOrganization
                    ></organization-tree>
                  </div>
                </transition>
              </span>
              <span v-else-if="!child.is_active">
                  <organization-tree
                    :item="child"
                    :level="level+1"
                    :accessibleOrgs=accessibleOrgs
                    :orgName="orgName + '.' + child.name"
                    :viewDeactOrganization=viewDeactOrganization
                  ></organization-tree>
              </span>
            </span>
      </span>
      <!-- Confirmation Modal -->
      <modal v-model="showModal">
        <h2>
          Confirmation
        </h2>

        <p>
          Are you sure you want to delete this organization?
        </p>
        <button class="button success outline left" @click="deleteOrg()" style="margin-right:10px">
          <i class="fas fa-check"></i>
          Yes
        </button>
        <button class="button default outline left" @click="showModal = false">
          <i class="fas fa-times"></i>
          No
        </button>
      </modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import API from '@/API';
import Sidebar from '@/views/v2/Sidebar.vue';
import router from '@/router/router';


@Component({name: 'organization-tree'})
export default class OrganizationsTree extends Vue {
  @Prop()
  private item: any;

  @Prop()
  private level: number;

  @Prop()
  private accessibleOrgs: UserOrganization[];

  @Prop()
  private orgName: string;

  @Prop()
  private viewDeactOrganization: boolean;

  @Prop()
  private disableBtn: boolean;

  private isOpen: boolean = false;

  private showModal: boolean = false;

  private selectedOrgId: string;

  private router_path = router.currentRoute.path;

  private isFolder(): boolean {
    if (this.disableBtn) {
      return false;
    }
    return this.item.children && this.item.children.length;
  }

  private toggle() {
    this.$emit('toggle', this.item);
    if (this.isFolder()) {
      this.isOpen = !this.isOpen;
    }
  }

  private makeFolder() {
    if (!this.isFolder()) {
      this.$emit('make-folder', this.item);
      this.isOpen = true;
    }
  }

  private hasChildAct(): boolean {
    if (this.item.children.length > 0) {
      for (const child of this.item.children) {
        if (child.is_active) {
          return true;
        }
      }
    }
    return false;
  }

  private confirm(orgId) {
    // add prompt
    this.showModal = true;
    this.selectedOrgId = orgId;
  }

  private async deleteOrg(): Promise<void> {
    // close modal
    this.showModal = false;
    try {
      const response = await API.Organization_v2.deleteOrg(this.selectedOrgId);
      const organization = response.data;
      API.UI.addNotification({
        type: 'primary',
        text: `Organization "${organization.name}" deleted successfully.`,
      });

      await this.sleep(3000);
      router.go(0);
    } catch (err) {
      //
    }
  }

  private sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private envIsMainPortal(): boolean {
    if (this.router_path.includes('admin')) {
      return false;
    }
    return true;
  }

  private actionsDisabled(organization: Organization): boolean {
    const {id, root_id} = organization;
    return (!this.accessibleOrgs[id!] && !this.accessibleOrgs[root_id!]);
  }
}
</script>

<style lang="scss" scoped>

.item {
  display: flex;
  padding: 1rem 0.75rem;
  border-top: .1rem solid var(--c-gray-300);
  border-bottom: .1rem solid var(--c-gray-300);
  border-left: none;
  border-right: none;
  margin-bottom: -0.1rem;
  text-decoration: none;
  transition: var(--transition-short) all;
}

.item:hover {
  background: none;
  box-shadow: inset .4rem 0 0 var(--c-primary-500);
  cursor: pointer;
  transition: var(--transition-short) all;
}

.disabled > .name, .disabled > .description{
  opacity: 0.5;
}

.cxs12.tree .cxs12 {
   padding-left: 0 !important;
   padding-right: 0 !important;
}

</style>