import Vue from 'vue'

/* 引入富文本编辑器 */
import VueQuillEditor from 'vue-quill-editor'
/* 引入富文本编辑器公共样式 */
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
Vue.use(VueQuillEditor, /* { default global options } */)