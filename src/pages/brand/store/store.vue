<template>
  <div class="store">
    <el-row>
      <el-col :span="4" v-for="(item,index) in items" :key="index" style="margin: 25px;">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="card">
            <div class="images">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
            </div>
            <div style="padding: 14px;height:20%;line-height:20%;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <time class="time">地址:{{item.address}}</time>
              </div>
            </div>
            <div class="button_m">
              <!-- <el-button type="text" class="button">编辑</el-button> -->
              <div>
                <el-tooltip effect="dark" content="编辑" placement="bottom">
                  <i class="el-icon-edit" @click="getStoreInfo(item)"></i>
                </el-tooltip>
              </div>
              <div>
                <el-tooltip effect="dark" content="分享" placement="bottom">
                  <i class="el-icon-share"></i>
                </el-tooltip>
              </div>
              <div>
                <el-tooltip effect="dark" content="删除" placement="bottom">
                  <i class="el-icon-delete" @click="deleteStore(item)"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4" style="margin: 25px;">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="card">
            <div class="add">
              <el-tooltip class="add_ion" effect="dark" content="新增" placement="bottom">
                <i class="el-icon-plus" @click="addStore"></i>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>
      <el-dialog title="创建门店" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="店名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店长" :label-width="formLabelWidth">
            <el-input v-model="form.manager" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" @focus="focus($event)" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="门店地址" :visible.sync="MapFormVisible">
        <MyMap @select-location="selectLocation"></MyMap>
      </el-dialog>
    </div>
  </div>
</template>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  /* display: block; */
}
.images {
  height: 70%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.store {
  height: 100%;
  margin: 25px;
  overflow: auto;
}
.button_m {
  display: flex;
  font-size: 20px;
  justify-content: space-evenly;
  margin-top: 12px;
  height: 10%;
}
.add {
  height: 100%;
  text-align: center;
  font-size: 45px;
  text-align: center;
}
.add_ion {
  margin-top: 50%;
}
.card {
  max-height: 380px;
  height: 300px;
  display: flex;
  flex-direction: column;
}
</style>
<script>
import MyMap from "../../../components/map/map";
export default {
  data() {
    return {
      currentDate: new Date(),
      items: [],
      dialogFormVisible: false,
      MapFormVisible: false,
      form: {
        name: "",
        mobilePhone: "",
        manager: "",
        address: "",
        type: 0,
        lng: 0,
        lat: 0,
        locationCode: ""
      },
      formLabelWidth: "70px"
    };
  },
  methods: {
    add: function() {
      console.log(this.form);
      if(this.form.id){
        console.log('编辑------');
        this.$server
        .put("http://132.232.17.86:8060/store", this.form)
        .then(data => {
          console.log(data);
          this.dialogFormVisible = false;
          this.$message({
            message: "编辑门店成功！！！",
            type: "success"
          });

          this.$server
            .fetch("http://132.232.17.86:8060/store/all", {})
            .then(data => {
              this.items = data.data;
            });
        });

      }else{
       this.$server
        .post("http://132.232.17.86:8060/store", this.form)
        .then(data => {
          console.log(data);
          this.dialogFormVisible = false;
          this.$message({
            message: "创建门店成功！！！",
            type: "success"
          });

          this.$server
            .fetch("http://132.232.17.86:8060/store/all", {})
            .then(data => {
              this.items = data.data;
            });
        });

      }


    },
    showMap: function() {
      this.MapFormVisible = true;
    },
    addStore: function() {
      this.form = {
        name: "",
        mobilePhone: "",
        manager: "",
        address: "",
        type: 0,
        lng: 0,
        lat: 0,
        locationCode: ""
      };
      this.dialogFormVisible = true;
    },
    focus: function(event) {
      console.log(event);
      this.MapFormVisible = true;
    },
    selectLocation: function(e) {
      console.log(e);
      this.form.lng = e.lng;
      this.form.lat = e.latitude;
      this.form.address = e.address;
      this.MapFormVisible = false;
    },
    deleteStore: function(item) {
      console.log(item);
      console.log(item.id);
      const id = item.id;
      this.$server
        .Delete("http://132.232.17.86:8060/store/" + id, {})
        .then(data => {
          this.$message({
            message: "删除门店成功！！！",
            type: "success"
          });

          this.$server
            .fetch("http://132.232.17.86:8060/store/all", {})
            .then(data => {
              console.log(data);
              this.items = data.data;
            });
        });
    },
    getStoreInfo:function(item){
      this.form = item;
      this.dialogFormVisible = true;
    }
  },
  components: {
    MyMap: MyMap // 映射组件标签
  },
  created: function() {
    this.$server.fetch("http://132.232.17.86:8060/store/all", {}).then(data => {
      console.log("------------------");
      console.log(data);
      this.items = data.data;
    });
  }
};
</script>
