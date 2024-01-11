<template>
  <header class="container">
    <div class="header">
      <img :src="require('../assets/img/logo.svg')" alt="logo" />
      <div class="header__btns">
        <a class="btn" href="#users">{{ btns.users }}</a>
        <a class="btn" href="#signUp">{{ btns.signUp }}</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 0;

  &__btns {
    :first-child {
      margin-right: 10px;
    }
  }
}
</style>
