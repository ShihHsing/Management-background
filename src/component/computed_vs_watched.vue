<template>
  <div id="computed_vs_watched">
    <el-row>
      <el-col :span="24">
        <el-row type="flex" class="steps" justify="center">
          <el-card class="box-card">
            <h3 style="text-align: center;">{{ fullName }}</h3>
            <el-input v-model="firstName" placeholder=""></el-input>
            <el-input v-model="lastName" placeholder=""></el-input>
            <el-input
              v-if="fullName" 
              v-model="fullName" 
              placeholder=""></el-input>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    name: 'computed_vs_watched',
    data () {
      return {
        firstName: 'Foo',
        lastName: 'Bar',
      }
    },
    computed: {
      fullName: {
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }
  }
</script>

<style lang="less">
@media (max-width: 1200px){

}
@media (max-width: 992px){
  
}
@media (max-width: 768px){
  
}
</style>