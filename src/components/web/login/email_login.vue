<script setup lang="ts">
import {ref} from "vue";
import Send_email from "@/components/web/login/send_email.vue";
import Email_register from "@/components/web/login/email_register.vue";

const step =ref(1)
const emailID =ref("")
const emits =defineEmits(["ok"])

async function sendEmailOk(data:string) {
emailID.value = data
  step.value=2
}
async function emailRegisterOk(data:string){
  emits("ok",data)
}


</script>

<template>
<send_email v-if="step ===1" @ok="sendEmailOk"></send_email>
  <email_register :email-i-d="emailID" v-if="step === 2" @ok="emailRegisterOk"></email_register>
</template>

<style lang="less">

</style>