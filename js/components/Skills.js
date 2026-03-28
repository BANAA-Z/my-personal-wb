const Skills = {
  template: `
    <div class="section" id="skills">
      <h2 @click="toggle" :class="{ open: isOpen }">技能栈</h2>
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
    fetch('md/my-skills.md').then(r=>r.text()).then(t=>{
      this.content = marked.parse(t)
    })
  },
  methods: {
    toggle() { this.isOpen = !this.isOpen }
  }
}