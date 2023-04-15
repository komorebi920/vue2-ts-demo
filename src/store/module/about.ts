import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "..";

function getList(): Promise<Array<number>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5, 6]);
    }, 500);
  });
}

export interface IAboutState {
  count: number;
  list: Array<number>;
}

@Module({
  name: "about",
  dynamic: true,
  store,
})
export default class About extends VuexModule implements IAboutState {
  count = 1;
  list: Array<number> = [];

  get filterList(): Array<number> {
    return this.list.filter((item) => item % 2 === 0);
  }

  @Mutation
  updateCount(payload: number): void {
    this.count += payload;
  }

  @Mutation
  updateList(payload: Array<number>): void {
    this.list = payload;
  }

  @Action
  async getList(): Promise<boolean> {
    const res: Array<number> = await getList();
    this.updateList(res);
    return Promise.resolve(true);
  }
}

export const AboutStore = getModule(About);
