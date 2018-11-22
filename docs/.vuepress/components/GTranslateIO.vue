<script>
import Vue from "vue";

export default {
  name: "gtranslate-io",
  render() {
    if (!process.browser) { // failed build with error: location is undefined
      return;
    }

    var self = this;

    const proto = location.protocol;
    const path = location.pathname.split(this.$localePath).join("");
    const host = location.host;

    const url = `${proto}//${this.$lang}.${host}/${path}`;
    debugger;

    // gtranslate.io has ability to work via dns
    fetch(url)
      .then(response => {
        debugger;
        if (!response.ok) {
          return Promise.reject(new Error(response.statusText));
        }
        return response.text();
      })
      .then(text => {
        debugger;
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, "text/html");
        const el = htmlDoc.getElementsByClassName("content")[0];
        debugger;

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
};
</script>