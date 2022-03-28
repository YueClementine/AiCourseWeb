<template>
 <el-card  shadow="always">
    <div class="clearfix" >
        <el-form :model="examInfo" label-width="100px" label-position="left">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="试卷名称">
                            <el-input v-model="examInfo.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
        </el-form>
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" label-position="left" >
         
                 <div v-for="(domain, index) in dynamicValidateForm.domains" :key="index"  >
  <el-form-item
    
    :label="'题目'+(index+1)"
    :key="domain.key"
    :prop="'domains.' + index + '.questioncontent'"
    :rules="{
      required: true, message: '题干不能为空', trigger: 'blur'
    }"
  >
  <el-row>
  <el-col :span="8">
    <el-input v-model="domain.questioncontent" ></el-input></el-col> 
  </el-row>
   
   
  </el-form-item>
    <el-form-item
    
    :label="'选项A'"
    :key="domain.key"
    :prop="'domains.' + index + '.opa'"
    :rules="{
      required: true, message: '选项不能为空', trigger: 'blur'
    }"
  >
  <el-row>
  <el-col :span="8">
    <el-input v-model="domain.opa" ></el-input></el-col> 
  </el-row>
   
   
  </el-form-item>
  <el-form-item
    
    :label="'选项B'"
    :key="domain.key"
    :prop="'domains.' + index + '.opb'"
    :rules="{
      required: true, message: '选项不能为空', trigger: 'blur'
    }"
  >
  <el-row>
  <el-col :span="8">
    <el-input v-model="domain.opb" ></el-input></el-col> 
  </el-row>
  </el-form-item>
  <el-form-item
    
    :label="'选项C'"
    :key="domain.key"
    :prop="'domains.' + index + '.opc'"
    :rules="{
      required: true, message: '选项不能为空', trigger: 'blur'
    }"
  >
  <el-row>
  <el-col :span="8">
    <el-input v-model="domain.opc" ></el-input></el-col> 
  </el-row>
  </el-form-item>
  
  <el-form-item
    
    :label="'选项D'"
    :key="domain.key"
    :prop="'domains.' + index + '.opd'"
    :rules="{
      required: true, message: '选项不能为空', trigger: 'blur'
    }"
  >
  <el-row>
  <el-col :span="8">
    <el-input v-model="domain.opd" ></el-input></el-col> 
  </el-row>
   
   
  </el-form-item>


    <el-form-item
    :label="'正确答案'"
    :key="domain.key"
    :prop="'domains.'+index+'.radio'"
  >
      <el-row>
<el-col :span="12">
<el-radio v-model="domain.correctop" label="1">选项A</el-radio>
  <el-radio v-model="domain.correctop" label="2">选项B</el-radio>
  <el-radio v-model="domain.correctop" label="3">选项C</el-radio>
  <el-radio v-model="domain.correctop" label="4">选项D</el-radio>
       </el-col></el-row>
         <el-col :span="6"><el-button type="danger" style="margin-top:20px" @click.prevent="removeDomain(domain)">删除此题</el-button></el-col>

    </el-form-item>



                 </div>

                  <el-row>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    <el-button @click="addDomain">新增题目</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
                  </el-row>
                  
</el-form>

    </div>
 </el-card>
</template>


<script>
import axios from 'axios'
  export default {
    data() {
      return {
          examInfo:{
              name:'',
          },
        dynamicValidateForm: {
          domains: [{
            questioncontent: '',
            opa:'',
            opb:'',
            opc:'',
            opd:'',
            correctop:'1',
          }],
        },
         myheaders:{Authorization:this.$route.params.token},
      };
    },
    methods: {
      submitForm(formName) {
        let data = new FormData;
        data.append('examname',this.examInfo.name);

        console.log(this.dynamicValidateForm.domains);
        data.append('questions',JSON.stringify(this.dynamicValidateForm.domains));
        axios.post(`/api/createExam`,data,{headers:this.myheaders})
        .then(response =>{
					console.log(response)
          this.$message({
          message: '课件创建成功',
          type: 'success'
        });
				})
				.catch(error =>{
					console.log(error)
				})
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          questioncontent: '',
          opa:'',
          opb:'',
          opc:'',
          opd:'',
          correctop:'1',  
          key: Date.now()
        });
      }
    }
  }
</script>

