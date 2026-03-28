const Notes = {
  template: `
    <div class="section" id="notes">
      <h2 @click="toggle" :class="{ open: isOpen }">学习笔记</h2>
      <div class="content" :class="{ active: isOpen }">
        <div class="note-list">
          <div
            v-for="note in noteList"
            :key="note.id"
            class="note-item"
            @click="openNotePage(note)"
          >
            <span class="note-title">{{ note.title }}</span>
            <span class="note-date">{{ note.date }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      isOpen: false,
      noteList: [
        { id: 1, title: 'Vue 组件化开发总结', date: '2026-03-20', file: 'note/note-vue.md' },
        { id: 2, title: '前端个人学习笔记合集', date: '2026-03-28', file: 'note/前端个人学习笔记CSS.md' },
        { id: 3, title: '滚动渐入与懒加载', date: '2026-03-25', file: 'note/note-intersection.md' },
      ]
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    // 跳转到单独笔记页面
    openNotePage(note) {
      window.open(
        `note-page.html?md=${note.file}&title=${encodeURIComponent(note.title)}`,
        '_blank'
      )
    }
  }
}