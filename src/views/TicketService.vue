<template>
  <div class="ticket-service">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <img src="/logo.svg" alt="情绪e站" class="brand-logo" />
          <div class="brand-text">
            <h1>情绪e站</h1>
            <span class="subtitle">Emotion E-Station</span>
          </div>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/evs-score" class="nav-link">EVS分测评</router-link>
          <router-link to="/financial-services" class="nav-link">智能理财</router-link>
          <router-link to="/emotion-landmark" class="nav-link">情绪e地标</router-link>
        </div>
      </div>
    </nav>

    <div class="container">
      <!-- 英雄区域 -->
      <section class="hero-section">
        <h1>购票服务</h1>
        <p class="hero-subtitle">基于EVS分的智能购票推荐，让每一次体验都值得期待</p>
        <div class="hero-features">
          <div class="feature-item">
            <div class="feature-icon">🎫</div>
            <span>智能推荐</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <span>极速抢票</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💰</div>
            <span>专属优惠</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🛡️</div>
            <span>正品保障</span>
          </div>
        </div>
      </section>

      <!-- 搜索区域 -->
      <section class="search-section">
        <div class="search-container">
          <h2>发现精彩活动</h2>
          <div class="search-form">
            <div class="search-input-group">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索演出、艺人、场馆..."
                class="search-input"
              />
              <button @click="searchEvents" class="search-btn">
                <span class="search-icon">🔍</span>
                搜索
              </button>
            </div>
            <div class="filter-tabs">
              <button
                v-for="category in categories"
                :key="category.id"
                class="filter-tab"
                :class="{ active: activeCategory === category.id }"
                @click="filterByCategory(category.id)"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 推荐活动 -->
      <section class="recommended-section">
        <h2>为您推荐</h2>
        <p class="section-subtitle">基于您的EVS分和兴趣偏好精选</p>
        <div class="events-grid">
          <div
            v-for="event in filteredEvents"
            :key="event.id"
            class="event-card"
            @click="selectEvent(event)"
          >
            <div class="event-image">
              <img :src="event.image" :alt="event.title" />
              <div class="event-badge" v-if="event.isHot">🔥 热门</div>
              <div class="event-discount" v-if="event.discount">{{ event.discount }}折</div>
            </div>
            <div class="event-info">
              <h3>{{ event.title }}</h3>
              <p class="event-artist">{{ event.artist }}</p>
              <div class="event-details">
                <div class="event-date">
                  <span class="icon">📅</span>
                  {{ event.date }}
                </div>
                <div class="event-venue">
                  <span class="icon">📍</span>
                  {{ event.venue }}
                </div>
              </div>
              <div class="event-price">
                <span class="price-from">起</span>
                <span class="price-amount">¥{{ event.priceFrom }}</span>
                <span class="price-original" v-if="event.originalPrice"
                  >¥{{ event.originalPrice }}</span
                >
              </div>
              <div class="event-tags">
                <span v-for="tag in event.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 购票流程 -->
      <section v-if="selectedEvent" class="booking-section">
        <div class="booking-container">
          <div class="booking-header">
            <h2>{{ selectedEvent.title }}</h2>
            <p>{{ selectedEvent.artist }} · {{ selectedEvent.date }} · {{ selectedEvent.venue }}</p>
          </div>

          <div class="booking-steps">
            <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
              <div class="step-number">1</div>
              <div class="step-title">选择票档</div>
            </div>
            <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
              <div class="step-number">2</div>
              <div class="step-title">确认信息</div>
            </div>
            <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
              <div class="step-number">3</div>
              <div class="step-title">支付订单</div>
            </div>
          </div>

          <!-- 步骤1：选择票档 -->
          <div v-if="currentStep === 1" class="step-content">
            <h3>选择票档</h3>
            <div class="ticket-types">
              <div
                v-for="ticket in selectedEvent.tickets"
                :key="ticket.id"
                class="ticket-type"
                :class="{ selected: selectedTicket?.id === ticket.id }"
                @click="selectTicket(ticket)"
              >
                <div class="ticket-info">
                  <h4>{{ ticket.name }}</h4>
                  <p>{{ ticket.description }}</p>
                  <div class="ticket-benefits">
                    <span v-for="benefit in ticket.benefits" :key="benefit" class="benefit">
                      ✓ {{ benefit }}
                    </span>
                  </div>
                </div>
                <div class="ticket-price">
                  <div class="price">¥{{ ticket.price }}</div>
                  <div class="stock">剩余{{ ticket.stock }}张</div>
                </div>
              </div>
            </div>
            <div class="quantity-selector" v-if="selectedTicket">
              <label>购买数量：</label>
              <div class="quantity-controls">
                <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                <span class="quantity">{{ quantity }}</span>
                <button @click="increaseQuantity" :disabled="quantity >= 4">+</button>
              </div>
              <span class="quantity-limit">每人限购4张</span>
            </div>
            <button @click="nextStep" :disabled="!selectedTicket" class="next-btn">下一步</button>
          </div>

          <!-- 步骤2：确认信息 -->
          <div v-if="currentStep === 2" class="step-content">
            <h3>确认购票信息</h3>
            <div class="order-summary">
              <div class="summary-item">
                <span>演出：</span>
                <span>{{ selectedEvent.title }}</span>
              </div>
              <div class="summary-item">
                <span>票档：</span>
                <span>{{ selectedTicket.name }}</span>
              </div>
              <div class="summary-item">
                <span>数量：</span>
                <span>{{ quantity }}张</span>
              </div>
              <div class="summary-item">
                <span>单价：</span>
                <span>¥{{ selectedTicket.price }}</span>
              </div>
              <div class="summary-item total">
                <span>总计：</span>
                <span>¥{{ totalPrice }}</span>
              </div>
            </div>

            <div class="user-info-form">
              <h4>购票人信息</h4>
              <div class="form-group">
                <label>姓名</label>
                <input v-model="userInfo.name" type="text" required />
              </div>
              <div class="form-group">
                <label>手机号</label>
                <input v-model="userInfo.phone" type="tel" required />
              </div>
              <div class="form-group">
                <label>身份证号</label>
                <input v-model="userInfo.idCard" type="text" required />
              </div>
              <div class="form-group">
                <label>邮箱</label>
                <input v-model="userInfo.email" type="email" />
              </div>
            </div>

            <div class="step-actions">
              <button @click="prevStep" class="prev-btn">上一步</button>
              <button @click="nextStep" class="next-btn">确认订单</button>
            </div>
          </div>

          <!-- 步骤3：支付订单 -->
          <div v-if="currentStep === 3" class="step-content">
            <h3>支付订单</h3>
            <div class="payment-summary">
              <div class="summary-card">
                <h4>订单详情</h4>
                <div class="order-details">
                  <div class="detail-row">
                    <span>{{ selectedEvent.title }}</span>
                    <span>¥{{ totalPrice }}</span>
                  </div>
                  <div class="detail-row">
                    <span>服务费</span>
                    <span>¥{{ serviceFee }}</span>
                  </div>
                  <div class="detail-row total">
                    <span>应付金额</span>
                    <span>¥{{ finalPrice }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="payment-methods">
              <h4>选择支付方式</h4>
              <div class="payment-options">
                <div
                  v-for="method in paymentMethods"
                  :key="method.id"
                  class="payment-option"
                  :class="{ selected: selectedPayment === method.id }"
                  @click="selectedPayment = method.id"
                >
                  <div class="payment-icon">{{ method.icon }}</div>
                  <div class="payment-info">
                    <h5>{{ method.name }}</h5>
                    <p>{{ method.description }}</p>
                  </div>
                  <div class="payment-discount" v-if="method.discount">
                    {{ method.discount }}
                  </div>
                </div>
              </div>
            </div>

            <div class="evs-benefits" v-if="userEVSScore >= 600">
              <h4>EVS分专享优惠</h4>
              <div class="benefits-list">
                <div class="benefit-item">
                  <span class="benefit-icon">💎</span>
                  <span>EVS分{{ userEVSScore }}，享受VIP购票通道</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">🎁</span>
                  <span>购票满500元送专属周边礼品</span>
                </div>
                <div class="benefit-item">
                  <span class="benefit-icon">⚡</span>
                  <span>优先选座权，抢占最佳位置</span>
                </div>
              </div>
            </div>

            <div class="step-actions">
              <button @click="prevStep" class="prev-btn">上一步</button>
              <button @click="submitOrder" class="pay-btn">立即支付 ¥{{ finalPrice }}</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 服务保障 -->
      <section class="guarantee-section">
        <h2>服务保障</h2>
        <div class="guarantee-grid">
          <div class="guarantee-item">
            <div class="guarantee-icon">🛡️</div>
            <h4>正品保障</h4>
            <p>官方授权，假一赔十</p>
          </div>
          <div class="guarantee-item">
            <div class="guarantee-icon">⚡</div>
            <h4>极速出票</h4>
            <p>支付成功后5分钟内出票</p>
          </div>
          <div class="guarantee-item">
            <div class="guarantee-icon">🔄</div>
            <h4>无忧退换</h4>
            <p>演出取消全额退款</p>
          </div>
          <div class="guarantee-item">
            <div class="guarantee-icon">📞</div>
            <h4>24小时客服</h4>
            <p>专业客服随时为您服务</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <h3>情绪e站</h3>
        <p>&copy; 2024 情绪e站 - 中国工商银行创新金融服务平台</p>
        <p>让每一份热爱都有价值</p>
      </div>
    </footer>

    <!-- 支付成功弹窗 -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
      <div class="modal-content" @click.stop>
        <div class="success-icon">🎉</div>
        <h3>购票成功！</h3>
        <p>您的订单已提交，电子票将发送至您的手机和邮箱</p>
        <div class="order-info">
          <p><strong>订单号：</strong>{{ orderNumber }}</p>
          <p><strong>演出：</strong>{{ selectedEvent?.title }}</p>
          <p><strong>数量：</strong>{{ quantity }}张</p>
        </div>
        <button @click="closeSuccessModal" class="modal-btn">确定</button>
      </div>
    </div>

    <!-- 情绪e地标预约对话框 -->
    <div v-if="showEmotionLandmarkModal" class="modal-overlay" @click="showEmotionLandmarkModal = false">
      <div class="modal-content" @click.stop>
        <div class="success-icon">🏦</div>
        <h3>恭喜您！</h3>
        <p>检测到您将于{{ selectedEvent?.date }}前往{{ selectedEvent?.venue }}参加{{ selectedEvent?.title }}的演出！</p>
        <p>该附近的银行网点已升级为本次活动的<strong>情绪e地标</strong>。</p>
        <p>是否立即预约？</p>
        <div class="order-info">
          <p><strong>演出时间：</strong>{{ selectedEvent?.date }}</p>
          <p><strong>演出地点：</strong>{{ selectedEvent?.venue }}</p>
          <p><strong>演出名称：</strong>{{ selectedEvent?.title }}</p>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button @click="goToEmotionLandmark" class="modal-btn">立即预约</button>
          <button @click="showEmotionLandmarkModal = false" class="modal-btn" style="background: #6b7280;">稍后再说</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 响应式数据
const searchQuery = ref('')
const activeCategory = ref('all')
const selectedEvent = ref(null)
const selectedTicket = ref(null)
const selectedPayment = ref('alipay')
const quantity = ref(1)
const currentStep = ref(1)
const showSuccessModal = ref(false)
const showEmotionLandmarkModal = ref(false)
const orderNumber = ref('')
const userEVSScore = ref(785)

// 用户信息表单
const userInfo = reactive({
  name: '',
  phone: '',
  idCard: '',
  email: '',
})

// 分类数据
const categories = [
  { id: 'all', name: '全部' },
  { id: 'concert', name: '演唱会' },
  { id: 'musical', name: '漫展' },
  { id: 'sports', name: '体育赛事' },
  { id: 'drama', name: '话剧' },
  { id: 'festival', name: '音乐节' },
]

// 活动数据
const events = ref([
  {
    id: 1,
    title: '周杰伦2024世界巡回演唱会',
    artist: '周杰伦',
    date: '2024-06-15',
    venue: '北京工人体育场',
    category: 'concert',
    image:
      'https://media.stubhubstatic.com/stubhub-v2-catalog/d_vgg-defaultLogo.jpg/q_auto:low,f_auto,c_fill,g_auto,w_1200,h_736,dpr_auto/categories/32000/6437799',
    priceFrom: 380,
    originalPrice: 480,
    discount: 8,
    isHot: true,
    tags: ['流行', '经典', '怀旧'],
    tickets: [
      {
        id: 1,
        name: 'VIP座位',
        description: '最佳视野，专属通道',
        price: 1280,
        stock: 50,
        benefits: ['专属入场通道', '演出纪念品', '优先停车'],
      },
      {
        id: 2,
        name: '内场座位',
        description: '距离舞台最近',
        price: 880,
        stock: 200,
        benefits: ['绝佳视野', '高品质音响'],
      },
      {
        id: 3,
        name: '看台座位',
        description: '性价比之选',
        price: 380,
        stock: 500,
        benefits: ['全场视野', '舒适座椅'],
      },
    ],
  },
  {
    id: 2,
    title: '《原神》主题漫展',
    artist: '谜香芳华',
    date: '2025-11-08',
    venue: '北京超级光合运动空间',
    category: 'musical',
    image:
      'https://imagecdn3.allcpp.cn/upload/2025/8/06763aaf-0629-4fe3-8418-9293d04eca03.jpg?x-oss-process=style/all_lfit_900',
    priceFrom: 280,
    isHot: false,
    tags: ['漫展', '二次元', '互动'],
    tickets: [
      {
        id: 1,
        name: 'VIP座位',
        description: '最佳观演体验',
        price: 880,
        stock: 30,
        benefits: ['最佳视角', '演出手册', '中场休息茶点'],
      },
      {
        id: 2,
        name: '一等座',
        description: '优质观演位置',
        price: 580,
        stock: 100,
        benefits: ['优质视角', '舒适座椅'],
      },
      {
        id: 3,
        name: '二等座',
        description: '经济实惠选择',
        price: 280,
        stock: 200,
        benefits: ['完整观演体验'],
      },
    ],
  },
  {
    id: 3,
    title: 'NBA中国赛2024',
    artist: '湖人 vs 勇士',
    date: '2024-08-10',
    venue: '深圳湾体育中心',
    category: 'sports',
    image:
      'https://img1.baidu.com/it/u=2589610321,2334683696&fm=253&fmt=auto&app=138&f=JPEG?w=1013&h=500',
    priceFrom: 580,
    originalPrice: 680,
    discount: 8.5,
    isHot: true,
    tags: ['篮球', 'NBA', '明星'],
    tickets: [
      {
        id: 1,
        name: '场边座位',
        description: '零距离观赛体验',
        price: 2880,
        stock: 20,
        benefits: ['场边体验', '球员签名机会', '专属礼品'],
      },
      {
        id: 2,
        name: '下层座位',
        description: '绝佳观赛视角',
        price: 1280,
        stock: 150,
        benefits: ['清晰视野', '舒适座椅'],
      },
      {
        id: 3,
        name: '上层座位',
        description: '全场视野',
        price: 580,
        stock: 300,
        benefits: ['全场视野', '性价比高'],
      },
    ],
  },
])

// 支付方式
const paymentMethods = [
  {
    id: 'alipay',
    name: '支付宝',
    icon: '💙',
    description: '快速安全，支持花呗分期',
    discount: '立减5元',
  },
  {
    id: 'wechat',
    name: '微信支付',
    icon: '💚',
    description: '便捷支付，微信零钱支付',
    discount: '',
  },
  {
    id: 'icbc',
    name: '工商银行',
    icon: '🏦',
    description: '工行卡支付享专属优惠',
    discount: '9.5折',
  },
  {
    id: 'credit',
    name: '情绪白条',
    icon: '💳',
    description: '基于EVS分的信用支付',
    discount: '免息分期',
  },
]

// 计算属性
const filteredEvents = computed(() => {
  let filtered = events.value

  if (activeCategory.value !== 'all') {
    filtered = filtered.filter((event) => event.category === activeCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.artist.toLowerCase().includes(query) ||
        event.venue.toLowerCase().includes(query),
    )
  }

  return filtered
})

const totalPrice = computed(() => {
  return selectedTicket.value ? selectedTicket.value.price * quantity.value : 0
})

const serviceFee = computed(() => {
  return Math.round(totalPrice.value * 0.05)
})

const finalPrice = computed(() => {
  let price = totalPrice.value + serviceFee.value

  // 应用支付方式优惠
  if (selectedPayment.value === 'alipay') {
    price -= 5
  } else if (selectedPayment.value === 'icbc') {
    price = Math.round(price * 0.95)
  }

  return Math.max(price, 0)
})

// 方法
const searchEvents = () => {
  // 搜索逻辑已在计算属性中实现
  console.log('搜索:', searchQuery.value)
}

const filterByCategory = (categoryId) => {
  activeCategory.value = categoryId
}

const selectEvent = (event) => {
  selectedEvent.value = event
  selectedTicket.value = null
  quantity.value = 1
  currentStep.value = 1

  // 滚动到购票区域
  setTimeout(() => {
    document.querySelector('.booking-section').scrollIntoView({
      behavior: 'smooth',
    })
  }, 100)
}

const selectTicket = (ticket) => {
  selectedTicket.value = ticket
}

const increaseQuantity = () => {
  if (quantity.value < 4) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitOrder = () => {
  // 生成订单号
  orderNumber.value = 'TK' + Date.now()

  // 显示成功弹窗
  showSuccessModal.value = true

  // 1秒后显示情绪e地标预约对话框
  setTimeout(() => {
    showSuccessModal.value = false
    showEmotionLandmarkModal.value = true
  }, 1000)

  // 不重置状态，保持在购票页面
}

const goToEmotionLandmark = () => {
  showEmotionLandmarkModal.value = false
  
  // 跳转到情绪e地标页面，传递相关信息
  const eventInfo = {
    userName: userInfo.name || '王先生',
    eventDate: selectedEvent.value?.date || '12月25日',
    venue: selectedEvent.value?.venue || '上海梅赛德斯奔驰文化中心',
    artist: selectedEvent.value?.artist || selectedEvent.value?.title?.split(' ')[0] || '周杰伦',
    eventType: selectedEvent.value?.category === 'concert' ? '演唱会' : 
               selectedEvent.value?.category === 'sports' ? '体育赛事' : 
               selectedEvent.value?.category === 'drama' ? '话剧' : '演出',
    evsScore: userEVSScore.value
  }
  
  router.push({
    name: 'emotion-landmark',
    query: eventInfo
  })
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}
</script>

<style scoped>
.ticket-service {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 32px;
  height: 32px;
}

.brand-text h1 {
  color: #2563eb;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.brand-text .subtitle {
  color: #64748b;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.nav-link:hover {
  color: #2563eb;
  background: #f1f5f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  text-align: center;
}

.hero-section h1 {
  font-size: 3rem;
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 800;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.feature-icon {
  font-size: 2rem;
}

.feature-item span {
  color: #64748b;
  font-weight: 500;
}

.search-section {
  padding: 3rem 0;
  background: white;
}

.search-container {
  text-align: center;
}

.search-container h2 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 2rem;
  font-weight: 700;
}

.search-form {
  max-width: 800px;
  margin: 0 auto;
}

.search-input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.filter-tab:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.filter-tab.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.recommended-section {
  padding: 4rem 0;
  background: #f8fafc;
}

.recommended-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.event-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #e2e8f0;
  position: relative;
}

.event-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #64748b, #475569);
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(100, 116, 139, 0.15);
  border-color: #64748b;
}

.event-image {
  position: relative;
  height: 200px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 1.1rem;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #ef4444;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.event-discount {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #10b981;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.event-info {
  padding: 1.5rem;
}

.event-info h3 {
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 1.2rem;
}

.event-artist {
  color: #64748b;
  margin-bottom: 1rem;
  font-weight: 500;
}

.event-details {
  margin-bottom: 1rem;
}

.event-date,
.event-venue {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.event-price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.price-from {
  color: #64748b;
  font-size: 0.9rem;
}

.price-amount {
  color: #ef4444;
  font-size: 1.5rem;
  font-weight: 700;
}

.price-original {
  color: #94a3b8;
  text-decoration: line-through;
  font-size: 1rem;
}

.event-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.booking-section {
  padding: 4rem 0;
  background: white;
}

.booking-container {
  max-width: 800px;
  margin: 0 auto;
}

.booking-header {
  text-align: center;
  margin-bottom: 3rem;
}

.booking-header h2 {
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.booking-header p {
  color: #64748b;
  font-size: 1.1rem;
}

.booking-steps {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  position: relative;
}

.booking-steps::before {
  content: '';
  position: absolute;
  top: 1.5rem;
  left: 25%;
  right: 25%;
  height: 2px;
  background: #e2e8f0;
  z-index: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
  background: white;
  padding: 0 1rem;
}

.step-number {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: #e2e8f0;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.3s;
}

.step.active .step-number {
  background: #2563eb;
  color: white;
}

.step.completed .step-number {
  background: #10b981;
  color: white;
}

.step-title {
  color: #64748b;
  font-weight: 500;
  font-size: 0.9rem;
}

.step.active .step-title {
  color: #2563eb;
  font-weight: 600;
}

.step-content {
  background: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #e2e8f0;
}

.step-content h3 {
  color: #1e293b;
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 1.5rem;
}

.ticket-types {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.ticket-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.ticket-type:hover {
  border-color: #cbd5e1;
}

.ticket-type.selected {
  border-color: #2563eb;
  background: #eff6ff;
}

.ticket-info h4 {
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.ticket-info p {
  color: #64748b;
  margin-bottom: 1rem;
}

.ticket-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.benefit {
  background: #dcfce7;
  color: #166534;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.ticket-price {
  text-align: right;
}

.ticket-price .price {
  color: #ef4444;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.ticket-price .stock {
  color: #64748b;
  font-size: 0.9rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-controls button {
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.quantity-controls button:hover:not(:disabled) {
  background: #f3f4f6;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity {
  font-weight: 600;
  min-width: 2rem;
  text-align: center;
}

.quantity-limit {
  color: #64748b;
  font-size: 0.9rem;
}

.order-summary {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f5f9;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item.total {
  font-weight: 600;
  font-size: 1.1rem;
  color: #1e293b;
  border-top: 2px solid #e2e8f0;
  margin-top: 0.5rem;
  padding-top: 1rem;
}

.user-info-form {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
}

.user-info-form h4 {
  color: #1e293b;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.payment-summary {
  margin-bottom: 2rem;
}

.summary-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.summary-card h4 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.detail-row.total {
  border-top: 2px solid #e2e8f0;
  margin-top: 0.5rem;
  padding-top: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: #1e293b;
}

.payment-methods {
  margin-bottom: 2rem;
}

.payment-methods h4 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.payment-option:hover {
  border-color: #cbd5e1;
}

.payment-option.selected {
  border-color: #2563eb;
  background: #eff6ff;
}

.payment-icon {
  font-size: 1.5rem;
}

.payment-info {
  flex: 1;
}

.payment-info h5 {
  color: #1e293b;
  margin-bottom: 0.3rem;
  font-weight: 600;
}

.payment-info p {
  color: #64748b;
  font-size: 0.9rem;
}

.payment-discount {
  background: #fef3c7;
  color: #92400e;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.evs-benefits {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #bfdbfe;
}

.evs-benefits h4 {
  color: #1e40af;
  margin-bottom: 1rem;
  font-weight: 600;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #1e40af;
  font-weight: 500;
}

.benefit-icon {
  font-size: 1.2rem;
}

.step-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.next-btn,
.prev-btn,
.pay-btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  font-size: 1rem;
}

.next-btn,
.pay-btn {
  background: #2563eb;
  color: white;
}

.next-btn:hover,
.pay-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.next-btn:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  transform: none;
}

.prev-btn {
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.prev-btn:hover {
  background: #f1f5f9;
}

.pay-btn {
  background: #10b981;
  font-size: 1.1rem;
  padding: 1.2rem 2.5rem;
}

.pay-btn:hover {
  background: #059669;
}

.guarantee-section {
  padding: 4rem 0;
  background: #f8fafc;
}

.guarantee-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 3rem;
  font-weight: 700;
}

.guarantee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.guarantee-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s;
}

.guarantee-item:hover {
  transform: translateY(-4px);
}

.guarantee-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.guarantee-item h4 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.guarantee-item p {
  color: #64748b;
  line-height: 1.6;
}

.footer {
  background: #1e293b;
  color: white;
  text-align: center;
  padding: 3rem 2rem;
}

.footer h3 {
  margin-bottom: 1rem;
  color: #f1f5f9;
}

.footer p {
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 12px 32px rgba(30, 64, 175, 0.15);
  border: 1px solid rgba(30, 64, 175, 0.1);
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.modal-content h3 {
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 600;
}

.modal-content p {
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.order-info {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
  border: 1px solid rgba(30, 64, 175, 0.1);
}

.order-info p {
  margin-bottom: 0.5rem;
  color: #1e293b;
  font-weight: 500;
}

.modal-btn {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.modal-btn:hover {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .hero-section h1 {
    font-size: 2.5rem;
  }

  .hero-features {
    flex-wrap: wrap;
    gap: 2rem;
  }

  .search-input-group {
    flex-direction: column;
  }

  .filter-tabs {
    gap: 0.5rem;
  }

  .events-grid {
    grid-template-columns: 1fr;
  }

  .booking-steps {
    flex-direction: column;
    gap: 1rem;
  }

  .booking-steps::before {
    display: none;
  }

  .ticket-type {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .payment-options {
    gap: 0.5rem;
  }

  .step-actions {
    flex-direction: column;
  }

  .guarantee-grid {
    grid-template-columns: 1fr;
  }
}
</style>
