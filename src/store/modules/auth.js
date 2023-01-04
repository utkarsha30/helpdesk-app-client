import { clientLogin } from "@/service/clientauth";
const KEY_TOKEN = "token";
const KEY_EMAIL = "email";
const KEY_ROLE = "role";
const KEY_NAME = "name";

const auth = {
  state: {
    token: localStorage.getItem(KEY_TOKEN) || "",
    email: localStorage.getItem(KEY_EMAIL) || "",
    role: localStorage.getItem(KEY_ROLE) || "",
    name: localStorage.getItem(KEY_NAME) || "",
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== "";
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setName(state, name) {
      state.name = name;
    },
    setRole(state, role) {
      state.role = role;
    },
  },
  actions: {
    async clientLogin({ commit }, credentials) {
      const data = await clientLogin(credentials);
      const { name, email, role, token } = data;
      localStorage.setItem(KEY_NAME, name);
      localStorage.setItem(KEY_EMAIL, email);
      localStorage.setItem(KEY_ROLE, role);
      localStorage.setItem(KEY_TOKEN, token);
      commit("setName", name);
      commit("setEmail", email);
      commit("setRole", role);
      commit("setToken", token);
      return true;
    },
    clientLogout({ commit }) {
      commit("setName", "");
      commit("setEmail", "");
      commit("setRole", "");
      commit("setToken", "");
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_EMAIL);
      localStorage.removeItem(KEY_NAME);
      localStorage.removeItem(KEY_ROLE);
    },
  },
};
export default auth;
