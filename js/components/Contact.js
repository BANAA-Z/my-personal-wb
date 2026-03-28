const Contact = {
  template: `
    <div class="section" id="contact">
      <h2 @click="toggle" :class="{ open: isOpen }">联系方式</h2>
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
    fetch('md/contact.md').then(r=>r.text()).then(t=>{
      this.content = marked.parse(t)
    })
  },
  methods: {
    toggle() { this.isOpen = !this.isOpen }
  }
}