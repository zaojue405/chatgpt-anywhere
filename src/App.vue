<template>
  <div id="app">
    <div v-if="!isLoggedIn"  class="login-container">
    <h1 class="page-title">HomeworkGenius</h1> <!-- 添加大标题 -->
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">用户名：</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">密码：</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">登录：</button>
    </form>
    <div v-if="loginStatus !== ''">
      <!-- 显示登录结果消息 -->
      {{ loginStatus }}
    </div>
    <p>还没有账号？ <a href="#" @click="showRegistrationForm = true">注册</a></p>
    <div v-if="showRegistrationForm">
    <h1>Register</h1>
    <!-- 注册表单 -->
    <form @submit.prevent="registerUser">
      <label for="register-username">用户名:</label>
      <input type="text" id="username" v-model="registerUsername" required>
      <span :class="{'error-message': usernameError}">{{ usernameError }}</span>

      <label for="register-password">密码:</label>
      <input type="password" id="password" v-model="registerPassword" required>
      <span :class="{'error-message': passwordError}">{{ passwordError }}</span>

      <label for="register-phone">手机号码:</label>
      <input type="tel" id="phone" v-model="registerPhone" required>
      <span :class="{'error-message': phoneError}">{{ phoneError }}</span>

      <label for="register-email">邮箱:</label>
      <input type="email" id="email" v-model="registerEmail" required>
      <span :class="{'error-message': emailError}">{{ emailError }}</span>

      <!-- 其他注册表单字段 -->
      <!-- ... -->

      <button type="submit">Register</button>
    </form>
    </div>
    <div v-if="registrationStatus !== ''">
      <!-- 显示注册结果消息 -->
      {{ registrationStatus }}
    </div>
  </div>

    <div v-else="isLoggedIn">
      <el-collapse v-model="activeNames">
    <el-collapse-item title="历史对话" name="records">
      <el-card class="el-card" style="max-height: 800px; overflow-y: auto;">
        <ConversiationTable
          ref="conversiationTable"
          @seeConversation="seeConversation"
        ></ConversiationTable>
      </el-card>
    </el-collapse-item>
  </el-collapse>
    </div>
  </div>

  
  <MyBeautifulChat
    v-if="isLoggedIn"
    class="my-chat-component"
    ref="myBeautifulChat"
    @close="onChatClose"
    @open="onChatOpen"
    @enter-fullscreen="onEnterChatFullscreen"
    @close-fullscreen="onCloseChatFullscreen"
    :is-fullscreen="isLoggedIn"
  ></MyBeautifulChat>

</template>

<script setup lang="ts">
import { ref, onMounted,nextTick } from 'vue'
// import MyConfig from './components/MyConfig.vue'
// import ConfigGuide from './components/ConfigGuide.vue'
import MyBeautifulChat from './components/MyBeautifulChat.vue'
// import Login from '@/components/Login.vue';
import ConversiationTable from './components/ConversiationTable.vue'
import { useConfig } from './hooks/useConfig'
import { isMobileBrowser } from './utils/isMobileBrowser'
import config from './types/config';

const showRegistrationForm = ref(false);
const myBeautifulChat = ref<InstanceType<typeof MyBeautifulChat> | null>(null)
const conversiationTable = ref<InstanceType<typeof ConversiationTable> | null>(null)
const activeNames = ref(['config', 'records'])
const { hasAllConfig } = useConfig()
const isMobile = isMobileBrowser()
const isLoggedIn = ref(false)
const username = ref('')
const password = ref('')
const registerUsername = ref('');
const registerPassword = ref('');
const registerPhone = ref('');
const registerEmail = ref('');
const usernameError = ref('');
const passwordError = ref('');
const phoneError = ref('');
const emailError = ref('');
const registrationStatus = ref('');
const showLoginForm = ref(true);
const loginStatus = ref('');


function startChat() {
  console.log('startChat')
  myBeautifulChat.value?.openFullscreen()
  
  if (isMobile) {
    activeNames.value[0] = ''
  }
}

function onChatClose() {
  activeNames.value[1] = 'records'
  conversiationTable.value?.loadConversations()
}

function onChatOpen() {
  if (isMobile) {
    activeNames.value[0] = ''
  }
}

function onEnterChatFullscreen() {
  activeNames.value[0] = ''
}

function onCloseChatFullscreen() {
  activeNames.value[1] = 'records'
  conversiationTable.value?.loadConversations()
}

function seeConversation(id: string) {
  myBeautifulChat.value?.seeConversation(id)
}

onMounted(() => {
  console.log('onMounted')
  myBeautifulChat.value?.openFullscreen()
})

function openFullscreen() {
  myBeautifulChat.value?.openFullscreen()
}


async function login() {
  console.log('api:',config.api)
  const url = `${config.api}/login`;
  console.log('url',url)
  const data = {
    username: username.value,
    password: password.value
  };
  console.log('Login:', username.value, password.value)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.success) {
        console.log('Login successful');
        isLoggedIn.value = true;
        onMounted(() => {
          myBeautifulChat.value?.openFullscreen();
        });
      } else {
        console.log('Login failed:', responseData.message);
      }
    } else {
      const errorMessage = await response.text();
      console.log('Login failed:', errorMessage);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
function register() {
  // 注册逻辑
  // 模拟注册成功
  const registerSuccess = true;

  if (registerSuccess) {
    // 注册成功后的逻辑
    console.log('Register:', username.value, password.value);
    // 其他逻辑...
  }
}
function registerUser() {
  validateUsername();
  validatePassword();
  validatePhone();
  validateEmail();
  // 验证其他字段

  if (usernameError.value || passwordError.value || phoneError.value || emailError.value) {
    // 表单验证失败，处理错误
    return;
  }

  // 表单验证通过，执行注册逻辑
  registerUrl();
}

function validateUsername() {
  // 验证用户名格式
  if (registerUsername.value.trim() === '') {
    usernameError.value = '用户名不能为空';
  } else {
    usernameError.value = '';
  }
}

function validatePassword() {
  // 验证密码格式
  if (registerPassword.value.trim() === '') {
    passwordError.value = '密码不能为空';
  } else if (registerPassword.value.length < 8) {
    passwordError.value = '密码长度不能少于8位';
  } else {
    passwordError.value = '';
  }
}

function validatePhone() {
  // 验证手机号码格式
  const phoneRegex = /^[1-9]\d{10}$/;
  if (!phoneRegex.test(registerPhone.value)) {
    phoneError.value = '手机号码格式不正确';
  } else {
    phoneError.value = '';
  }
}

function validateEmail() {
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registerEmail.value)) {
    emailError.value = '邮箱格式不正确';
  } else {
    emailError.value = '';
  }
}
async function registerUrl() {
  // 异步函数的内容
  const url = config.api +'/register'; // 替换为您的后端接口地址
  const data = {
    username: registerUsername.value,
    password: registerPassword.value,
    phone: registerPhone.value,
    email: registerEmail.value
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      registrationStatus.value = 'Registration successful';
    } else {
      const errorMessage = await response.text();
      registrationStatus.value = 'Registration failed: ' + errorMessage;
    }
  } catch (error) {
    registrationStatus.value = 'Error: ' + error;
  }
}

</script>


<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}


.new-component-container {
  /* 添加样式规则来调整组件的布局和高度 */
  max-width: 100%; /* 设置组件的最大宽度为100% */
  width: 100%; /* 设置组件的宽度为100% */
  margin-top: 20px; /* 调整组件与顶部的间距 */
  background-color: #980505; /* 修改为你想要的背景色 */
}
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
.error-message {
  color: red;
}


</style>
