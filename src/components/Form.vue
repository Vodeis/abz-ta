<!-- eslint-disable -->
<template>
  <section id="signUp" class="post_section container">
    <h1 class="title">{{ form.title }}</h1>
    <form
      v-if="!registered"
      class="post_section__form"
      @submit.prevent="submitForm"
      @change="hadleFormChange"
      id="form"
    >
      <input
        class="input-text"
        :class="{ error: errorName }"
        v-model="name"
        type="text"
        :placeholder="form.name"
        minlength="2"
        maxlength="60"
      />

      <input
        class="input-text"
        :class="{ error: errorEmail }"
        v-model="email"
        type="email"
        minlength="2"
        maxlength="100"
        :placeholder="form.email"
      />

      <div class="phone_label">
        <input
          class="input-text"
          :class="{ error: errorPhone }"
          v-model="phone"
          type="text"
          :placeholder="form.phone"
          minlength="1"
          maxlength="13"
        />
        <span>{{ form.phoneMask }}</span>
      </div>

      <div class="position__container">
        <p class="text">{{ form.positionLabel }}</p>
        <label v-for="(label, i) of form.positions" :key="i">
          <input v-model="position" :value="i + 1" type="radio" name="position" />
          <span>{{ label }}</span>
        </label>
      </div>

      <label class="photo">
        <div class="photo__label">
          <span class="text">{{ form.btnUpload }}</span>
          <span class="text placeholder">{{
            loadedFileName ? loadedFileName : form.uploadPlaceholder
          }}</span>
        </div>
        <input type="file" accept="image/jpg, image/jpeg" @change="validateImg" ref="inputImg" />
      </label>

      <button class="btn" :class="{ disabled: disabledBtn }" :disabled="disabledBtn" type="submit">
        {{ btns.signUp }}
      </button>
    </form>
    <div v-else class="registered">
      <img :src="require('../assets/img/success.svg')" alt="success" />
    </div>
  </section>
</template>

<script>
import { getToken, reqNewUser } from "@/services/landAPI";
export default {
  name: "Form",
  data() {
    return {
      token: null,
      needNewToken: true,
      disabledBtn: true,

      registered: false,

      name: "",
      email: "",
      phone: "",
      position: "",
      photo: null,

      loadedFileName: "",

      errorName: false,
      errorEmail: false,
      errorPhone: false,
    };
  },
  watch: {
    name: function (newVal) {
      if (newVal) {
        this.errorName = !newVal;
        this.hadleFormChange();
      }
    },
    email: function (newVal) {
      if (newVal) {
        this.errorEmail = !this.validateEmail(newVal);
        this.hadleFormChange();
      }
    },
    phone: function (newVal) {
      if (newVal) {
        this.errorPhone = !this.validatePhoneNumber(newVal);
        this.hadleFormChange();
      }
    },
    position: function (newVal) {
      if (newVal) this.hadleFormChange();
    },
    photo: function (newVal) {
      if (newVal) this.hadleFormChange();
    },
  },
  methods: {
    validateEmail(email) {
      const regex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return regex.test(email);
    },
    validateImg() {
      const input = this.$refs.inputImg;
      const file = input.files[0];
      if (this.validateImgSize(file)) this.validateImgResolution(file);
    },
    validateImgSize(file) {
      const fileSize = file.size / 1024 / 1024; // in MB
      if (fileSize > 5) {
        alert("File size exceeds 5 MB");
        return false;
      } else {
        this.loadedFileName = file.name;

        return this.validateImgResolution(file);
      }
    },
    validateImgResolution(file) {
      const img = document.createElement("img");

      const objectURL = URL.createObjectURL(file);
      const ths = this;

      img.onload = function handleLoad() {
        if (img.width < 70 || img.height < 70) {
          alert("The image's width or height is less than 70px");
          ths.photo = null;
          ths.loadedFileName = "";
        } else {
          ths.photo = file;
        }

        URL.revokeObjectURL(objectURL);
      };
      img.src = objectURL;
    },
    validatePhoneNumber(phone) {
      const regex = /\+380\d\d\d\d\d\d\d\d\d/i;
      return regex.test(phone);
    },
    hadleFormChange() {
      if (
        this.name &&
        this.validateEmail(this.email) &&
        this.validatePhoneNumber(this.phone) &&
        this.position &&
        this.photo
      ) {
        this.disabledBtn = false;
      } else {
        this.disabledBtn = true;
      }
      // console.log(
      //   this.name,
      //   this.validateEmail(this.email),
      //   this.validatePhoneNumber(this.phone),
      //   this.position,
      //   this.photo
      // );
    },
    clearData() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.position = "";
      this.photo = "";
      this.$refs.inputImg.value = "";
      this.token = null;
      this.needNewToken = true;
      this.disabledBtn = true;
      this.registered = true;
      setTimeout(() => (this.registered = false), 2000);
    },
    gatherFormData() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      formData.append("position_id", this.position);
      formData.append("photo", this.photo);

      return formData;
    },
    async submitForm() {
      if (!this.token || this.needNewToken) {
        const res = await getToken();
        this.token = res.data.token;
        this.needNewToken = false;
      }

      const response = await reqNewUser(this.token, this.gatherFormData());
      console.log(response);
      if (response && response.data.success) {
        this.clearData();
      }
      // eslint-disable-next-line
      if (response && !response.data.success && response.data.message === "The token expired.")
        this.needNewToken = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.post_section {
  margin-top: 140px;
  margin-bottom: 100px;

  .title {
    margin-bottom: 50px;
  }

  .registered {
    img {
      display: block;
      max-width: 100%;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0 auto;
    max-width: 380px;
    & > *:not(:last-child) {
      width: 100%;
    }

    .input-text {
      box-sizing: border-box;
      width: 100%;
      padding: 14px 16px;
      border-radius: 4px;
      border: 1px solid #d0cfcf;
      background: transparent;
      margin-bottom: 50px;
      outline-color: rgba(0, 0, 0, 0.87);
      &::placeholder {
        color: #7e7e7e;
      }
      &.error {
        border-color: red;
      }
    }

    .phone_label {
      margin-bottom: 25px;
      .input-text {
        margin-bottom: 4px;
      }
      span {
        color: #7e7e7e;
        margin-left: 16px;
        font-size: 12px;
        line-height: 14px;
      }
    }
    .position__container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 47px;
      .text {
        text-align: left;
        margin-bottom: 11px;
      }

      & > label {
        input {
          margin-right: 12px;
          width: 20px;
          height: 20px;
          opacity: 0;

          &:checked {
            & + span {
              &::before {
                border-color: #00bdd3;
              }
              &::after {
                display: block;
              }
            }
          }
        }
        &:not(label:last-child) {
          margin-bottom: 7px;
        }

        span {
          display: flex;
          align-items: center;
          position: relative;
          &::before {
            display: block;
            margin-right: 12px;
            content: "";
            border-radius: 50%;
            border: 1px solid #d0cfcf;
            width: 20px;
            height: 20px;
          }
          &::after {
            position: absolute;
            top: 50%;
            left: 6px;
            transform: translateY(-50%);

            display: none;
            margin-right: 12px;
            content: "";
            border-radius: 50%;
            background: #00bdd3;
            width: 10px;
            height: 10px;
          }
        }
      }
    }

    .photo {
      width: 100%;
      position: relative;
      padding: 14px 0;
      margin-bottom: 50px;
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      &__label {
        width: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);

        span {
          &:first-child {
            box-sizing: border-box;
            display: block;
            padding: 14px 15px;

            border-radius: 4px 0px 0px 4px;
            border: 1px solid rgba(0, 0, 0, 0.87);
          }
          &:last-child {
            width: 100%;
            display: block;
            padding: 14px 16px;

            border-radius: 0 4px 4px 0;
            border: 1px solid #d0cfcf;
          }

          &.placeholder {
            color: #d0cfcf;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .btn.disabled {
      color: rgba(255, 255, 255, 0.87);
      background: #b4b4b4;
    }
  }
}
</style>
