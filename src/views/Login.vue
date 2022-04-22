<template>
  <div class="login">
    <div class="form">
      <img src="@/assets/logo.svg" alt="Cascadeo logo" />
      <button data-testid="login" class="button primary block" @click="login">
        Log In
      </button>
      <br />
      <button data-testid="login" class="button default outline block" @click="login">
        Sign Up
      </button>
      <br />
      <p align="center"><i>We’re currently in the process of upgrading our user authentication service. <br /><br />For existing users, if you haven’t received an email to change your password, please send an email to <a href="mailto:support@cascadeo.com">support</a></i></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Auth from '@/common/auth';
import router from '@/router/router';
import Iam from '@/common/iam';

@Component
export default class Login extends Vue {
  /* Lifecycle */
  private created(): void {
    Auth.validSession()
      .then(() => {
        router.replace('/');
      })
      .catch(() => {
        /* No real error */
      });
  }

  /* Methods */

  private login(): void {
    try {
      const user = Iam.currentUser();
      window.location.href = '/integrations';
    } catch {
      window.location.href = '/v2';
    }
  }
}
</script>


<style lang="scss" scoped>
// Matches whats on Auth0 Hosted Login

.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-image: linear-gradient(
    15deg,
    var(--c-primary-800),
    var(--c-primary-500)
  );
}

.login .form {
  width: 100%;
  max-width: 32rem;
  padding: 3rem;
  background-color: var(--c-gray-100);
  box-shadow: 0 0.3rem 0.3rem var(--c-primary-700);
}

.login .button {
  text-transform: uppercase;
  text-align: center;
}

.forgot {
  padding-left: 50px;
  text-decoration: none;
  color: var(--c-primary-900);
}

a:hover,
a:focus {
  color: none;
  background: none;
}

.login img,
.login svg {
  display: block;
  width: 20rem;
  height: auto;
  margin: 0 auto 4rem auto;
}
</style>
