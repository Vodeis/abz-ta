<template>
  <section id="users" class="users container">
    <h1 class="title">{{ users.title }}</h1>
    <ul class="users__list">
      <li class="users__list__item" v-for="user of usersList" :key="user.id">
        <img class="photo" :src="user.photo" :alt="user.name" />
        <p class="text name">{{ user.name }}</p>
        <p class="text">{{ user.position }}</p>
        <p class="text">{{ user.email }}</p>
        <p class="text">{{ user.phone }}</p>
      </li>
    </ul>
    <button v-if="!loading" class="btn" @click="showMoreUsers">
      {{ btns.showMore }}
    </button>
  </section>
</template>

<script>
import { getUsers } from "../services/landAPI";

export default {
  name: "Users",
  data() {
    return {
      usersList: [],
      showedUsersPage: 1,
      loading: false,
    };
  },
  methods: {
    async getUsers() {
      this.loading = true;
      const response = await getUsers(this.showedUsersPage);
      this.usersList = [...this.usersList, ...response.data.users];
      this.loading = false;
    },
    showMoreUsers() {
      this.showedUsersPage += 1;
      this.getUsers();
    },
  },
  async mounted() {
    this.getUsers();
  },
};
</script>

<style lang="scss" scoped>
.users {
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 20px;
    margin: 50px 0;

    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    &__item {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;

      padding: 20px;
      border-radius: 10px;
      background: #fff;

      p {
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      // &:not(:last-child) {
      //   margin-bottom: 20px;
      // }
      .photo {
        max-width: 100%;
        border-radius: 50%;
      }
      .name {
        margin: 20px 0;
      }
    }
  }
  .btn {
    display: block;
    margin: 0 auto;
  }
}
</style>
