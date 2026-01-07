// Markdown Viewer Mermaid Plus - 增强版
// 不依赖原插件的 Panzoom，自己实现缩放和平移功能

(function() {
  'use strict';

  console.log('[Mermaid Plus] 插件已加载');

  // 配置
  const CONFIG = {
    zoomSensitivity: 0.001,
    minScale: 0.1,
    maxScale: 10,
    normalMode: {
      requireShift: true  // 普通模式需要 Shift
    },
    fullscreenMode: {
      requireShift: false  // 全屏模式不需要 Shift
    }
  };

  // 存储每个图表的状态
  const diagramStates = new WeakMap();

  // 初始化
  function init() {
    console.log('[Mermaid Plus] 开始初始化');

    // 先处理已存在的图表
    processExistingDiagrams();

    // 监听 DOM 变化
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          processExistingDiagrams();
          break;
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('[Mermaid Plus] 初始化完成');
  }

  // 处理现有的 Mermaid 图表
  function processExistingDiagrams() {
    // 查找所有 code.mermaid 元素
    const mermaidCodes = document.querySelectorAll('code.mermaid');

    mermaidCodes.forEach((code) => {
      const svg = code.querySelector('svg');
      const pre = code.parentElement;

      // 跳过已处理的或没有 SVG 的
      if (!pre || !svg || pre.hasAttribute('data-mermaid-plus')) {
        return;
      }

      console.log('[Mermaid Plus] 发现新的 Mermaid 图表');

      // 标记为已处理
      pre.setAttribute('data-mermaid-plus', 'true');

      // 初始化图表状态
      const state = {
        pre: pre,
        svg: svg,
        scale: 1,
        translateX: 0,
        translateY: 0,
        isDragging: false,
        lastMouseX: 0,
        lastMouseY: 0,
        isFullscreen: false
      };

      diagramStates.set(pre, state);

      // 添加控制按钮
      addControlButtons(pre, state);

      // 绑定事件
      bindEvents(pre, svg, state);
    });
  }

  // 添加控制按钮
  function addControlButtons(pre, state) {
    console.log('[Mermaid Plus] 添加按钮到 pre 元素');

    // 创建全屏按钮
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.className = 'mermaid-plus-fullscreen-btn';
    fullscreenBtn.innerHTML = '⛶';
    fullscreenBtn.title = '全屏查看 (双击也可全屏)';

    // 创建关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mermaid-plus-close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.title = '关闭全屏';
    closeBtn.style.display = 'none';

    console.log('[Mermaid Plus] 创建的按钮元素');

    // 直接添加到 pre 元素（不使用容器，避免定位问题）
    pre.style.position = 'relative';
    pre.appendChild(fullscreenBtn);
    pre.appendChild(closeBtn);

    console.log('[Mermaid Plus] 按钮已添加到 pre');

    state.fullscreenBtn = fullscreenBtn;
    state.closeBtn = closeBtn;
  }

  // 显示 Shift 提示
  let shiftHintTimeout = null;
  function showShiftHint(pre) {
    // 如果已经显示，重置计时器
    const existingHint = pre.querySelector('.mermaid-plus-shift-hint');
    if (existingHint) {
      clearTimeout(shiftHintTimeout);
      shiftHintTimeout = setTimeout(() => {
        existingHint.remove();
      }, 3000);
      return;
    }

    // 创建提示元素
    const hint = document.createElement('div');
    hint.className = 'mermaid-plus-shift-hint';
    hint.innerHTML = '🔍 按住 Shift 缩放';
    pre.appendChild(hint);

    // 3秒后移除
    shiftHintTimeout = setTimeout(() => {
      hint.remove();
    }, 3000);
  }

  // 绑定事件
  function bindEvents(pre, svg, state) {
    // 鼠标滚轮缩放
    pre.addEventListener('wheel', (e) => {
      const requireShift = state.isFullscreen
        ? CONFIG.fullscreenMode.requireShift
        : CONFIG.normalMode.requireShift;

      // 全屏模式：没有按 Shift 时显示提示
      if (state.isFullscreen && !e.shiftKey) {
        showShiftHint(state.pre);
        return;
      }

      // 普通模式或按了 Shift，让原插件处理
      if (requireShift && !e.shiftKey) {
        return; // 不处理，让原插件处理
      }

      e.preventDefault();
      e.stopPropagation();

      // 计算缩放
      const delta = e.deltaY * CONFIG.zoomSensitivity;
      const newScale = Math.min(CONFIG.maxScale, Math.max(CONFIG.minScale, state.scale - delta));

      state.scale = newScale;
      updateTransform(state);
    }, { passive: false });

    // 鼠标拖拽平移
    svg.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // 只响应左键

      state.isDragging = true;
      state.lastMouseX = e.clientX;
      state.lastMouseY = e.clientY;
      svg.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!state.isDragging) return;

      const dx = e.clientX - state.lastMouseX;
      const dy = e.clientY - state.lastMouseY;

      state.translateX += dx;
      state.translateY += dy;
      state.lastMouseX = e.clientX;
      state.lastMouseY = e.clientY;

      updateTransform(state);
    });

    document.addEventListener('mouseup', () => {
      if (state.isDragging) {
        state.isDragging = false;
        svg.style.cursor = 'grab';
      }
    });

    // 全屏按钮
    const fullscreenBtn = state.fullscreenBtn;
    const closeBtn = state.closeBtn;

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('[Mermaid Plus] 按钮被点击');
        toggleFullscreen(state);
      });
      console.log('[Mermaid Plus] 全屏按钮事件已绑定');
    } else {
      console.error('[Mermaid Plus] 找不到全屏按钮！');
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('[Mermaid Plus] 关闭按钮被点击');
        toggleFullscreen(state);
      });
      console.log('[Mermaid Plus] 关闭按钮事件已绑定');
    }

    // 双击全屏
    pre.addEventListener('dblclick', () => {
      toggleFullscreen(state);
    });

    // ESC 退出全屏
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.isFullscreen) {
        toggleFullscreen(state);
      }
    });
  }

  // 更新 SVG 变换
  function updateTransform(state) {
    state.svg.style.transform = `translate(${state.translateX}px, ${state.translateY}px) scale(${state.scale})`;
    state.svg.style.transformOrigin = 'center center';
  }

  // 切换全屏
  function toggleFullscreen(state) {
    state.isFullscreen = !state.isFullscreen;

    if (state.isFullscreen) {
      console.log('[Mermaid Plus] 进入全屏');
      state.pre.classList.add('mermaid-plus-fullscreen');

      // 显示关闭按钮，隐藏全屏按钮
      if (state.fullscreenBtn) state.fullscreenBtn.style.display = 'none';
      if (state.closeBtn) state.closeBtn.style.display = 'block';
    } else {
      console.log('[Mermaid Plus] 退出全屏');
      state.pre.classList.remove('mermaid-plus-fullscreen');

      // 显示全屏按钮，隐藏关闭按钮
      if (state.fullscreenBtn) state.fullscreenBtn.style.display = '';
      if (state.closeBtn) state.closeBtn.style.display = 'none';

      // 重置变换
      state.scale = 1;
      state.translateX = 0;
      state.translateY = 0;
      updateTransform(state);
    }
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
