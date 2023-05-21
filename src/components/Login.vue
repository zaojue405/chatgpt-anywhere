<template>
  <div class="login-container">
    <h1 class="page-title">作业帮</h1> <!-- 添加大标题 -->
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
    <MyBeautifulChat ref="myBeautifulChat"></MyBeautifulChat>
  </div>
</template>
  
<script setup>
import { ref, defineEmits, getCurrentInstance } from 'vue'
import MyBeautifulChat from './MyBeautifulChat.vue'

const username = ref('')
const password = ref('')
const instance = getCurrentInstance()

function login() {
  // 模拟登录成功
  const loginSuccess = true
  
  if (loginSuccess) {
    // 登录成功后的逻辑
    console.log('Login:', username.value, password.value)
    if (instance && instance.refs.myBeautifulChat) {
      instance.refs.myBeautifulChat.openFullscreen()
    }
  }
}
</script>

  <style scoped lang="scss">
.login-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* 其他样式规则 */
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  border-radius: 4px;
  background-color: #f1f1f1;
}

h1 {
  text-align: center;
  font-family: "Arial", sans-serif; /* 替换为你希望的字体样式 */
  color: #333; /* 设置标题文本颜色 */
  font-size: 24px; /* 设置标题文本大小 */
  font-weight: bold; /* 设置标题文本粗细 */
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc; /* 设置输入框边框样式 */
  background-color: #fff; /* 设置输入框背景颜色 */
}

button {
  padding: 10px;
  background-color: #007bff; /* 设置按钮背景颜色 */
  color: #fff; /* 设置按钮文本颜色 */
}
</style>
