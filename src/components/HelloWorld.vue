<template>
  <div class="hello">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <label for="">From</label>
          <input type="date" v-model="startDate" />

          <label for="">To</label>
          <input type="date" v-model="endDate" />
          <input @click="getData" type="button" value="submit" />
        </div>
      </div>
    </div>

    <table border="1">
      <tr>
        <th>Title</th>
        <th>Abscract</th>
        <th>Date</th>
        <th>Link to full artical</th>
      </tr>
      <tr v-for="data in info">
        <td>{{ data.title }}</td>
        <td>{{ data.abstract }}</td>
        <td>{{ data.published_date }}</td>
        <td><a v-bind:href="data.url" target="_blank">link</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: null,
      search: "",
      startDate: null,
      endDate: null,
    };
  },
  mounted() {},
  methods: {
    getData() {
      fetch(
        "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=vsIuBLZYxaCgo2grLGGtTqkjiiGl27mL"
      )
        .then((response) => response.json())
        .then((res) => {
          const startDate = this.startDate; // Date or null
          const endDate = this.endDate;
          if (this.startDate !== null && this.endDate !== null) {
            this.info = [];
            for (const key in res.results) {
              const itemDate = res.results[key].published_date;
              if (startDate <= itemDate && itemDate <= endDate) {
                this.info.push(res.results[key]);
              }
            }
          } else {
            this.info = res.results;
          }
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
  border-spacing: 0;
}
.header {
  font-size: 15px;
}
</style>
