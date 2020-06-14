<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="城市">
        <el-input v-model="formInline.location" placeholder="城市"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="formInline.keyword" placeholder="详细地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="getLoaclhost">获取当前地址</el-button>
      </el-form-item>
    </el-form>

    <baidu-map class="map" :center="location" :zoom="zoom" @ready="handler">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
      <bm-local-search
        v-if="true"
        class="search"
        :keyword="map.keyword"
        :auto-viewport="true"
        :location="map.location"
      ></bm-local-search>
    </baidu-map>
  </div>
</template>
 
<script>
export default {
  name: "simple-map",
  data() {
    return {
      formInline: {
        location: "",
        keyword: ""
      },
      map: {
        location: "成都",
        keyword: "电子科技大学成都学院"
      },
      BMap: Object,
      curPoint: {} // 当前选中的坐标
    };
  },
  methods: {
    handler({ BMap, map }) {
      let me = this;
      console.log(BMap);
      this.BMap = BMap;
      // 鼠标缩放
      map.enableScrollWheelZoom(true);
      // 点击事件获取经纬度
      map.addEventListener("click", function(e) {
        console.log(e);
        console.log(e.point.lng, e.point.lat);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(new BMap.Point(e.point.lng, e.point.lat), rs => {
          console.log(rs);
          me.$emit("select-location", {
          lng: e.point.lng,
          lat: e.point.lat,
          address: rs.address
        });
        });
      });
    },
    getLoaclhost() {
      console.log(this.BMap);
      if (!this.BMap) return false;
      let BMap = this.BMap;
      let geolocation = new BMap.Geolocation();
      var geoc = new BMap.Geocoder();
      let _this = this;
      let point;
      geolocation.getCurrentPosition(function(r) {
        console.log(r);
        point = r.point;
        // _this.map_center = r.point
        // _this.shop_lng = r.point.lng
        // _this.shop_lat = r.point.lat
        console.log(point);
        geoc.getLocation(new BMap.Point(point.lng, point.lat), rs => {
          console.log(rs);
        });
      });
    },
    onSubmit() {
      console.log(this.formInline);
      this.map.location = this.formInline.location;
      this.map.keyword = this.formInline.keyword;
    }
  }
};
</script>
 
<style scoped>
.map {
  width: 100%;
  height: 400px;
}
.map .search {
  margin-bottom: 65px;
}
</style>