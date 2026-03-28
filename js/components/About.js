const About = {
  template: `
    <div class="section" id="about">
      <h2 @click="toggle" :class="{ open: isOpen }">关于我</h2>
      <div class="content" :class="{ active: isOpen }" v-html="content"></div>
    </div>
  `,
  data() {
    return {
      content: '',
      isOpen: false
    }
  },
  mounted() {
    fetch('md/about-me.md').then(r=>r.text()).then(t=>{
      this.content = marked.parse(t)
    })
  },
  methods: {
    toggle() { this.isOpen = !this.isOpen }
  }
}