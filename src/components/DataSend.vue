<script setup lang="ts">
import { ref, computed} from 'vue'
import { useUserInfoStore } from '@/store/userInfo';

const userInfoStore = useUserInfoStore()
const data = ref("")

const isDisabled = computed(
    () => {
        return data.value == ""
    }
)

const send = () => 
    fetch('/api/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userInfoStore.userName, data: data.value })
    })
    .then( res => {
        console.log(res)
        if (res.ok) {
            // userInfoStore.setUserName(username.value)
            // router.push('/calendar')
            data.value="true"
        }else {
            // notSatisfy.value = true
            data.value="false"
        }
    })
    .catch ( e => {
        console.log(e)
    })


</script>
<template>
  <textarea class="textarea" v-model="data"></textarea>
    <button class="button" @click="send" :disabled="isDisabled">Send</button>
</template>

<style>
.textarea {
    resize: none;
    width: 100%;
    height: 200px;
    box-sizing: border-box;
}
.button {
    width: 100%;
    height:30px;
}
</style>