<template>
  <el-dialog
    title="Book"
    :visible.sync="currentVisible"
    :close-on-click-modal="false"
    @open="open"
    @close="close"
  >
    <el-form
      ref="form"
      :rules="formRules"
      label-width="120px"
      :model="formValue"
      size="mini"
    >
      <el-form-item label="title" prop="title">
        <el-input v-model="formValue.title"></el-input>
      </el-form-item>
      <el-form-item label="isbn" prop="isbn">
        <el-input v-model="formValue.isbn"></el-input>
      </el-form-item>
      <el-form-item label="pageCount" prop="pageCount">
        <el-input v-model.number="formValue.pageCount"></el-input>
      </el-form-item>
      <el-form-item label="publishedDate" prop="publishedDate">
        <el-date-picker v-model="formValue.publishedDate"></el-date-picker>
      </el-form-item>
      <el-form-item label="status" prop="status">
        <el-select v-model="formValue.status">
          <el-option label="PUBLISH" value="PUBLISH"></el-option>
          <el-option label="MEAP" value="MEAP"></el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        circle
        @click="addRow"
      ></el-button>
      <el-table size="mini" :data="formValue.covers">
        <el-table-column label="ratingcount" prop="ratingcount">
          <template v-slot="{ row, $index }">
            <el-form-item
              :prop="`covers.${$index}.ratingcount`"
              :rules="tableFormRules.ratingcount"
            >
              <el-input v-model.number="row.ratingcount"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="ratingval" prop="ratingval">
          <template v-slot="{ row, $index }">
            <el-form-item
              :prop="`covers.${$index}.ratingval`"
              :rules="tableFormRules.ratingval"
            >
              <el-input-number
                v-model="row.ratingval"
                :precision="1"
                :step="0.1"
                :max="5"
              ></el-input-number>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="action">
          <template v-slot="{ $index }">
            <el-button
              type="danger"
              icon="el-icon-error"
              circle
              @click="deleteRow($index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <template #footer>
      <el-button @click="doClose">取消</el-button>
      <el-button v-if="isCreate" type="primary" @click="create">创建</el-button>
      <el-button v-else type="primary" @click="update">修改</el-button>
    </template>
  </el-dialog>
</template>

<script>
import dialogMixin from '@/mixins/dialogMixin.js'
import { gqlCreateBook, gqlUpdateBook } from '@/gql/mutation/book'
export default {
  mixins: [dialogMixin],
  props: {
    source: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValue: {
        title: null,
        isbn: null,
        pageCount: null,
        publishedDate: null,
        thumbnailUrl: null,
        shortDescription: null,
        longDescription: null,
        status: 'PUBLISH',
        authors: null,
        categories: null,
        covers: [],
      },
      formRules: {
        title: [
          {
            max: 50,
            required: true,
          },
        ],
        isbn: [
          {
            max: 50,
            required: true,
          },
        ],
        pageCount: [
          {
            type: 'number',
            min: 0,
            required: true,
          },
        ],
        publishedDate: [
          {
            // type:'date',
            required: true,
          },
        ],
      },
      tableFormRules: {
        ratingcount: [
          {
            type: 'number',
            required: true,
            min: 1,
          },
        ],
        ratingval: [
          {
            type: 'number',
            required: true,
            min: 0.1,
          },
        ],
      },
    }
  },
  computed: {
    isCreate() {
      return !this.source
    },
  },
  methods: {
    open() {
      if (this.source) {
        Object.keys(this.$data.formValue).forEach(
          (k) => (this.$data.formValue[k] = this.source[k])
        )
        // Object.assign(this.$data.formValue, this.source)
      }
    },
    doClose() {
      this.currentVisible = false
    },
    close() {
      this.$refs.form.resetFields()
    },
    addRow() {
      this.formValue.covers.push({
        ratingcount: 0,
        ratingval: 0,
      })
    },
    deleteRow(idx) {
      this.formValue.covers.splice(idx, 1)
    },
    async create() {
      try {
        await this.$refs.form.validate()
        await this.$apollo.mutate({
          mutation: gqlCreateBook(),
          variables: {
            record: this.formValue,
          },
        })
        this.$message.success('创建成功！')
        this.currentVisible = false
        this.$emit('refresh')
      } catch (error) {
        console.debug(error)
      }
    },
    async update() {
      try {
        await this.$refs.form.validate()
        await this.$apollo.mutate({
          mutation: gqlUpdateBook(),
          variables: {
            id: this.source._id,
            record: this.formValue,
          },
        })
        this.$message.success('修改成功！')
        this.currentVisible = false
        this.$emit('refresh')
      } catch (error) {
        console.debug(error)
      }
    },
  },
}
</script>
