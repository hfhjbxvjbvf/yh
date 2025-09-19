<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #1e293b;
  line-height: 1.6;
  font-weight: 400;
}

#app {
  min-height: 100vh;
}

/* 中商银行专业配色 */
:root {
  --primary-blue: #1e40af;
  --secondary-blue: #3b82f6;
  --accent-blue: #60a5fa;
  --dark-blue: #1e3a8a;
  --light-blue: #dbeafe;
  --silver: #e2e8f0;
  --light-silver: #f1f5f9;
  --dark-gray: #1e293b;
  --medium-gray: #64748b;
  --light-gray: #94a3b8;
  --white: #ffffff;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --gradient-primary: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  --gradient-secondary: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
  --gradient-card: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  --shadow-light: 0 2px 8px rgba(30, 64, 175, 0.08);
  --shadow-medium: 0 4px 16px rgba(30, 64, 175, 0.12);
  --shadow-heavy: 0 8px 32px rgba(30, 64, 175, 0.16);
  --border-radius: 12px;
  --border-radius-large: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 专业字体层级 */
.text-h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.text-h2 {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.text-h3 {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.4;
}

.text-h4 {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4;
}

.text-body-large {
  font-size: 1.125rem;
  line-height: 1.6;
}

.text-body {
  font-size: 1rem;
  line-height: 1.6;
}

.text-body-small {
  font-size: 0.875rem;
  line-height: 1.5;
}

.text-caption {
  font-size: 0.75rem;
  line-height: 1.4;
  letter-spacing: 0.025em;
}

/* 专业按钮样式 */
.btn-primary {
  background: var(--gradient-primary);
  color: var(--white);
  border: none;
  padding: 0.875rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-light);
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-secondary {
  background: var(--white);
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
  padding: 0.875rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-light);
}

.btn-secondary:hover {
  background: var(--primary-blue);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

/* 专业卡片样式 */
.card {
  background: var(--gradient-card);
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  border: 1px solid var(--silver);
  transition: var(--transition);
  overflow: hidden;
}

.card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-4px);
}

/* 专业输入框样式 */
.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--silver);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  background: var(--white);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.form-input::placeholder {
  color: var(--light-gray);
}

/* 专业导航样式 */
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--silver);
  box-shadow: var(--shadow-light);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-link {
  color: var(--dark-gray);
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  position: relative;
}

.nav-link:hover {
  color: var(--primary-blue);
  background: var(--light-blue);
}

.nav-link.router-link-active {
  color: var(--primary-blue);
  background: var(--light-blue);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: var(--primary-blue);
  border-radius: 1px;
}

/* 响应式容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* 专业渐变背景 */
.gradient-bg-primary {
  background: var(--gradient-primary);
}

.gradient-bg-secondary {
  background: var(--gradient-secondary);
}

/* 专业文字颜色 */
.text-primary {
  color: var(--primary-blue);
}

.text-secondary {
  color: var(--medium-gray);
}

.text-accent {
  color: var(--accent-blue);
}

/* 专业阴影 */
.shadow-light { box-shadow: var(--shadow-light); }
.shadow-medium { box-shadow: var(--shadow-medium); }
.shadow-heavy { box-shadow: var(--shadow-heavy); }

/* 专业圆角 */
.rounded { border-radius: var(--border-radius); }
.rounded-large { border-radius: var(--border-radius-large); }

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

.animate-slideInRight {
  animation: slideInRight 0.6s ease-out;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .text-h1 { font-size: 2.25rem; }
  .text-h2 { font-size: 1.875rem; }
  .text-h3 { font-size: 1.5rem; }
  .text-h4 { font-size: 1.25rem; }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
