<template>
    <button v-bind="$attrs" :type="type" :class="classes" ref="button" v-on="type == 'switch' ? {click : onClick} : {}"><slot></slot></button>
</template>

<script>
import {ref, reactive, onMounted} from 'vue';
export default {
    props: {
        type: {
            default: 'button',
            validator: (val) => {
                const allowed = ['button', 'submit', 'reset', 'switch'];
                return allowed.includes(val);
            },
        },
        sm: Boolean,
        md: {
            type: Boolean,
            default: true,
        },
        lg: Boolean,
        pill: Boolean,
        active: {
            type: Boolean,
            default: true,
        }

    },
    emits: ['update:active'],

    setup(props, context) {
        const classes = reactive([]);
        const button = ref(null);
        const active = ref(props.active);

        if(props.sm) classes.push('sm');
        else if(props.lg) classes.push('lg');
        else classes.push('md')

        if(props.pill) classes.push('pill');
        
        onMounted(() => {
            Object.keys(context.attrs).forEach((attr) => {
                if(attr.startsWith('text-')) {
                    button.value.style.color = attr.substring(5);
                }
                if(attr.startsWith('background-')) {
                    button.value.style.backgroundColor = attr.substring(11);
                }
            });
        });
        const changeBrightness = () => {
            if(props.type == 'switch') {
                if(!active.value) classes.push('deactive');
                else classes.value = classes.pop();
            }
        }
        changeBrightness();

        const onClick = (evt) => {
            if(props.type == "switch"){
                active.value = !active.value;
                changeBrightness();
                context.emit('update:active', active.value);
            }
        }
        return { classes, button, onClick};
    }
}
</script>

<style scoped>
button {
    outline: none;
}
.sm {
    height: 20px;
    font-size: 13px;
}
.md {
    height: 30px;
    font-size: 22px;
}
.lg {
    height: 40px;
    font-size: 31px;
}

.pill {
    border-radius: 16px;
}

.deactive {
    filter: brightness(50%);
}
</style>