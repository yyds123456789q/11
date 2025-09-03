// 外链管理系统 - 主要功能脚本

// 全局配置对象
let linkConfig = {
    basic: {
        title: '免费领1-6年卷子资料',
        subtitle: '66号文件来！免费领',
        description: '免费领取1-6年级资料，暑期查缺补漏复习卷、满分数学笔记等',
        wechatId: 'your_wechat_id',
        statsNumber: 56987
    },
    resources: [
        { title: '📝 暑期查缺补漏复习卷', description: '1-6年级全套' },
        { title: '📖 满分数学笔记', description: '提分必备' },
        { title: '📚 新学期语数英同步单元卷', description: '同步教材' },
        { title: '✏️ 清北学霸提分笔记', description: '学霸秘籍' }
    ],
    style: {
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        buttonColor: '#ff6b6b',
        layout: 'default',
        enableAnimations: true,
        enablePulse: true
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
    renderResourcesList();
    bindEvents();
    
    // 初始化模板系统
    if (typeof initTemplateSystem === 'function') {
        initTemplateSystem();
        renderTemplateSelector();
        renderColorSchemeSelector();
    }
    
    console.log('外链管理系统已初始化');
});

// 绑定事件监听器
function bindEvents() {
    // 基础信息输入框事件
    document.getElementById('pageTitle').addEventListener('input', updateBasicInfo);
    document.getElementById('pageSubtitle').addEventListener('input', updateBasicInfo);
    document.getElementById('pageDescription').addEventListener('input', updateBasicInfo);
    document.getElementById('wechatId').addEventListener('input', updateBasicInfo);
    document.getElementById('statsNumber').addEventListener('input', updateBasicInfo);

    // 样式设置事件
    document.getElementById('primaryColor').addEventListener('change', updateStyle);
    document.getElementById('secondaryColor').addEventListener('change', updateStyle);
    document.getElementById('buttonColor').addEventListener('change', updateStyle);
    document.getElementById('enableAnimations').addEventListener('change', updateStyle);
    document.getElementById('enablePulse').addEventListener('change', updateStyle);

    // 布局选择事件
    document.querySelectorAll('.style-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.style-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            linkConfig.style.layout = this.dataset.layout;
            updatePreview();
        });
    });

    // 实时保存配置
    setInterval(saveConfig, 5000); // 每5秒自动保存
}

// 标签页切换
function switchTab(tabName) {
    // 隐藏所有标签内容
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 显示选中的标签
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');

    // 如果切换到预览标签，更新预览
    if (tabName === 'preview') {
        updatePreview();
    }
}

// 更新基础信息
function updateBasicInfo() {
    linkConfig.basic.title = document.getElementById('pageTitle').value;
    linkConfig.basic.subtitle = document.getElementById('pageSubtitle').value;
    linkConfig.basic.description = document.getElementById('pageDescription').value;
    linkConfig.basic.wechatId = document.getElementById('wechatId').value;
    linkConfig.basic.statsNumber = parseInt(document.getElementById('statsNumber').value) || 0;
    
    updatePreview();
    saveConfig();
}

// 更新样式设置
function updateStyle() {
    linkConfig.style.primaryColor = document.getElementById('primaryColor').value;
    linkConfig.style.secondaryColor = document.getElementById('secondaryColor').value;
    linkConfig.style.buttonColor = document.getElementById('buttonColor').value;
    linkConfig.style.enableAnimations = document.getElementById('enableAnimations').checked;
    linkConfig.style.enablePulse = document.getElementById('enablePulse').checked;
    
    updatePreview();
    saveConfig();
}

// 渲染资料列表
function renderResourcesList() {
    const container = document.getElementById('resourcesList');
    container.innerHTML = '';

    linkConfig.resources.forEach((resource, index) => {
        const resourceElement = document.createElement('div');
        resourceElement.className = 'resource-item';
        resourceElement.innerHTML = `
            <div class="resource-content">
                <div class="resource-title">${resource.title}</div>
                <div class="resource-desc">${resource.description}</div>
            </div>
            <div class="resource-actions">
                <button class="btn btn-primary" onclick="editResource(${index})">编辑</button>
                <button class="btn btn-danger" onclick="deleteResource(${index})">删除</button>
            </div>
        `;
        container.appendChild(resourceElement);
    });
}

// 添加新资料
function addResource() {
    const title = prompt('请输入资料标题（可包含emoji）:', '📄 新资料');
    const description = prompt('请输入资料描述:', '描述信息');
    
    if (title && description) {
        linkConfig.resources.push({ title, description });
        renderResourcesList();
        updatePreview();
        saveConfig();
        
        showAlert('成功添加新资料！', 'success');
    }
}

// 编辑资料
function editResource(index) {
    const resource = linkConfig.resources[index];
    const newTitle = prompt('编辑资料标题:', resource.title);
    const newDescription = prompt('编辑资料描述:', resource.description);
    
    if (newTitle !== null && newDescription !== null) {
        linkConfig.resources[index].title = newTitle;
        linkConfig.resources[index].description = newDescription;
        renderResourcesList();
        updatePreview();
        saveConfig();
        
        showAlert('资料更新成功！', 'success');
    }
}

// 删除资料
function deleteResource(index) {
    if (confirm('确定要删除这个资料吗？')) {
        linkConfig.resources.splice(index, 1);
        renderResourcesList();
        updatePreview();
        saveConfig();
        
        showAlert('资料删除成功！', 'success');
    }
}

// 切换预览窗口
function togglePreview() {
    const preview = document.getElementById('floatingPreview');
    if (preview.classList.contains('show')) {
        preview.classList.remove('show');
    } else {
        preview.classList.add('show');
        updatePreview();
    }
}

// 更新预览内容
function updatePreview() {
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
        const htmlContent = generatePageHTML();
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        previewFrame.src = url;
    }
}

// 生成页面HTML
function generatePageHTML() {
    const resourcesHTML = linkConfig.resources.map(resource => 
        `<div class="resource-item">${resource.title}</div>`
    ).join('');

    const animationClass = linkConfig.style.enablePulse ? 'pulse' : '';
    
    const cssVars = `
        :root {
            --primary-color: ${linkConfig.style.primaryColor};
            --secondary-color: ${linkConfig.style.secondaryColor};
            --button-color: ${linkConfig.style.buttonColor};
        }
    `;

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${linkConfig.basic.title}</title>
    <meta name="description" content="${linkConfig.basic.description}">
    
    <!-- 针对微信分享优化的meta标签 -->
    <meta property="og:title" content="${linkConfig.basic.title}">
    <meta property="og:description" content="${linkConfig.basic.description}">
    <meta property="og:type" content="website">
    
    <style>
        ${cssVars}
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
            min-height: 100vh;
            color: #333;
        }
        
        .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #fff;
            margin: 0 auto 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .title {
            color: white;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: rgba(255,255,255,0.9);
            font-size: 14px;
        }
        
        .content-card {
            background: white;
            border-radius: 16px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        
        .resource-title {
            color: #333;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .resource-list {
            margin-bottom: 20px;
        }
        
        .resource-item {
            background: #f8f9fa;
            padding: 12px 15px;
            margin-bottom: 8px;
            border-radius: 8px;
            border-left: 4px solid var(--primary-color);
            font-size: 14px;
        }
        
        .stats {
            background: #e8f4fd;
            border: 2px solid #007acc;
            border-radius: 12px;
            padding: 15px;
            text-align: center;
            margin: 20px 0;
        }
        
        .stats-number {
            color: #007acc;
            font-size: 20px;
            font-weight: bold;
        }
        
        .stats-text {
            color: #666;
            font-size: 12px;
            margin-top: 5px;
        }
        
        .cta-button {
            background: linear-gradient(45deg, var(--button-color), var(--button-color));
            color: white;
            border: none;
            padding: 18px 30px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin: 20px 0;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        }
        
        .notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 12px;
            text-align: center;
            font-size: 13px;
            color: #856404;
            margin-top: 15px;
        }
        
        .footer {
            text-align: center;
            color: rgba(255,255,255,0.7);
            font-size: 12px;
            margin-top: 20px;
        }
        
        ${linkConfig.style.enableAnimations ? `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        ` : ''}
        
        .loading {
            display: none;
            text-align: center;
            color: white;
            margin-top: 20px;
        }
        
        .spinner {
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 3px solid white;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="avatar">📚</div>
            <div class="title">${linkConfig.basic.title}</div>
            <div class="subtitle">${linkConfig.basic.subtitle}</div>
        </div>
        
        <div class="content-card">
            <div class="resource-title">🎁 免费资料包含</div>
            <div class="resource-list">
                ${resourcesHTML}
            </div>
            
            <div class="stats">
                <div class="stats-number">${linkConfig.basic.statsNumber.toLocaleString()}+</div>
                <div class="stats-text">位家长成功领取</div>
            </div>
            
            <button class="cta-button ${animationClass}" onclick="joinWechatGroup()">
                🚀 点击免费领取
            </button>
            
            <div class="notice">
                ⚡ 仅限今日免费，名额有限！
            </div>
        </div>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <div>正在跳转到微信...</div>
        </div>
        
        <div class="footer">
            点击上方按钮即可免费获取全套资料
        </div>
    </div>

    <script>
        // 检测用户设备和环境
        function detectEnvironment() {
            const ua = navigator.userAgent.toLowerCase();
            return {
                isWeChat: ua.indexOf('micromessenger') !== -1,
                isIOS: /iphone|ipad|ipod/.test(ua),
                isAndroid: /android/.test(ua),
                isMobile: /mobile|android|iphone|ipad|phone/.test(ua)
            };
        }
        
        // 主要的跳转逻辑
        function joinWechatGroup() {
            const env = detectEnvironment();
            const button = document.querySelector('.cta-button');
            const loading = document.getElementById('loading');
            
            // 显示加载状态
            button.style.display = 'none';
            loading.style.display = 'block';
            
            const wechatGroupUrl = 'weixin://';
            const wechatNumber = '${linkConfig.basic.wechatId}';
            
            if (env.isWeChat) {
                // 在微信内部环境，直接显示二维码和微信号
                setTimeout(() => {
                    showInstruction();
                }, 500);
                return;
            }
            
            setTimeout(() => {
                if (env.isIOS) {
                    window.location.href = wechatGroupUrl;
                    setTimeout(() => {
                        showInstruction();
                    }, 2000);
                } else if (env.isAndroid) {
                    window.location.href = wechatGroupUrl;
                    setTimeout(() => {
                        showInstruction();
                    }, 2000);
                } else {
                    showInstruction();
                }
            }, 1000);
        }
        
        // 显示操作指引
        function showInstruction() {
            const loading = document.getElementById('loading');
            loading.innerHTML = \`
                <div style="background: white; border-radius: 12px; padding: 20px; color: #333;">
                    <h3 style="margin-bottom: 15px;">📱 加入微信群获取资料</h3>
                    <p style="margin-bottom: 10px;">方式一：扫描下方二维码</p>
                    <div style="width: 200px; height: 200px; background: #f0f0f0; margin: 15px auto; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: #666; overflow: hidden;">
                        <img src="qrcode.png" alt="微信群二维码" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='微信群二维码<br>（请添加 qrcode.png 文件）';">
                    </div>
                    <p style="margin: 15px 0; font-size: 14px;">方式二：添加微信号: <strong>${linkConfig.basic.wechatId}</strong></p>
                    <button onclick="copyWechatId()" style="background: #07c160; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                        复制微信号
                    </button>
                </div>
            \`;
        }
        
        // 复制微信号功能
        function copyWechatId() {
            const wechatId = '${linkConfig.basic.wechatId}';
            navigator.clipboard.writeText(wechatId).then(() => {
                alert('微信号已复制，请打开微信添加好友');
            }).catch(() => {
                prompt('请手动复制微信号:', wechatId);
            });
        }
        
        // 页面加载时的初始化
        document.addEventListener('DOMContentLoaded', function() {
            console.log('外链页面已加载');
            
            // 模拟实时更新领取人数
            let count = ${linkConfig.basic.statsNumber};
            setInterval(() => {
                count += Math.floor(Math.random() * 3);
                const statsNumber = document.querySelector('.stats-number');
                if (statsNumber) {
                    statsNumber.textContent = count.toLocaleString() + '+';
                }
            }, 10000);
        });
    </script>
</body>
</html>`;
}

// 生成实际页面文件
function generatePage() {
    const htmlContent = generatePageHTML();
    
    // 创建并下载文件
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert('页面生成成功！文件已下载到本地', 'success');
    
    // 同时保存到服务器目录（如果可能）
    saveToServer(htmlContent);
}

// 保存生成的页面到服务器（模拟）
function saveToServer(htmlContent) {
    // 在实际应用中，这里会发送到后端保存文件
    console.log('页面已生成，长度:', htmlContent.length);
    
    // 更新访问地址显示
    document.getElementById('localUrl').textContent = 'http://127.0.0.1:3000/generated.html';
    document.getElementById('mobileUrl').textContent = 'http://192.168.144.1:3000/generated.html';
}

// 复制URL
function copyUrl() {
    const url = document.getElementById('localUrl').textContent;
    navigator.clipboard.writeText(url).then(() => {
        showAlert('本地访问地址已复制！', 'success');
    });
}

// 复制手机URL
function copyMobileUrl() {
    const url = document.getElementById('mobileUrl').textContent;
    navigator.clipboard.writeText(url).then(() => {
        showAlert('手机访问地址已复制！', 'success');
    });
}

// 导出配置
function exportConfig() {
    const configData = JSON.stringify(linkConfig, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'link-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert('配置已导出到文件！', 'success');
}

// 导出所有数据
function exportData() {
    const data = {
        config: linkConfig,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    };
    
    const dataString = JSON.stringify(data, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `link-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showAlert('数据导出成功！', 'success');
}

// 导入数据
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // 验证数据格式
            if (data.config && data.config.basic && data.config.resources && data.config.style) {
                linkConfig = data.config;
                loadConfig();
                renderResourcesList();
                showAlert('数据导入成功！', 'success');
            } else {
                throw new Error('数据格式不正确');
            }
        } catch (error) {
            showAlert('导入失败：文件格式不正确', 'error');
        }
    };
    reader.readAsText(file);
}

// 重置数据
function resetData() {
    if (confirm('确定要重置所有数据吗？这将清除所有自定义设置。')) {
        linkConfig = {
            basic: {
                title: '免费领1-6年卷子资料',
                subtitle: '66号文件来！免费领',
                description: '免费领取1-6年级资料，暑期查缺补漏复习卷、满分数学笔记等',
                wechatId: 'your_wechat_id',
                statsNumber: 56987
            },
            resources: [
                { title: '📝 暑期查缺补漏复习卷', description: '1-6年级全套' },
                { title: '📖 满分数学笔记', description: '提分必备' },
                { title: '📚 新学期语数英同步单元卷', description: '同步教材' },
                { title: '✏️ 清北学霸提分笔记', description: '学霸秘籍' }
            ],
            style: {
                primaryColor: '#667eea',
                secondaryColor: '#764ba2',
                buttonColor: '#ff6b6b',
                layout: 'default',
                enableAnimations: true,
                enablePulse: true
            }
        };
        
        loadConfig();
        renderResourcesList();
        showAlert('数据已重置为默认设置！', 'success');
    }
}

// 加载配置到界面
function loadConfig() {
    document.getElementById('pageTitle').value = linkConfig.basic.title;
    document.getElementById('pageSubtitle').value = linkConfig.basic.subtitle;
    document.getElementById('pageDescription').value = linkConfig.basic.description;
    document.getElementById('wechatId').value = linkConfig.basic.wechatId;
    document.getElementById('statsNumber').value = linkConfig.basic.statsNumber;
    
    document.getElementById('primaryColor').value = linkConfig.style.primaryColor;
    document.getElementById('secondaryColor').value = linkConfig.style.secondaryColor;
    document.getElementById('buttonColor').value = linkConfig.style.buttonColor;
    document.getElementById('enableAnimations').checked = linkConfig.style.enableAnimations;
    document.getElementById('enablePulse').checked = linkConfig.style.enablePulse;
    
    // 设置布局选择
    document.querySelectorAll('.style-option').forEach(option => {
        option.classList.remove('selected');
        if (option.dataset.layout === linkConfig.style.layout) {
            option.classList.add('selected');
        }
    });
}

// 保存配置到本地存储
function saveConfig() {
    localStorage.setItem('linkConfig', JSON.stringify(linkConfig));
}

// 从本地存储加载配置
function loadStoredConfig() {
    const stored = localStorage.getItem('linkConfig');
    if (stored) {
        try {
            linkConfig = JSON.parse(stored);
        } catch (error) {
            console.error('加载配置失败:', error);
        }
    }
}

// 显示提示消息
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // 插入到第一个卡片之前
    const container = document.querySelector('.container');
    const firstCard = container.querySelector('.card');
    container.insertBefore(alertDiv, firstCard);
    
    // 3秒后自动消失
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}

// 初始化时加载存储的配置
loadStoredConfig();

// 渲染模板选择器
function renderTemplateSelector() {
    const container = document.getElementById('templateSelector');
    if (container && typeof createTemplateSelector === 'function') {
        container.innerHTML = createTemplateSelector();
    }
}

// 渲染配色方案选择器
function renderColorSchemeSelector() {
    const container = document.getElementById('colorSchemeSelector');
    if (container && typeof createColorSchemeSelector === 'function') {
        container.innerHTML = createColorSchemeSelector();
    }
}