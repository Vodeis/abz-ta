<template>
  <div class="wrapper">
    <Header />
    <Intro />
    <Users />
    <Form />
  </div>
</template>

<script>
import "reset-css";
import Header from "./components/Header.vue";
import Intro from "./components/Intro.vue";
import Users from "./components/Users.vue";
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: { Header, Intro, Users, Form },
};
</script>

<style lang="scss">
@import url(./assets/style/typography.scss);

.wrapper {
  max-width: 1170px;
  min-width: 360px;
  margin: 0 auto;
}

.container {
  padding-left: 16px;
  padding-right: 16px;

  @media screen and (min-width: 768px) {
    padding-left: 32px;
    padding-right: 32px;
  }
}
</style>
