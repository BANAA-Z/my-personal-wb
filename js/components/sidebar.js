const Sidebar = {
  template: `
    <div class="sidebar">
      <div class="logo">我的主页</div>
      <a @click="go('about')" :class="{active:cur=='about'}">关于我</a>
      <a @click="go('skills')" :class="{active:cur=='skills'}">技能栈</a>
      <a @click="go('projects')" :class="{active:cur=='projects'}">项目经历</a>
      <a @click="go('notes')" :class="{active:cur=='notes'}">学习笔记</a>
      <a @click="go('contact')" :class="{active:cur=='contact'}">联系方式</a>
    </div>
  `,
  data() {
    return { cur: 'about' }
  },
  methods: {
    go(id) {
      this.cur = id
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    }
  }
}