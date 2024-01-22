
import { useRouter } from 'vue-router';

import { useRouter } from 'vue-router';

import { radioEmits } from 'element-plus';
<template>
  <h2>HOTEL BOOKING APP</h2>
  <el-form
    ref="form"
    :model="formData"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    size="default"
    status-icon
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="formData.username" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="formData.password" type="password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">
        Login
      </el-button>
      <el-button @click="resetForm">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus';
import useAuth from "../composables/useAuth";
import router from "../router";

const form = ref<FormInstance>();
const formData = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules<typeof FormData>>({
  username: [{ required: true }],
  password: [{ required: true }],
});

const { login } = useAuth();

const submitForm = async () => {
  if (!form.value) return
  await form.value.validate(async (valid, fields) => {
    if (valid) {
      try {
        await login(formData.username, formData.password);
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = () => {
  if (!form.value) return
  form.value.resetFields()
}

</script>
