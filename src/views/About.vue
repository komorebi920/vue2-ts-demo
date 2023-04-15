<template>
  <div class="about">
    <h1>This is an about page</h1>

    <p>{{ firstName }}</p>
    <p>{{ lastName }}</p>
    <p>{{ fullName }}</p>
    <button @click="modifyFullName">修改 fullName</button>

    <hr />

    <User
      v-for="user in userList"
      :key="user.id"
      v-bind="user"
      @change-age="changeAge"
      @on-remove="remove"
      v-model="firstName"
    ></User>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import User from "@/components/User.vue";

interface IUser {
  id: number;
  name: string | number;
  age: number;
  sex?: number;
}

@Component({
  name: "About",
  components: { User },
})
export default class About extends Vue {
  firstName = "zhang";
  lastName = "san";

  userList: Array<IUser> = [
    { id: 1, name: "张三", age: 20, sex: 1 },
    { id: 2, name: "李四", age: 18, sex: 0 },
    { id: 3, name: "王五", age: 30, sex: 1 },
  ];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(val: string) {
    const arr = val.split(" ");
    this.firstName = arr[0];
    this.lastName = arr[1];
  }

  modifyFullName(): void {
    this.fullName = "li si";
  }

  @Watch("firstName")
  onFirstNameChange(newVal: string, oldVal: string): void {
    console.log("watch firstName change", newVal, oldVal);
  }

  changeAge(id: number): void {
    const user: IUser | undefined = this.userList.find(
      (user) => user.id === id
    );
    if (user) {
      user.age += 1;
    }
  }

  remove(id: number): void {
    const index = this.userList.findIndex((user) => user.id === id);
    this.userList.splice(index, 1);
  }
}
</script>
