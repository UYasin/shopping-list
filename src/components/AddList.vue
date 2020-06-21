<template>
  <div class="add-list container">
    <h2 class="center-align indigo-text">Add New List</h2>
    <form @submit.prevent="AddList">
      <div class="field title ">
        <label for="title">List Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div v-for="(item, index) in items" :key="index" class="field">
        <label for="item">Item {{ index + 1 }}</label>
        <input type="text" name="item" v-model="items[index]" />
        <i class="material-icons delete" @click="deleteItem(item)">delete</i>
      </div>
      <div class="field add-item">
        <label for="add-item">Add an item</label>
        <!-- <a class="btn-floating btn-small pink position">
          <i @click="addItem" class="material-icons">add</i>
        </a> -->
        <input
          type="text"
          name="add-item"
          @keydown.enter.prevent="addItem"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add List</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "AddList",
  data() {
    return {
      title: null,
      another: null,
      items: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    AddList() {
      if (this.title) {
        this.feedback = null;
        // creating a slug using slugify
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("items")
          .add({
            title: this.title,
            items: this.items,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a title for your list";
      }
    },
    addItem() {
      if (this.another) {
        this.items.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add as an item";
      }
    },
    deleteItem(arg) {
      this.items = this.items.filter(item => {
        return item != arg;
      });
    }
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
  position: relative;
}

.red-text {
  color: maroon;
}

.add-list .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
