<template>
  <!-- 内容区域 -->
  <div v-if="context.length !== 0">

    <div class="article-content ">
      <mavon-editor
        v-model="context"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        codeStyle="gruvbox-dark"
      ></mavon-editor>
    </div>

  </div>
</template>

<script>

export default {
  props: {
    context: {
      type: String,
    },
  },
};
</script>

<style scoped>


.article-content {
  margin: 20px 0;
}
</style>