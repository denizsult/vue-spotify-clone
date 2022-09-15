<template>
  <div
    class="flex w-screen h-full flex-col justify-center items-center gap-5 bg-white mb-5"
  >
    <div class="w-full py-2 flex justify-center items-center">
      <logoVue class="mt-3" height="55px" type="black" />
    </div>
    <hr class="w-full h-2" />
    <div
      class="lg:w-[500px] md:w-[500px] sm:w-[500px] xs:w-full flex flex-col gap-5"
    >
      <div class="flex flex-col gap-3 items-center text-white">
        <h6 class="font-bold text-black text-sm">
          Devam etmek için Spotify'da oturum aç.
        </h6>
        <button
          class="rounded-[50px] bg-[#3b5998] w-full h-12 flex items-center justify-center gap-2"
        >
          <svg
            role="img"
            focusable="false"
            height="24"
            width="24"
            viewBox="0 0 24 24"
            class="Svg-ytk21e-0 dMCjEC sc-bkkeKt gIBNai"
          >
            <path
              data-name="White"
              d="M20 3H4a1 1 0 00-1 1v16a1 1 0 001 1h8.62v-7h-2.35v-2.69h2.35v-2a3.27 3.27 0 013.49-3.59 19.25 19.25 0 012.1.11v2.43h-1.44c-1.13 0-1.35.54-1.35 1.32v1.73h2.69L17.76 14h-2.34v7H20a1 1 0 001-1V4a1 1 0 00-1-1z"
              fill="white"
            ></path>
          </svg>
          FACEBOOK İLE DEVAM ET
        </button>
        <button
          class="rounded-[50px] bg-black w-full h-12 flex items-center justify-center gap-2"
        >
          <img
            src="https://accounts.scdn.co/sso/images/apple-icon.36286be565c1ca3ac9b60243f8e0a78b.svg"
          />
          APPLE İLE DEVAM ET
        </button>
        <button
          class="rounded-[50px] border border-[#878787] text-gray-400 w-full h-12 flex items-center justify-center gap-2"
        >
          <img src="../assets/google.png" />
          GOOGLE İLE DEVAM ET
        </button>
      </div>

      <div class="flex items-center font-semibold text-xs justify-center gap-5">
        <hr class="w-52" />
        VEYA
        <hr class="w-52" />
      </div>

      <div class="flex flex-col justify-center h-28">
        <div class="flex flex-col gap-2">
          <button
            @click="login"
            class="rounded-[50px] bg-[#1fdf64] font-semibold h-12 px-8"
          >
            OTURUM AÇ
          </button>
        </div>
      </div>

      <div class="flex flex-col justify-center items-center gap-5">
        <hr class="w-full" />
        <h3>Hesabın yok mu?</h3>
        <button
          class="rounded-[50px] w-full border border-gray-400 p-2 font-semibold text-gray-500"
        >
          SPOTİFY İÇİN KAYDOL
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logoVue from "../components/logo.vue";

const login = () => {
  const url = "https://accounts.spotify.com/authorize";
  let key = "86b1f2359e5c444f8366bc09e96232ab";
  let params:any = {
    response_type: "code",
    client_id: key,
    scope:
      "user-read-private user-read-email streaming playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-modify-playback-state",
    redirect_uri:  window.location.origin,
    show_dialog: true,
  };
  alert(window.location.origin)
  params = new URLSearchParams(params).toString();
  window.location.href = `${url}?${params}`;
};


</script>
