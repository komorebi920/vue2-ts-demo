import Vue from "vue";
import Vuex from "vuex";
import { IAboutState } from "./module/about";

Vue.use(Vuex);

interface IRootState {
  about: IAboutState;
}

export default new Vuex.Store<IRootState>({});
