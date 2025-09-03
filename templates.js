// 外链模板系统 - 预设模板和样式

const TEMPLATES = {
    default: {
        name: '经典模板',
        description: '适合大多数推广场景',
        style: {
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
            buttonColor: '#ff6b6b',
            layout: 'default',
            enableAnimations: true,
            enablePulse: true
        },
        preview: 'template-previews/default.png'
    },
    
    modern: {
        name: '现代风格',
        description: '简约现代，适合年轻用户',
        style: {
            primaryColor: '#4facfe',
            secondaryColor: '#00f2fe',
            buttonColor: '#ff416c',
            layout: 'minimal',
            enableAnimations: true,
            enablePulse: false
        },
        preview: 'template-previews/modern.png'
    },
    
    business: {
        name: '商务专业',
        description: '正式专业，适合商务场景',
        style: {
            primaryColor: '#2c3e50',
            secondaryColor: '#34495e',
            buttonColor: '#3498db',
            layout: 'full',
            enableAnimations: false,
            enablePulse: false
        },
        preview: 'template-previews/business.png'
    },
    
    warm: {
        name: '温馨暖色',
        description: '温暖亲切，适合教育培训',
        style: {
            primaryColor: '#ff9a9e',
            secondaryColor: '#fecfef',
            buttonColor: '#ff6b9d',
            layout: 'default',
            enableAnimations: true,
            enablePulse: true
        },
        preview: 'template-previews/warm.png'
    },
    
    tech: {
        name: '科技蓝调',
        description: '科技感十足，适合IT产品',
        style: {
            primaryColor: '#0099ff',
            secondaryColor: '#00ccff',
            buttonColor: '#00ff88',
            layout: 'minimal',
            enableAnimations: true,
            enablePulse: true
        },
        preview: 'template-previews/tech.png'
    },
    
    nature: {
        name: '自然绿意',
        description: '清新自然，适合健康产品',
        style: {
            primaryColor: '#56ab2f',
            secondaryColor: '#a8e6cf',
            buttonColor: '#4ecdc4',
            layout: 'default',
            enableAnimations: true,
            enablePulse: false
        },
        preview: 'template-previews/nature.png'
    }
};

// 常用配色方案
const COLOR_SCHEMES = {
    sunset: {
        name: '日落余晖',
        colors: {
            primary: '#ff7e5f',
            secondary: '#feb47b',
            button: '#ff6b6b'
        }
    },
    ocean: {
        name: '海洋蓝调',
        colors: {
            primary: '#667eea',
            secondary: '#764ba2',
            button: '#4facfe'
        }
    },
    forest: {
        name: '森林绿意',
        colors: {
            primary: '#11998e',
            secondary: '#38ef7d',
            button: '#00b894'
        }
    },
    royal: {
        name: '皇家紫金',
        colors: {
            primary: '#8360c3',
            secondary: '#2ebf91',
            button: '#fd79a8'
        }
    },
    fire: {
        name: '烈焰红橙',
        colors: {
            primary: '#f093fb',
            secondary: '#f5576c',
            button: '#ff6b35'
        }
    }
};

// 获取所有模板
function getAllTemplates() {
    return TEMPLATES;
}

// 应用模板
function applyTemplate(templateId) {
    if (TEMPLATES[templateId]) {
        const template = TEMPLATES[templateId];
        
        // 更新全局配置
        Object.assign(linkConfig.style, template.style);
        
        // 更新界面
        loadConfig();
        updatePreview();
        saveConfig();
        
        showAlert(`已应用"${template.name}"模板！`, 'success');
        return true;
    }
    return false;
}

// 应用配色方案
function applyColorScheme(schemeId) {
    if (COLOR_SCHEMES[schemeId]) {
        const scheme = COLOR_SCHEMES[schemeId];
        
        linkConfig.style.primaryColor = scheme.colors.primary;
        linkConfig.style.secondaryColor = scheme.colors.secondary;
        linkConfig.style.buttonColor = scheme.colors.button;
        
        loadConfig();
        updatePreview();
        saveConfig();
        
        showAlert(`已应用"${scheme.name}"配色方案！`, 'success');
        return true;
    }
    return false;
}

// 创建模板选择界面
function createTemplateSelector() {
    const templates = getAllTemplates();
    let html = '<div class="template-grid">';
    
    for (const [id, template] of Object.entries(templates)) {
        html += `
            <div class="template-option" data-template="${id}" onclick="applyTemplate('${id}')">
                <div class="template-preview" style="background: linear-gradient(135deg, ${template.style.primaryColor}, ${template.style.secondaryColor})">
                    <div class="template-button" style="background: ${template.style.buttonColor}"></div>
                </div>
                <div class="template-info">
                    <h4>${template.name}</h4>
                    <p>${template.description}</p>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

// 创建配色方案选择界面
function createColorSchemeSelector() {
    let html = '<div class="color-scheme-grid">';
    
    for (const [id, scheme] of Object.entries(COLOR_SCHEMES)) {
        html += `
            <div class="color-scheme-option" data-scheme="${id}" onclick="applyColorScheme('${id}')">
                <div class="color-preview">
                    <div class="color-dot" style="background: ${scheme.colors.primary}"></div>
                    <div class="color-dot" style="background: ${scheme.colors.secondary}"></div>
                    <div class="color-dot" style="background: ${scheme.colors.button}"></div>
                </div>
                <span>${scheme.name}</span>
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

// 添加模板相关的CSS样式
const TEMPLATE_CSS = `
    .template-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin: 20px 0;
    }
    
    .template-option {
        border: 2px solid #e1e5e9;
        border-radius: 12px;
        padding: 15px;
        cursor: pointer;
        transition: all 0.3s;
        background: white;
    }
    
    .template-option:hover {
        border-color: #667eea;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .template-preview {
        height: 120px;
        border-radius: 8px;
        margin-bottom: 15px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .template-button {
        width: 60px;
        height: 20px;
        border-radius: 10px;
    }
    
    .template-info h4 {
        margin: 0 0 8px 0;
        color: #333;
        font-size: 16px;
    }
    
    .template-info p {
        margin: 0;
        color: #666;
        font-size: 14px;
    }
    
    .color-scheme-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }
    
    .color-scheme-option {
        display: flex;
        align-items: center;
        padding: 12px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        background: white;
    }
    
    .color-scheme-option:hover {
        border-color: #667eea;
    }
    
    .color-preview {
        display: flex;
        margin-right: 15px;
    }
    
    .color-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 5px;
        border: 2px solid white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
`;

// 将CSS添加到页面
function injectTemplateCSS() {
    const style = document.createElement('style');
    style.textContent = TEMPLATE_CSS;
    document.head.appendChild(style);
}

// 初始化模板系统
function initTemplateSystem() {
    injectTemplateCSS();
    console.log('模板系统已初始化');
}

// 导出函数
window.TEMPLATES = TEMPLATES;
window.COLOR_SCHEMES = COLOR_SCHEMES;
window.applyTemplate = applyTemplate;
window.applyColorScheme = applyColorScheme;
window.createTemplateSelector = createTemplateSelector;
window.createColorSchemeSelector = createColorSchemeSelector;
window.initTemplateSystem = initTemplateSystem;