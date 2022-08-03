<template>
<form @submit.prevent="onSubmit" class="m-1 row">
    <div class="text-right my-2">
        <button class="btn btn-primary btn-sm" type="submit">저장하기</button>
    </div>
    <div>
        <input v-model="title" placeholder="제목" class="w-100 my-2" required />
    </div>
    <div class="col-sm-6">
        <textarea
            id="mdTextarea"
            class="w-100"
            v-model="content"
            ref="input"
            required
        ></textarea>
    </div>
    <div class="col-sm-6 text-left" id="preview" ref="output">
        <markdown class="border" id="md" :source="content" />
    </div>
</form>
</template>

<script lang="ts">
export default {
    name: 'Editor',
}
</script>

<script lang="ts" setup>
import Markdown from 'vue3-markdown-it';
import { ref, onMounted } from 'vue';
import useAxios from '/@app_modules/axios';
import { RSP_RESULT } from '/@app_modules/axios.js';

const { axiosPost } = useAxios();
const title = ref("");
const content = ref("");

const onSubmit = (evt:Event) => {
    if(content.value.length > 0) {
        axiosPost(
            "/db/blog", {
                title: title.value,
                content: content.value,
                type:'md',
            },
            (data:RSP_RESULT) => {
                console.log("저장하였습니다.");
                title.value = content.value = '';
            },
            (err:Error) => {
                console.log("저장하지 못했습니다.");
            }
        );
    } else {
        console.log("컨텐츠를 작성하세요.");
    }
}
</script>

<style scoped>
#mdTextarea {
    height: 500px;
}
#md {
    height: 500px;
    overflow: scroll;
}
</style>