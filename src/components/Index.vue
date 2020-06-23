<template>
  <div class="index container">
    <div class="card" v-for="list in Lists" :key="list.id">
      <i class="material-icons delete" @click="deleteList(list.id)">delete</i>
      <div class="card-content">
        <h2 class="indigo-text">{{ list.title }}</h2>
        <ul class="items">
          <li v-for="(item, index) in list.items" :key="index">
            <span class="chip">{{ item }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link
          :to="{ name: 'EditList', params: { list_slug: list.slug } }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      Lists: []
    };
  },
  methods: {
    deleteList(id) {
      //delete doc from firestore
      db.collection("items")
        .doc(id)
        .delete()
        .then(
          () =>
            (this.Lists = this.Lists.filter(list => {
              return list.id != id;
            }))
        );
    }
  },
  created() {
    //fetching data from firestore
    db.collection("items")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let list = doc.data();
          list.id = doc.id;
          this.Lists.push(list);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 50px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .items {
  margin: 30px auto;
}

.index .items li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
