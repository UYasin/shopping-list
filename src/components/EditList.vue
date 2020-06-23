<template>
  <div v-if="List" class="edit-list container">
    <h2>Edit {{ List.title }} List</h2>

    <form @submit.prevent="EditList">
      <div class="field title ">
        <label for="title">List Title:</label>
        <input type="text" name="title" v-model="List.title" />
      </div>
      <div v-for="(item, index) in List.items" :key="index" class="field">
        <label for="item">Item {{ index + 1 }}</label>
        <input type="text" name="item" v-model="List.items[index]" />
        <i class="material-icons delete" @click="deleteItem(item)">delete</i>
      </div>
      <div class="field add-item">
        <label for="add-item">Add an item</label>

        <input
          type="text"
          name="add-item"
          @keydown.enter.prevent="addItem"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update List</button>
      </div>
    </form>

    <div></div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditList",
  data() {
    return {
      List: null,
      another: null,
      feedback: null
    };
  },
  created() {
    let ref = db
      .collection("items")
      .where("slug", "==", this.$route.params.list_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.List = doc.data();
        this.List.id = doc.id;
      });
    });
  },
  methods: {
    addItem() {
      if (this.another) {
        this.List.items.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add as an item";
      }
    },
    deleteItem(arg) {
      this.List.items = this.List.items.filter(item => {
        return item != arg;
      });
    },
    EditList() {
      if (this.List.title) {
        this.feedback = null;
        // creating a slug using slugify
        this.List.slug = slugify(this.List.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("items")
          .doc(this.List.id)
          .update({
            title: this.List.title,
            items: this.List.items,
            slug: this.List.slug
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
    }
  }
};
</script>

<style scoped>
.edit-list {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-list h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-list .field {
  margin: 20px auto;
  position: relative;
}

.red-text {
  color: maroon;
}

.edit-list .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
