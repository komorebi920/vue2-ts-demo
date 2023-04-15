<template>
  <div>
    <div>firstName: <input :value="firstName" @input="onFirstNameInput" /></div>
    <span>姓名: {{ userName }}, </span>
    <span>性别: {{ Sex[sex] }}, </span>
    <span>年龄: {{ age }} </span>
    <button @click="changeAge">年龄 + 1</button>
    <button @click="remove">删除</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Model } from "vue-property-decorator";

enum Sex {
  "男" = 1,
  "女" = 0,
}

@Component({
  name: "User",
})
export default class User extends Vue {
  Sex = Sex;

  get userName(): string | number {
    return this.name;
  }

  @Model("onFirstNameChange", { type: String })
  firstName!: string;

  @Prop(Number)
  id!: number;

  @Prop([String, Number])
  name!: string | number;

  @Prop(Number)
  sex!: number;

  @Prop({ type: Number, default: 1 })
  age!: number;

  @Emit()
  changeAge(): number {
    // @change-age
    return this.id;
  }

  @Emit("on-remove")
  remove(): number {
    return this.id;
  }

  @Emit("onFirstNameChange")
  onFirstNameInput(ev: Event): string {
    return (ev.target as HTMLInputElement).value;
  }
}
</script>
