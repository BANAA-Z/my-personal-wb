const Notes = {
  template: `
    <div class="section" id="notes">
      <h2 @click="toggle" :class="{ open: isOpen }">学习笔记</h2>
      <div class="content" :class="{ active: isOpen }">
        <!-- 新增：搜索框 -->
        <div class="search-box">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="🔍 搜索笔记（支持标题/分类）"
            class="search-input"
            @input="filterNotes"
          />
        </div>

        <!-- 分类循环：支持搜索过滤 -->
        <div 
          v-for="cat in filteredCategories" 
          :key="cat.id"
          class="category"
        >
          <h3 
            @click="toggleCat(cat.id)" 
            :class="{ open: catOpen[cat.id] }"
          >
            {{ cat.name }}
            <span class="arrow">{{ catOpen[cat.id] ? '▼' : '▶' }}</span>
          </h3>

          <div class="category-items" :class="{ open: catOpen[cat.id] }">
            <div
              v-for="note in cat.notes"
              :key="note.id"
              class="note-item"
              @click="openNotePage(note)"
            >
              <span class="note-title">{{ note.title }}</span>
              <span class="note-date">{{ note.date }}</span>
            </div>
          </div>
        </div>

        <!-- 搜索无结果提示 -->
        <div v-if="filteredCategories.length === 0" class="no-result">
          😥 未找到相关笔记
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      isOpen: false,
      searchKeyword: '',
      catOpen: { 1: false, 2: false, 3: false },
      // 原始分类数据（不动，只做过滤）
      categories: [
        {
          id: 1,
          name: "前端",
          notes: [
            { id: 1, title: 'Vue 组件化开发总结', date: '2026-03-20', file: 'note/前端/note-vue.md' },
            { id: 2, title: '前端个人学习笔记合集', date: '2026-03-28', file: 'note/前端/前端个人学习笔记CSS.md' },
            { id: 3, title: '滚动渐入与懒加载', date: '2026-03-25', file: 'note/note-intersection.md' },
          ]
        },
        {
          id: 2,
          name: "单片机",
          notes: [
            { id: 4, title: '51单片机中断系统', date: '2026-03-15', file: 'note/mcu-51.md' },
            { id: 5, title: 'STM32 GPIO 配置', date: '2026-03-18', file: 'note/mcu-stm32.md' },
          ]
        },
        {
          id: 3,
          name: "其他",
          notes: [
            { id: 6, title: 'Linux 常用命令', date: '2026-03-10', file: 'note/linux.md' },
          ]
        }
      ]
    };
  },
  computed: {
    // 过滤后的分类数据（核心搜索逻辑）
    filteredCategories() {
      if (!this.searchKeyword.trim()) return this.categories;
      
      const keyword = this.searchKeyword.toLowerCase();
      return this.categories
        .map(cat => ({
          ...cat,
          // 过滤当前分类下的笔记
          notes: cat.notes.filter(note => 
            note.title.toLowerCase().includes(keyword) || 
            cat.name.toLowerCase().includes(keyword)
          )
        }))
        // 只保留有笔记的分类
        .filter(cat => cat.notes.length > 0);
    }
  },
  methods: {
    toggle() { this.isOpen = !this.isOpen; },
    toggleCat(id) { this.catOpen[id] = !this.catOpen[id]; },
    openNotePage(note) {
      window.open(`note-page.html?md=${note.file}&title=${encodeURIComponent(note.title)}`, '_blank');
    },
    filterNotes() {
      // 搜索时自动展开所有分类，方便查看结果
      Object.keys(this.catOpen).forEach(key => {
        this.catOpen[key] = true;
      });
    }
  }
};