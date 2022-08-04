<template>
  <form @submit.prevent="onSubmit">
    <h1 class="h3 mb-3 fw-normal">
        {{is_login_form ? '로그인 하세요' : '비밀번호 업데이트'}}
    </h1>
    <small class="text-danger" v-if="invalid == 'wrong_email'">
        이메일이 존재하지 않습니다.
    </small>

    <div class="form-floating">
      <input 
        type="text" 
        class="form-control" 
        id="inputEmail" 
        placeholder="username" 
        required  
        ref="ref_email"
        v-model="email"/>
      <label for="floatingInput">Email address</label>
    </div>
    <small class="text-danger" v-if="invalid == 'wrong_password'">
        비밀번호가 틀렸습니다.
    </small>
    <div class="form-floating">
      <input 
        type="password" 
        class="form-control" 
        id="inputPassword" 
        placeholder="Password"
        required
        v-model="password"
        />
      <label for="floatingPassword">Password</label>
    </div>
    <small class="text-danger" v-if="invalid == 'diff_passwords'"
        >새로운 비밀번호가 다릅니다.</small>
    <div class="form-floating" v-if="!is_login_form">
      <input 
        type="password" 
        class="form-control" 
        :class="{'is-invalid':invalid == 'diff_passwords'}"
        id="inputPasswordNew1" 
        placeholder="New Password"
        required
        v-model="new_password1"
        />
      <label for="floatingPassword">New Password</label>
    </div>

    <div class="form-floating" v-if="!is_login_form">
      <input 
        type="password" 
        class="form-control" 
        :class="{'is-invalid':invalid == 'diff_passwords'}"
        id="inputPasswordNew2" 
        placeholder="Verified Password"
        required
        v-model="new_password2"
        />
      <label for="floatingPassword">New Password</label>
    </div>
    <div class="m-3"></div>
    <div class="checkbox mb-3" v-if="is_login_form">
        <input type="checkbox" v-model="stay" /> 로그인 유지하기
    </div>
    <button class="btn btn0lg btn-primary btn-block" type="submit">
        {{!is_login_form ? '변경하기' : '입장하기'}}
    </button>
    <p class="mt-5 mb-3 text-muted">오직 관리자만 입장할 수 있습니다.</p>
  </form>
</template>

<script lang="ts">
export default {
    name: 'Login',
}
</script>

<script lang="ts" setup>
import {Ref, ref, onMounted, inject } from 'vue';
import useLogin from '/@app_modules/login';
import {getCookie, setCookie} from '/@app_modules/cookie';
import {RSP_RESULT} from '/@app_modules/axios';

const props = defineProps({
    email: {
        type:String,
        default:'',
    },
    type: {
        type:String,
        default: 'login',
    },
});
const toast:Ref<string> = inject('toast', ref(""));

const emits = defineEmits(['state']);
const ref_email = ref(null);
const stay = ref(false);
const is_login_form = ref(props.type == 'login');
const email = ref(props.email);
const password = ref('');
const new_password1 = ref('');
const new_password2 = ref('');
const invalid = ref('ok');
const {updatePassword, login} = useLogin();

stay.value = getCookie('stay') == 'true';

const onSubmit = (evt:Event) => {
    invalid.value = 'ok';
    if(is_login_form.value) {
        login(email.value, password.value)
            .then((result:RSP_RESULT) => {
                setCookie('email', email.value);
                setCookie('token', result.data.token);

                if(stay.value) {
                    setCookie('stay', 'true');
                } else {
                    setCookie('stay', 'false');
                    setCookie('token', '');
                }
                emits('state');
            })
            .catch((err: Error) => {
                invalid.value = err.message;
                console.log(err);
            });
    } else {
        if(new_password1.value != new_password2.value) {
            invalid.value = 'diff_passwords';
            toast.value = '새로운 비밀번호가 다릅니다.';
            new_password1.value = new_password2.value = '';
        } else {
            updatePassword(email.value, new_password1.value, password.value)
                .then((data:RSP_RESULT) => {
                    password.value = new_password1.value = new_password2.value = '';
                    is_login_form.value = true;
                })
                .catch((err:Error) => {
                    invalid.value = err.message;
                });
        }
    }
};

onMounted(() => {
    ref_email.value.focus();
});

</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.form-signin > .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
</style>
