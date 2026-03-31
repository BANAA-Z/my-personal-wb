const Notes = {
  template: `
    <div class="section" id="notes">
      <h2 @click="toggle" :class="{ open: isOpen }">学习笔记</h2>
      <div class="content" :class="{ active: isOpen }">
        <div class="note-list">

          <!-- 分类 1：前端 -->
          <div class="category">
            <h3 @click="toggleCat(1)" :class="{ open: catOpen[1] }">
              前端
              <span class="arrow">{{ catOpen[1] ? '▼' : '▶' }}</span>
            </h3>
            <div class="category-items" :class="{ open: catOpen[1] }">
              <div
                v-for="note in frontNotes"
                :key="note.id"
                class="note-item"
                @click="openNotePage(note)"
              >
                <span class="note-title">{{ note.title }}</span>
                <span class="note-date">{{ note.date }}</span>
              </div>
            </div>
          </div>

          <!-- 分类 2：单片机 -->
          <div class="category">
            <h3 @click="toggleCat(2)" :class="{ open: catOpen[2] }">
              单片机
              <span class="arrow">{{ catOpen[2] ? '▼' : '▶' }}</span>
            </h3>
            <div class="category-items" :class="{ open: catOpen[2] }">
              <div
                v-for="note in mcuNotes"
                :key="note.id"
                class="note-item"
                @click="openNotePage(note)"
              >
                <span class="note-title">{{ note.title }}</span>
                <span class="note-date">{{ note.date }}</span>
              </div>
            </div>
          </div>

          <!-- 分类 3：其他 -->
          <div class="category">
            <h3 @click="toggleCat(3)" :class="{ open: catOpen[3] }">
              其他
              <span class="arrow">{{ catOpen[3] ? '▼' : '▶' }}</span>
            </h3>
            <div class="category-items" :class="{ open: catOpen[3] }">
              <div
                v-for="note in otherNotes"
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
      </div>
    </div>
  `,
  data() {
    return {
      isOpen: false,
      catOpen: { 1: false, 2: false, 3: false },
      
      frontNotes: [
        { id: 1, title: 'Vue 组件化开发总结', date: '2026-03-20', file: 'note/note-vue.md' },
        { id: 2, title: '前端个人学习笔记合集', date: '2026-03-28', file: 'note/前端个人学习笔记CSS.md' },
        { id: 3, title: '滚动渐入与懒加载', date: '2026-03-25', file: 'note/note-intersection.md' },
      ],
      
      mcuNotes: [
        { id: 4, title: '51单片机中断系统', date: '2026-03-15', file: 'note/mcu-51.md' },
        { id: 5, title: 'STM32 GPIO 配置', date: '2026-03-18', file: 'note/mcu-stm32.md' },
      ],
      
      otherNotes: [
        { id: 6, title: 'Linux 常用命令', date: '2026-03-10', file: 'note/linux.md' },
      ]
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    toggleCat(id) {
      this.catOpen[id] = !this.catOpen[id];
    },
    openNotePage(note) {
      window.open(
        `note-page.html?md=${note.file}&title=${encodeURIComponent(note.title)}`,
        '_blank'
      );
    }
  }
};