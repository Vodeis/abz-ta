import { createApp } from "vue";
import App from "./App.vue";
import mixins from "./mixins/textMixin";

const app = createApp(App);

app.mixin(mixins);
app.mount("#app");
