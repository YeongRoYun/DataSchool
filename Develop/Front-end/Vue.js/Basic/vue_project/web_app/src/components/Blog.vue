<template>
<main class="container mb-3">
  <div class="row g-5">
    <div class="col-md-8">
      <h3 class="pb-4 mb-4 fst-italic border-bottom">
        곰돌이네
      </h3>
      <article class="blog-post" v-for="article in slide_posts" :key="article.id" :id="'article-'+article.id">
        <h2 class="blog-post-title mb-1">{{article.title}}</h2>
        <p class="blog-post-meta">{{article.date}}</p>
        <div v-html="article.post" v-if="article.type=='html'"/>
        <markdown class="border" id="md" :source="article.post" v-else-if="article.type=='md'"/>
      </article>

      <!--Pagination-->
      <nav class="blog-pagination" aria-label="Pagination">
        <a 
            class="btn" 
            :class="[page == 1 ? 'btn-outline-secondary disabled' : 'btn-outline-primary', ]" 
            @click.prevent="page--"
            href="#">Older</a>
        <a 
            class="btn"
            :class="[page == total_pages ? 'btn-outline-secondary disabled' : 'btn-outline-primary']"
            @click.prevent="page++"
            href="#">Newer</a>
      </nav>

    </div>

    <div class="col-md-4">
      <div class="position-sticky" style="top: 2rem;">
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">About</h4>
          <p class="mb-0">피스타치오 버블티는 맛있당!</p>
        </div>

        <div class="p-4">
          <h4 class="fst-italic">Archives</h4>
          <ol class="list-unstyled mb-0">
            <li v-for="(archive, index) in archives" :key="index">
                <a data-bs-toggle="collapse" :data-bs-target="'#archive-' + index" href="#">{{archive.key}}</a>
                <div class="collapse" :id="'archive-' + index">
                    <ol class="list-unstyled ms-3">
                        <li 
                        v-for="post in archive.data"
                        :key="post.id">
                            {{ post.date.substring(0, 10) + ': '}}
                            <a :href="'#article-'+post.id" @click.prevent="onArchive($event, post.id)">{{post.title.substring(0,20)}}</a>
                        </li>
                    </ol>
                </div>
            </li>
          </ol>
        </div>

        <div class="p-4">
          <h4 class="fst-italic">Elsewhere</h4>
          <ol class="list-unstyled">
            <li><a href="https://github.com/YeongRoYun/DataSchool">GitHub</a></li>
          </ol>
        </div>
      </div>
    </div>
  </div>

</main>
</template>

<script lang="ts">
export default {
    name: 'Blog',
}
</script>

<script lang="ts" setup>
import useAxios from '/@app_modules/axios';
import { RSP_RESULT } from '/@app_modules/axios';
import Markdown from 'vue3-markdown-it';
import { ref, reactive, computed, onMounted, ComputedRef} from 'vue';

const { axiosGet } = useAxios();
type Post={id:number, date:string, post:string, title:string, type:string};
const posts:Post[] = reactive([]);

//Pagination
const rows = ref(5);
const total_rows = ref(0);
const page = ref(1);
const total_pages = computed(() => Math.ceil(total_rows.value / rows.value));
const slide_posts:ComputedRef<Post[]> = computed(() => posts.slice((page.value - 1)*rows.value, page.value*rows.value));

//Archives
const archives:{key:string, data:Post[]}[] = reactive([]);
const onArchive = (evt:Event, id:number) => {
    const index = posts.findIndex((post) => post.id == id) + 1; //Start with 1
    page.value = Math.ceil(index / rows.value);
}

const onSuccess = (data:RSP_RESULT) => {
    Object.assign(posts, data.data);
    total_rows.value = posts.length;

    const temp_group:{[key:string]:Post[]} = posts.reduce((acc:{[key:string]:Post[]}, cur:Post) => {
        (acc[cur['date'].substring(0, 7)] = acc[cur['date'].substring(0, 7)] || []).push(cur);
        return acc;
    }, {});
    Object.assign(archives, Object.keys(temp_group).map((key:string) => ({key: key, data: temp_group[key]})));
};
onMounted(() => {
    axiosGet('/db/blog', onSuccess);
    console.log(posts);
});
</script>

<style scoped>
/* Pagination */
.blog-pagination {
  margin-bottom: 4rem;
}

/*
 * Blog posts
 */
.blog-post {
  margin-bottom: 4rem;
}
.blog-post-title {
  font-size: 2.5rem;
}
.blog-post-meta {
  margin-bottom: 1.25rem;
  color: #727272;
}
</style>