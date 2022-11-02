<template>
  <main>
      <section v-for="(item, index) in tableData" :key="index">
          <h2>Table {{index + 1}}</h2>
          <el-table :data="item" border style="width: 770px">
              <el-table-column prop="name" label="Name"  />
              <el-table-column prop="date" label="Date" width="160" />
              <el-table-column prop="book.label" label="Favorite book" width="280" />
              <el-table-column prop="gender" label="Gender" />
              <el-table-column label="Operations" width="150">
                  <template #default="scope">
                      <el-button size="small" @click="handleEdit(scope.$index, scope.row, index)"
                      >Edit</el-button
                      >
                      <el-button
                          size="small"
                          type="danger"
                          @click="deleteRow(scope.$index, index)"
                      >Delete</el-button
                      >
                  </template>
              </el-table-column>
          </el-table>
          <el-button class="mt-4" style="width: 100%; margin-top: 20px" @click="onAddItem(index)">Add Item</el-button>
      </section>
      <CustomDialog ref="dialogComponent" @updateData ="updateData" />
  </main>
</template>

<script>
import testData from './data/test'
import CustomDialog from './components/CustomDialog.vue'
export default {
    components: {
        CustomDialog
    },
    data() {
        return {
            tableData: [Object.assign([], testData), testData],
            edit: {
                table: 0,
                row: 0
            },
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
            ]
        }
    },

    methods: {
        handleEdit(index, row, tableNumber) {
            console.log(index, tableNumber)
            this.$refs.dialogComponent.openDialog(row)
            this.edit = {
                table: tableNumber,
                row: index
            }
        },
        deleteRow(index, tableNumber) {
            this.tableData[tableNumber].splice(index, 1)
        },
        onAddItem (tableNumber)  {
            this.edit.table = tableNumber
            this.edit.row = this.tableData[tableNumber].length
            this.$refs.dialogComponent.openDialog()
        },
        updateData(data) {
            this.tableData[this.edit.table][this.edit.row] = Object.assign([], data)
        },
    },
}

</script>

<style scoped>
section{
    margin: 0 0 50px;
}
</style>
