<template>
    <div class="b-date-picker">
        <el-date-picker
            v-model="dateValue"
            type="date"
            placeholder="Pick a day"
            :readonly = isEdit
            :default-time="$props.data"
        />
    </div>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    data: {
        type: String,
        required: true
    }
})
let dateValue = ref(props.data)
let isEdit= false

</script>

<style scoped>
.b-date-picker {
    display: flex;
    width: 100%;
    max-width: 160px;
    padding: 0;
    flex-wrap: wrap;
}
</style>
