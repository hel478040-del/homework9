/* 校园美食中心 - 主应用脚本 */

// 兜底数据（file:// 协议或网络失败时使用）
var FALLBACK_DATA = {
  canteenInfo: {
    name: "校园美食中心",
    subtitle: "第一食堂 · 第二食堂 · 清真食堂",
    description: "汇聚南北风味，满足你的味蕾",
    openingHours: "06:30 - 21:00",
    floors: 3
  },
  stalls: [
    { id: 1, name: "川湘小炒", canteen: "第一食堂", floor: 1, category: "中餐", rating: 4.7, priceRange: "12-20元", avgPrice: 16, status: "open", signatureDish: "鱼香肉丝饭", description: "正宗川湘风味，麻辣鲜香，现炒现卖", tags: ["辣", "下饭", "人气高"] },
    { id: 2, name: "粤式烧腊", canteen: "第一食堂", floor: 1, category: "中餐", rating: 4.5, priceRange: "15-25元", avgPrice: 20, status: "open", signatureDish: "叉烧饭", description: "港式烧腊，皮脆肉嫩，蜜汁浓郁", tags: ["不辣", "港式", "推荐"] },
    { id: 3, name: "兰州拉面", canteen: "第一食堂", floor: 2, category: "面食", rating: 4.6, priceRange: "10-18元", avgPrice: 14, status: "open", signatureDish: "牛肉拉面", description: "手工现拉面条，汤鲜味美，牛肉软烂", tags: ["汤面", "清真", "暖胃"] },
    { id: 4, name: "麻辣香锅", canteen: "第一食堂", floor: 2, category: "中餐", rating: 4.8, priceRange: "18-35元", avgPrice: 26, status: "open", signatureDish: "荤素搭配香锅", description: "自选食材，麻辣鲜香，排队王", tags: ["辣", "自选", "人气高"] },
    { id: 5, name: "沙县小吃", canteen: "第二食堂", floor: 1, category: "小吃", rating: 4.3, priceRange: "8-15元", avgPrice: 11, status: "open", signatureDish: "蒸饺+馄饨", description: "经典沙县套餐，便宜实惠", tags: ["便宜", "小吃", "快速"] },
    { id: 6, name: "黄焖鸡米饭", canteen: "第二食堂", floor: 1, category: "中餐", rating: 4.4, priceRange: "14-22元", avgPrice: 18, status: "open", signatureDish: "黄焖鸡米饭", description: "鸡肉鲜嫩，汤汁浓郁，米饭管够", tags: ["下饭", "经典", "不辣"] },
    { id: 7, name: "韩式石锅拌饭", canteen: "第二食堂", floor: 2, category: "日韩料理", rating: 4.6, priceRange: "16-28元", avgPrice: 22, status: "open", signatureDish: "石锅牛肉拌饭", description: "正宗韩式风味，配温泉蛋和辣酱", tags: ["韩式", "石锅", "特色"] },
    { id: 8, name: "日式拉面", canteen: "第二食堂", floor: 2, category: "日韩料理", rating: 4.5, priceRange: "18-30元", avgPrice: 24, status: "closed", signatureDish: "豚骨拉面", description: "浓郁豚骨汤底，叉烧溏心蛋", tags: ["日式", "拉面", "人气"] },
    { id: 9, name: "清真窗口", canteen: "清真食堂", floor: 1, category: "清真", rating: 4.7, priceRange: "12-22元", avgPrice: 17, status: "open", signatureDish: "新疆大盘鸡", description: "清真食品，牛羊肉为主，风味独特", tags: ["清真", "牛羊肉", "特色"] },
    { id: 10, name: "奶茶甜品站", canteen: "第一食堂", floor: 1, category: "饮品甜点", rating: 4.9, priceRange: "6-18元", avgPrice: 12, status: "open", signatureDish: "珍珠奶茶", description: "现做奶茶冰沙，搭配甜品蛋糕", tags: ["饮品", "甜品", "人气高"] },
    { id: 11, name: "早餐专区", canteen: "第二食堂", floor: 1, category: "早餐", rating: 4.2, priceRange: "3-10元", avgPrice: 6, status: "closed", signatureDish: "豆浆油条包子", description: "营养早餐，现蒸现煮，6点半开餐", tags: ["早餐", "便宜", "营养"] },
    { id: 12, name: "水果捞", canteen: "清真食堂", floor: 1, category: "饮品甜点", rating: 4.8, priceRange: "8-20元", avgPrice: 14, status: "open", signatureDish: "什锦水果捞", description: "新鲜水果配酸奶，健康美味", tags: ["水果", "健康", "清爽"] }
  ],
  nutritionStats: {
    title: "各品类平均营养成分",
    unit: "每100g",
    source: "校园食堂营养检测",
    categories: ["中餐", "面食", "小吃", "日韩料理", "清真", "饮品甜点", "早餐"],
    calories: [280, 220, 310, 260, 290, 180, 150],
    protein: [18, 12, 10, 20, 22, 3, 8],
    fat: [15, 6, 18, 12, 16, 8, 5],
    carbs: [25, 35, 30, 28, 22, 25, 20]
  },
  popularStats: {
    title: "各食堂人气排行",
    unit: "日均人次",
    canteens: ["第一食堂", "第二食堂", "清真食堂"],
    visitors: [3200, 2800, 950]
  }
};

// 全局变量
var allStalls = [];
var nutritionData = null;
var popularData = null;
var currentCanteen = 'all';
var currentCategory = 'all';
var currentStatus = 'all';
var nutritionChart = null;
var popularChart = null;

// 页面加载完成后初始化
$(document).ready(function() {
  loadData();
  bindEvents();
});

// 加载数据
async function loadData() {
  try {
    var response = await fetch('data/data.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    var data = await response.json();
    initData(data);
    console.log('数据加载成功', data);
  } catch (err) {
    console.warn('数据加载失败，使用兜底数据:', err);
    initData(FALLBACK_DATA);
    showError('数据加载失败，已使用备用数据（可能因本地文件协议导致）。推荐使用本地服务器运行。');
  }
}

// 初始化数据
function initData(data) {
  allStalls = data.stalls;
  nutritionData = data.nutritionStats;
  popularData = data.popularStats;
  
  renderStalls(allStalls);
  renderNutritionChart();
  renderPopularChart();
}

// 绑定事件
function bindEvents() {
  // 搜索框
  $('#search-input').on('input', function() {
    filterStalls();
  });

  // 食堂筛选
  $('#canteen-filter').on('click', 'button', function() {
    $('#canteen-filter button').removeClass('active').addClass('btn-outline-food');
    $(this).addClass('active').removeClass('btn-outline-food');
    currentCanteen = $(this).data('canteen');
    filterStalls();
  });

  // 品类筛选
  $('#category-filter').on('click', 'button', function() {
    $('#category-filter button').removeClass('active');
    $(this).addClass('active');
    currentCategory = $(this).data('category');
    filterStalls();
  });

  // 状态筛选
  $('#status-filter').on('click', 'button', function() {
    $('#status-filter button').removeClass('active');
    $(this).addClass('active');
    currentStatus = $(this).data('status');
    filterStalls();
  });

  // 窗口大小变化时重绘图表
  $(window).on('resize', function() {
    if (nutritionChart) nutritionChart.resize();
    if (popularChart) popularChart.resize();
  });

  // 导航栏滚动高亮
  $(window).on('scroll', function() {
    var scrollPos = $(document).scrollTop() + 80;
    $('section[id]').each(function() {
      var section = $(this);
      if (section.position().top <= scrollPos && section.position().top + section.height() > scrollPos) {
        $('.navbar-nav .nav-link').removeClass('active');
        $('.navbar-nav .nav-link[href="#' + section.attr('id') + '"]').addClass('active');
      }
    });
  });
}

// 筛选档口
function filterStalls() {
  var keyword = $('#search-input').val().trim().toLowerCase();
  
  var filtered = allStalls.filter(function(stall) {
    // 食堂筛选
    if (currentCanteen !== 'all' && stall.canteen !== currentCanteen) {
      return false;
    }
    // 品类筛选
    if (currentCategory !== 'all' && stall.category !== currentCategory) {
      return false;
    }
    // 状态筛选
    if (currentStatus !== 'all' && stall.status !== currentStatus) {
      return false;
    }
    // 关键词搜索
    if (keyword) {
      var searchText = stall.name + stall.description + stall.signatureDish + stall.tags.join('');
      if (searchText.toLowerCase().indexOf(keyword) === -1) {
        return false;
      }
    }
    return true;
  });

  renderStalls(filtered);
}

// 渲染档口列表
function renderStalls(stalls) {
  var $grid = $('#stalls-grid');
  var $empty = $('#empty-state');
  
  if (stalls.length === 0) {
    $grid.empty();
    $empty.removeClass('d-none');
    return;
  }
  
  $empty.addClass('d-none');
  
  var html = '';
  stalls.forEach(function(stall) {
    var statusText = stall.status === 'open' ? '营业中' : '已打烊';
    var statusClass = stall.status === 'open' ? 'status-open' : 'status-closed';
    
    var tagsHtml = '';
    stall.tags.forEach(function(tag) {
      tagsHtml += '<span class="tag">' + tag + '</span>';
    });
    
    html += `
      <div class="col-md-6 col-lg-4">
        <div class="card stall-card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span class="stall-name">${stall.name}</span>
            <span class="stall-status ${statusClass}">${statusText}</span>
          </div>
          <div class="card-body">
            <div class="signature-dish">
              <strong>招牌：</strong>${stall.signatureDish}
            </div>
            <p class="card-text text-muted small mb-2">${stall.description}</p>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="rating">⭐ ${stall.rating.toFixed(1)}</span>
              <span class="price-range">💰 ${stall.priceRange}</span>
            </div>
            <div class="mb-2">
              <small class="text-muted">📍 ${stall.canteen} ${stall.floor}楼</small>
            </div>
            <div>${tagsHtml}</div>
          </div>
        </div>
      </div>
    `;
  });
  
  $grid.html(html);
}

// 渲染营养成分柱状图
function renderNutritionChart() {
  if (!nutritionData) return;
  
  var chartDom = document.getElementById('nutrition-chart');
  nutritionChart = echarts.init(chartDom);
  
  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function(params) {
        var result = params[0].name + '<br/>';
        params.forEach(function(item) {
          result += item.marker + item.seriesName + ': ' + item.value + (item.seriesName === '热量' ? ' kcal' : ' g') + '<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['热量(kcal)', '蛋白质(g)', '脂肪(g)', '碳水化合物(g)'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: nutritionData.categories,
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 11
      }
    },
    yAxis: {
      type: 'value',
      name: '数值'
    },
    series: [
      {
        name: '热量(kcal)',
        type: 'bar',
        data: nutritionData.calories,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#ff6b35' },
            { offset: 1, color: '#ffc107' }
          ])
        }
      },
      {
        name: '蛋白质(g)',
        type: 'bar',
        data: nutritionData.protein,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#28a745' },
            { offset: 1, color: '#20c997' }
          ])
        }
      },
      {
        name: '脂肪(g)',
        type: 'bar',
        data: nutritionData.fat,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#dc3545' },
            { offset: 1, color: '#ff7676' }
          ])
        }
      },
      {
        name: '碳水化合物(g)',
        type: 'bar',
        data: nutritionData.carbs,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#17a2b8' },
            { offset: 1, color: '#6f42c1' }
          ])
        }
      }
    ]
  };
  
  nutritionChart.setOption(option);
}

// 渲染人气饼图
function renderPopularChart() {
  if (!popularData) return;
  
  var chartDom = document.getElementById('popular-chart');
  popularChart = echarts.init(chartDom);
  
  var pieData = popularData.canteens.map(function(name, index) {
    return { name: name, value: popularData.visitors[index] };
  });
  
  var option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 人次 ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      fontSize: 11
    },
    series: [
      {
        name: '人气排行',
        type: 'pie',
        radius: ['35%', '65%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 11
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        data: pieData,
        color: ['#ff6b35', '#ffc107', '#28a745']
      }
    ]
  };
  
  popularChart.setOption(option);
}

// 显示错误提示
function showError(message) {
  $('#error-message').text(message);
  $('#error-banner').removeClass('d-none');
}
