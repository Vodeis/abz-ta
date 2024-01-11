<template>
  <section class="intro">
    <div class="container">
      <h1 class="title">{{ intro.title }}</h1>
      <p class="text">{{ intro.text }}</p>
      <button class="btn">{{ btns.signUp }}</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Intro",
};
</script>

<style lang="scss" scoped>
.intro {
  margin-bottom: 140px;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    url("../assets/img/top_bg.png") no-repeat;
  // url("../assets/img/top_bg.png") center center / cover no-repeat;
  background-size: auto;
  background-position: center 80%;

  color: #fff;

  padding: 40px 0 71px;

  .container {
    max-width: 380px;
    margin: 0 auto;
  }
  .title {
    margin-bottom: 21px;
  }

  .text {
    margin-bottom: 32px;
  }

  .btn {
    margin: 0 auto;
    display: block;
  }
}
</style>
