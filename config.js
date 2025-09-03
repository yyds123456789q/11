// 外链配置文件
// 请根据您的需要修改以下配置

const CONFIG = {
    // 您的微信号（重要：请替换为您的实际微信号）
    wechatId: 'your_wechat_id',
    
    // 微信群链接（如果有的话）
    wechatGroupUrl: 'weixin://',
    
    // 网站基础信息
    siteInfo: {
        title: '免费领1-6年卷子资料',
        subtitle: '66号文件来！免费领',
        description: '免费领取1-6年级资料，暑期查缺补漏复习卷、满分数学笔记等'
    },
    
    // 资料列表
    resources: [
        '📝 暑期查缺补漏复习卷',
        '📖 满分数学笔记',
        '📚 新学期语数英同步单元卷',
        '✏️ 清北学霸提分笔记'
    ],
    
    // 统计数字（会自动增长）
    initialCount: 56987,
    
    // 样式配置
    styles: {
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        buttonColor: '#ff6b6b'
    }
};

// 如果要添加微信群二维码，请将二维码图片命名为 qrcode.png 并放在同一目录下