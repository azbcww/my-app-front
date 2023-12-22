<script setup lang="ts">
import { ref, computed} from 'vue'
import { useUserInfoStore } from '@/store/userInfo'
import type { ResponseData } from '@/interfaces'

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
        if (res.ok) {
            const event = res.json()
            return event
        }else {
            return Promise.reject(new Error('error'))
        }
    })
    .then(res => {
        const event = res as ResponseData
        if (event.error != "") {
            alert("入力データのフォーマットが不正です．\n開始日と終了日の年，月，日(時)を指定してください．\n\n引用\n\"日付表現で不足している情報があった場合、yearは実行時の年、monthおよびdayは1が補完されます。\"\n日付型/時間型への変換[https://ja-timex.github.io/docs/to_datetime/]")
            console.log(event.error)
            return
        }
        alert("次の予定を作成しました．\ntitle: " + data.value + "\nstart: " + event.start + "\nsend: " + event.end)
        data.value=""
        location.reload()
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