<script setup lang="ts">
import { ref, computed} from 'vue'
import { useUserInfoStore } from '@/store/userInfo';
import { useEventStore } from '@/store/event'
import type { MyEvent, ResponseData } from '../interfaces'

const userInfoStore = useUserInfoStore()
const eventStore = useEventStore()
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
            return Promise.reject(new Error('error'));
        }
    })
    .then(res => {
        console.log()
        const event = res as ResponseData
        if (event.error != "") {
            console.log(event.error)
            return
        }
        const ID = eventStore.getEvents.length + 1
        eventStore.setEvent({
            id: String(ID),
            title: data.value,
            start: event.start,
            end: event.end,
        })
        data.value=""
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