import { computed, ref } from "vue";
import ApiClient from "../api-client";

const token = ref("");
const isAuthenticated = computed(() => !!token.value);
const AUTH_TOKEN = "__booking_app_auth_token__"

async function login (username: string, password: string){
  const data = await ApiClient.postJson("https://restful-booker.herokuapp.com/auth", {
    username,
    password
  })
  token.value = data?.token ?? "";
  sessionStorage.setItem(AUTH_TOKEN, token.value);
}

function init (){
  token.value = sessionStorage.getItem(AUTH_TOKEN) ?? "";
}

function logout (){
  sessionStorage.clear();
  token.value = "";
}

export default function useAuth () {
  init();

  return {
    token,
    isAuthenticated,
    login,
    logout
  }
}