<template>
  <div class="add-list container">
    <h2 class="center-align indigo-text">Add New List</h2>
    <form>
      <div class="field title ">
        <label for="title">List Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field add-item">
        <label for="add-item">Add an item</label>
        <input type="text" name="add-item" />
      </div>
      <div class="field center-align">
        <button class="btn pink">Add List</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddList",
  data() {
    return {
      title: null
    };
  }
};
</script>

<style scoped>
.add-list {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-list h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-list .field {
  margin: 20px auto;
}
</style>
