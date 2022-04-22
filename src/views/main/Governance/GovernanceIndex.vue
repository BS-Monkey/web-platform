<template>
    <div>
        <h1>Governance</h1>
        <div v-if="policies.length">
            <div class="card card-style">
                <!--<div>
                    <span> RockyII</span>
                    <span class="controls right">
                        <button
                        class="button default link large btn"
                        @click="showRockyII = true"
                        v-if="!showRockyII"
                        >
                            <i class="fas fa-chevron-right large"></i>
                        </button>
                        <button class="button default link large" @click="showRockyII = false" v-else>
                            <i class="fas fa-chevron-down large"></i>
                        </button>
                    </span>
                    <transition name="fade">
                        <div v-if="showRockyII">
                            <input id="cb1" name="cb1" type="checkbox">
                            <label for="cb1" class="cb-texts">Require all organizations to set monthly total budgets</label>
                        </div>
                    </transition>
                    <hr class="default">
                </div>
                <div>
                    <span> Resources</span>
                    <span class="controls right">
                        <button
                        class="button default link large btn"
                        @click="resources = true"
                        v-if="!resources"
                        >
                            <i class="fas fa-chevron-right large"></i>
                        </button>
                        <button class="button default link large" @click="resources = false" v-else>
                            <i class="fas fa-chevron-down large"></i>
                        </button>
                    </span>
                    <transition name="fade">
                        <div v-if="resources">
                            <input id="cb2" name="cb2" type="checkbox">
                            <label for="cb2" class="cb-texts">Require all services to be tagged</label>
                        </div>
                    </transition>
                    <hr class="default">
                </div>
                <div>
                    <span> Cost Optimization</span>
                    <span class="controls right">
                        <button
                        class="button default link large btn"
                        @click="costOpt = true"
                        v-if="!costOpt"
                        >
                            <i class="fas fa-chevron-right large"></i>
                        </button>
                        <button class="button default link large" @click="costOpt = false" v-else>
                            <i class="fas fa-chevron-down large"></i>
                        </button>
                    </span>
                    <transition name="fade">
                        <div v-if="costOpt">
                            <div>
                                <input id="cb3" name="cb3" type="checkbox">
                                <label for="cb3" class="cb-texts">Convert all gp2 to gp3</label>
                            </div>
                            <div>
                                <input id="cb4" name="cb4" type="checkbox">
                                <label for="cb4" class="cb-texts">Alert for orphaned ebs snapshots</label>
                            </div>
                        </div>
                    </transition>
                    <hr class="default">
                </div>
                <div>
                    <span> Security</span>
                    <span class="controls right">
                        <button
                        class="button default link large btn"
                        @click="security = true"
                        v-if="!security"
                        >
                            <i class="fas fa-chevron-right large"></i>
                        </button>
                        <button class="button default link large" @click="security = false" v-else>
                            <i class="fas fa-chevron-down large"></i>
                        </button>
                    </span>
                </div>-->
                <div v-for="(policy,index) in policies" :key="index" :value="policy">
                    <input :id="policy.policy_id" name="cb" type="checkbox" :checked="currentOrg == policy.organization_id">
                    <label :for="policy.policy_id" class="cb-texts">{{policy.policy_name}}</label>
                </div>
                <br>
                <br>
                <br>
                <div class="container">
                    <button
                        class="button primary outline medium btn-save bold">
                        Save
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p style='text-align: center'><i>No policies for this Organization</i></p>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';

import API from '@/API';

@Component
export default class GovernanceIndex extends Vue {
  /* Variables */
  private policies: Policy[] = [];

  get currentOrg(): string { return API.Organization_v2.getCurrentId(); }

  /* Lifecycle */
  private created(): void {
    if (this.currentOrg) {
        this.getPolicies(this.currentOrg);
    }
  }

  private getPolicies(orgId: string): void {
      API.Policy.getPolicy(orgId)
      .then((response) => {
        this.policies = response;
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