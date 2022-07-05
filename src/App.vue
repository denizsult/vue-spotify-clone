<script setup>
import axios from "axios";
import { onMounted } from "vue";
import queryString from "query-string";


onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  let code = params.get("code");
  let key = "86b1f2359e5c444f8366bc09e96232ab";
  let scrt = "fc0dae6751a74a84bd8163dd1dfa52bd";

  if (code) {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:3000/",
          client_id: key,
          client_secret: scrt,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("code", response.data.access_token);
      });
  }
});
</script>

<template>
  <router-view></router-view>
</template>
