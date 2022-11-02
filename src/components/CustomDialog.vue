<template>
    <el-dialog v-model="dialogFormVisible" title="Enter data">
        <el-form :model="form" :rules="rules" ref="ruleFormRef">
            <el-form-item label="Name" prop="name">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Birthday" prop="date">
                <el-date-picker
                    v-model="form.date"
                    type="date"
                    placeholder="Pick a day"
                />
            </el-form-item>
            <el-form-item label="Favorite book" prop="book">
                <el-select v-model="form.book" placeholder="Please select a favorite book">
                    <el-option
                        v-for="item in favBook"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Gender" prop="gender">
                <el-radio-group v-model="form.gender">
                    <el-radio label="f" value="f">Female</el-radio>
                    <el-radio label="m" value="m">Male</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="changeData()">
              Confirm
            </el-button>
          </span>
        </template>
    </el-dialog>
</template>

<script>
import dayjs from "dayjs";
export default {
    data(){
        return {
            dialogFormVisible: false,
            formLabelWidth: '140px',
            form: {},
            favBook: [
                {
                    label: '«We» Yevgeny Zamyatin',
                    value: 'we'
                },
                {
                    label: '«Woe From Wit» A. S. Griboyedov',
                    value: 'woe_from_wit'
                },
                {
                    label: '«Pride and Prejudice» Jane Austen',
                    value: 'pride_and_prejudice'
                }
            ],
            rules: {
                name: [
                    {required: true, message: 'Please input Activity name', trigger: 'blur'},
                    {min: 3, max: 50, message: 'Length should be 3 to 50', trigger: 'blur'},
                ],
                book: [
                    {
                        required: true,
                        message: 'Please select Favorite book',
                        trigger: 'change',
                    },
                ],
                gender: [
                    {
                        required: true,
                        message: 'Please select Gender',
                        trigger: 'change',
                    },
                ],
                date: [
                    {
                        type: 'date',
                        required: true,
                        message: 'Please pick a date',
                        trigger: 'change',
                    },
                ],
            }
        }
    },
    methods: {
        formatDate(date) {
            let d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        },
        async changeData() {
            let formEl = this.$refs.ruleFormRef
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    this.dialogFormVisible = false
                    this.form.date = this.formatDate(this.form.date)
                    const bookValue = this.form.book?.value ?? this.form.book
                    this.form.book = this.favBook.find((item) => item.value === bookValue)
                    this.$emit('updateData', this.form)
                } else {
                    console.log('error submit!', fields)
                }
            })
        },
        openDialog(data){
            this.dialogFormVisible = true
            this.form = {}
            if (data){
                const now = new Date()
                now.setDate(now.getDate() + 1)
                this.form['date'] = data?.date ?? dayjs(now).format('YYYY-MM-DD')
                this.form['name'] = data?.name ?? 'Tom'
            }
            this.form['gender'] = data ? data?.gender : 'm'
            this.form['book'] = data ? data?.book : this.favBook[0].value
        }
    }
}


</script>

<style scoped>

</style>
