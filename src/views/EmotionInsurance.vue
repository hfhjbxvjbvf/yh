<template>
  <div class="emotion-insurance">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-brand">
          <img src="/logo.svg" alt="Logo" class="brand-logo" />
          <div class="brand-text">
            <h1>情绪e站</h1>
            <span class="subtitle">Emotion Station</span>
          </div>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/evs-score" class="nav-link">EVS分测评</router-link>
          <router-link to="/financial-services" class="nav-link">智能理财</router-link>
          <router-link to="/ticket-service" class="nav-link">购票服务</router-link>
          <router-link to="/emotion-landmark" class="nav-link">情绪地标</router-link>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <div class="main-content">
      <div class="container">
        <!-- 页面标题 -->
        <div class="page-header">
          <h1>情绪保障e保险</h1>
          <p>为您的情感体验提供全方位保障</p>
        </div>

        <!-- 保险产品列表 -->
        <div class="insurance-grid">
          <!-- 心爱之物守护险 -->
          <div class="insurance-card" @click="openInsuranceForm('beloved-items')">
            <div class="card-header">
              <div class="card-icon beloved-icon">💎</div>
              <h3>心爱之物守护险</h3>
            </div>
            <div class="card-content">
              <p class="card-subtitle">针对限定签名物品、二次元周边、手办等高价值衍生品，设计实体与虚拟双重保障</p>
              <div class="features">
                <div class="feature-item">
                  <span class="feature-icon">🛡️</span>
                  <span>演唱会周边保障</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📸</span>
                  <span>签名照保护</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎭</span>
                  <span>二次元手办保险</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎁</span>
                  <span>潮玩盲盒保障</span>
                </div>
              </div>
              <p class="coverage-desc">为用户收藏的演唱会周边、签名照、二次元手办、潮玩盲盒等高价值实体物品，提供因意外事故（如火灾、浸水、意外破损）导致的损失保障。</p>
            </div>
            <div class="card-footer">
              <button class="apply-btn">立即申请</button>
            </div>
          </div>

          <!-- 观演无忧行程险 -->
          <div class="insurance-card" @click="openInsuranceForm('travel-protection')">
            <div class="card-header">
              <div class="card-icon travel-icon">✈️</div>
              <h3>观演无忧行程险</h3>
            </div>
            <div class="card-content">
              <p class="card-subtitle">针对跨城观演、看展的用户，解决因意外情况导致的"人到了，活动没了"或"活动还在，人去不了"的财务损失</p>
              <div class="features">
                <div class="feature-item">
                  <span class="feature-icon">🎪</span>
                  <span>活动取消/延期保障</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🏥</span>
                  <span>个人意外保障</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎫</span>
                  <span>门票损失赔付</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🏨</span>
                  <span>差旅费用保障</span>
                </div>
              </div>
              <p class="coverage-desc">因恶劣天气、艺人健康、场馆问题等不可抗力导致演出或展览取消、延期，保险可赔付已支出的、不可退改的机票/火车票、酒店住宿等差旅费用。可以精准解决官方仅退门票，但附加损失无人承担的痛点。</p>
            </div>
            <div class="card-footer">
              <button class="apply-btn">立即申请</button>
            </div>
          </div>

          <!-- 现场狂欢守护险 -->
          <div class="insurance-card" @click="openInsuranceForm('venue-protection')">
            <div class="card-header">
              <div class="card-icon venue-icon">🎉</div>
              <h3>现场狂欢守护险</h3>
            </div>
            <div class="card-content">
              <p class="card-subtitle">将传统人身意外险进行场景化改造，更贴近现场实际需求</p>
              <div class="features">
                <div class="feature-item">
                  <span class="feature-icon">🚑</span>
                  <span>人身意外伤害保障</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📱</span>
                  <span>个人财物损失保障</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">👀</span>
                  <span>"视线被遮挡"体验补偿</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎵</span>
                  <span>现场体验保障</span>
                </div>
              </div>
              <p class="coverage-desc">覆盖用户在往返场馆途中及活动现场，因拥挤、踩踏、意外坠物等造成的人身意外伤害医疗费用。针对用户吐槽最多的"柱子票"、"栏杆票"等视线严重遮挡问题，用户若能提供现场照片或者视频证据，证明其座位视线确实受到严重、非正常遮挡，保险可提供一定比例的门票费用作为"体验补偿金"。</p>
            </div>
            <div class="card-footer">
              <button class="apply-btn">立即申请</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 保险申请表单弹窗 -->
    <div v-if="showForm" class="modal-overlay" @click="closeForm">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ currentInsurance.title }} - 申请表单</h3>
          <button @click="closeForm" class="close-btn">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitApplication">
            <div class="form-group">
              <label>姓名 *</label>
              <input v-model="formData.name" type="text" required placeholder="请输入您的姓名" />
            </div>
            <div class="form-group">
              <label>手机号码 *</label>
              <input v-model="formData.phone" type="tel" required placeholder="请输入手机号码" />
            </div>
            <div class="form-group">
              <label>身份证号 *</label>
              <input v-model="formData.idCard" type="text" required placeholder="请输入身份证号" />
            </div>
            <div class="form-group">
              <label>邮箱地址</label>
              <input v-model="formData.email" type="email" placeholder="请输入邮箱地址" />
            </div>
            <div class="form-group">
              <label>保险金额 *</label>
              <select v-model="formData.amount" required>
                <option value="">请选择保险金额</option>
                <option value="1000">1,000元</option>
                <option value="5000">5,000元</option>
                <option value="10000">10,000元</option>
                <option value="20000">20,000元</option>
                <option value="50000">50,000元</option>
              </select>
            </div>
            <div class="form-group" v-if="currentInsurance.type === 'beloved-items'">
              <label>保障物品类型 *</label>
              <div class="checkbox-group">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="formData.itemTypes" value="concert-merchandise" />
                  <span>演唱会周边</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="formData.itemTypes" value="signed-photos" />
                  <span>签名照</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="formData.itemTypes" value="anime-figures" />
                  <span>二次元手办</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="formData.itemTypes" value="blind-boxes" />
                  <span>潮玩盲盒</span>
                </label>
              </div>
            </div>
            <div class="form-group" v-if="currentInsurance.type === 'travel-protection'">
              <label>活动信息 *</label>
              <input v-model="formData.eventInfo" type="text" required placeholder="请输入活动名称和时间" />
            </div>
            <div class="form-group" v-if="currentInsurance.type === 'venue-protection'">
              <label>座位信息</label>
              <input v-model="formData.seatInfo" type="text" placeholder="请输入座位区域和排号" />
            </div>
            <div class="form-group">
              <label>备注信息</label>
              <textarea v-model="formData.remarks" rows="3" placeholder="请输入其他需要说明的信息"></textarea>
            </div>
            <div class="form-actions">
              <button type="button" @click="closeForm" class="btn-cancel">取消</button>
              <button type="submit" class="btn-submit">提交申请</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 情绪e站 - 让每一份情感都有价值</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 表单显示状态
const showForm = ref(false)

// 当前选中的保险产品
const currentInsurance = ref({})

// 保险产品信息
const insuranceProducts = {
  'beloved-items': {
    title: '心爱之物守护险',
    type: 'beloved-items'
  },
  'travel-protection': {
    title: '观演无忧行程险',
    type: 'travel-protection'
  },
  'venue-protection': {
    title: '现场狂欢守护险',
    type: 'venue-protection'
  }
}

// 表单数据
const formData = reactive({
  name: '',
  phone: '',
  idCard: '',
  email: '',
  amount: '',
  itemTypes: [],
  eventInfo: '',
  seatInfo: '',
  remarks: ''
})

// 打开保险申请表单
const openInsuranceForm = (insuranceType) => {
  currentInsurance.value = insuranceProducts[insuranceType]
  showForm.value = true
  // 重置表单数据
  Object.keys(formData).forEach(key => {
    if (Array.isArray(formData[key])) {
      formData[key] = []
    } else {
      formData[key] = ''
    }
  })
}

// 关闭表单
const closeForm = () => {
  showForm.value = false
  currentInsurance.value = {}
}

// 提交申请
const submitApplication = () => {
  try {
    // 验证必填字段
    if (!formData.name || !formData.phone || !formData.idCard || !formData.amount) {
      alert('请填写所有必填字段')
      return
    }

    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      alert('请输入正确的手机号码')
      return
    }

    // 验证身份证号格式
    const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!idCardRegex.test(formData.idCard)) {
      alert('请输入正确的身份证号')
      return
    }

    // 模拟提交申请
    const applicationData = {
      insuranceType: currentInsurance.value.type,
      insuranceTitle: currentInsurance.value.title,
      ...formData,
      submitTime: new Date().toISOString()
    }

    // 保存到本地存储
    const applications = JSON.parse(localStorage.getItem('insuranceApplications') || '[]')
    applications.push(applicationData)
    localStorage.setItem('insuranceApplications', JSON.stringify(applications))

    alert('申请提交成功！我们将在3个工作日内联系您。')
    closeForm()
  } catch (error) {
    console.error('提交申请失败:', error)
    alert('提交失败，请重试')
  }
}
</script>

<style scoped>
.emotion-insurance {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
}

.navbar {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-logo {
  width: 40px;
  height: 40px;
}

.brand-text h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #1e40af;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.brand-text .subtitle {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3b82f6;
}

.nav-link.router-link-active {
  color: #3b82f6;
}

.main-content {
  padding: 3rem 0;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 800;
}

.page-header p {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0;
}

.insurance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.insurance-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.insurance-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
}

.insurance-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.beloved-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.travel-icon {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.venue-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1e293b;
  font-weight: 700;
}

.card-subtitle {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #374151;
}

.feature-icon {
  font-size: 1rem;
}

.coverage-desc {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-footer {
  text-align: center;
}

.apply-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.apply-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 弹窗样式 */
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
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.modal-body {
  padding: 2rem;
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

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.checkbox-item:hover {
  background: #f8fafc;
}

.checkbox-item input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-cancel {
  background: #f1f5f9;
  color: #64748b;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

.btn-submit {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.footer {
  background: #1e293b;
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer p {
  margin: 0;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .insurance-grid {
    grid-template-columns: 1fr;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .checkbox-group {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .modal-content {
    margin: 1rem;
    width: calc(100% - 2rem);
  }

  .nav-links {
    display: none;
  }
}
</style>