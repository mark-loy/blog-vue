import Vue from 'vue'
//导入代码高亮文件
import hljs from "highlight.js";
//导入高亮的代码风格
import "highlight.js/styles/monokai-sublime.css";

Vue.directive('highlight', function (el) {
  let highlight = el.querySelectorAll('code,pre');
  highlight.forEach((block) => {
    if (block) {
      hljs.highlightBlock(block);
    }
  })
})
