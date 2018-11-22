<script>
import Vue from "vue";

export default {
  name: "gtranslate-io",
  render() {
    const isClient = typeof window !== "undefined";
    if (isClient) {
      var self = this;

      const proto = window.location.protocol;
      const path = window.location.pathname.split(this.$localePath).join("");
      const host = "docs-test.kernelcare.com"; // for the test

      const url = `${proto}//${this.$lang}.${host}/${path}`;

      debugger;

      // gtranslate.io has ability to work via dns
      fetch(url)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(new Error(response.statusText));
          }
          return response.text();
        })
        .then(text => {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(text, "text/html");
          const el = htmlDoc.getElementsByClassName("content")[0];

          debugger

          const res = Vue.compile("<div>" + el.innerHTML + "</div>");
          self.$options.render = res.render;
          self.$options.staticRenderFns = res.staticRenderFns;
          self.$forceUpdate();
        })
        .catch(err => {
          debugger;
          console.error(err);
        });
    }
  }
};
</script>