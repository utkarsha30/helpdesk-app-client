import { clientLogin } from "@/service/clientauth";
import { employeeLogin } from "@/service/employeeauth";
const KEY_ID = "id";
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
    id: localStorage.getItem(KEY_ID) || "",
  },
  getters: {
    isAuthenticated(state) {
      return state.token !== "";
    },
    isAdmin(state) {
      return state.role === "admin";
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
    setId(state, id) {
      state.id = id;
    },
  },
  actions: {
    async clientLogin({ commit }, credentials) {
      const data = await clientLogin(credentials);
      const { id, name, email, role, token } = data;
      localStorage.setItem(KEY_ID, id);
      localStorage.setItem(KEY_NAME, name);
      localStorage.setItem(KEY_EMAIL, email);
      localStorage.setItem(KEY_ROLE, role);
      localStorage.setItem(KEY_TOKEN, token);
      commit("setId", id);
      commit("setName", name);
      commit("setEmail", email);
      commit("setRole", role);
      commit("setToken", token);
      return true;
    },
    clientLogout({ commit }) {
      commit("setId", "");
      commit("setName", "");
      commit("setEmail", "");
      commit("setRole", "");
      commit("setToken", "");
      localStorage.removeItem(KEY_ID);
      localStorage.removeItem(KEY_TOKEN);
      localStorage.removeItem(KEY_EMAIL);
      localStorage.removeItem(KEY_NAME);
      localStorage.removeItem(KEY_ROLE);
    },
    async employeeLogin({ commit }, credentials) {
      const data = await employeeLogin(credentials);
      const { id, name, email, role, token } = data;
      localStorage.setItem(KEY_ID, id);
      localStorage.setItem(KEY_NAME, name);
      localStorage.setItem(KEY_EMAIL, email);
      localStorage.setItem(KEY_ROLE, role);
      localStorage.setItem(KEY_TOKEN, token);
      commit("setId", id);
      commit("setName", name);
      commit("setEmail", email);
      commit("setRole", role);
      commit("setToken", token);
      return true;
    },
  },
  employeeLogout({ commit }) {
    commit("setId", "");
    commit("setName", "");
    commit("setEmail", "");
    commit("setRole", "");
    commit("setToken", "");
    localStorage.removeItem(KEY_ID);
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_EMAIL);
    localStorage.removeItem(KEY_NAME);
    localStorage.removeItem(KEY_ROLE);
  },
};
export default auth;
