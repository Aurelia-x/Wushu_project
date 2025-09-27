// 简单的功能实现 - 新手友好版本
console.log('灵枢武境前端Demo加载成功！');

// 视频速度控制
function changeSpeed(speed) {
    const video = document.getElementById('demo-video');
    if (video) {
        video.playbackRate = speed;
        console.log(`视频速度设置为: ${speed}x`);
    }
}

// 摄像头功能 - 简化版
let stream = null;

document.getElementById('start-camera').addEventListener('click', async function() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 } 
        });
        
        const video = document.getElementById('webcam');
        video.srcObject = stream;
        
        // 启用分析按钮
        document.getElementById('analyze-pose').disabled = false;
        this.disabled = true;
        
        console.log('摄像头开启成功');
    } catch (error) {
        console.error('摄像头开启失败:', error);
        alert('无法访问摄像头，请检查权限设置');
    }
});

// 模拟动作分析功能
document.getElementById('analyze-pose').addEventListener('click', function() {
    const feedbackElement = document.getElementById('feedback-result');
    
    // 模拟分析过程
    feedbackElement.innerHTML = '<p>正在分析您的动作...</p>';
    
    setTimeout(() => {
        // 模拟分析结果
        const results = [
            "动作完成度: 85%",
            "肘部角度需要调整: 建议增大15度",
            "节奏掌握良好，继续保持！",
            "建议重点练习腰部转动"
        ];
        
        let html = '<h3>分析结果:</h3><ul>';
        results.forEach(result => {
            html += `<li>${result}</li>`;
        });
        html += '</ul>';
        
        feedbackElement.innerHTML = html;
        
        // 模拟语音反馈
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance("动作分析完成，完成度百分之八十五");
            utterance.lang = 'zh-CN';
            speechSynthesis.speak(utterance);
        }
    }, 2000);
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成');
    
    // 平滑滚动导航
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// 加载MediaPipe（简化版，避免复杂配置）
function loadMediaPipeScript() {
    return new Promise((resolve, reject) => {
        if (window.Pose) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 简单的骨骼点绘制（新手友好版）
function drawSimplePose(video, canvas) {
    const ctx = canvas.getContext('2d');
    
    // 设置canvas尺寸与视频一致
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // 简单的矩形和圆形绘制（模拟骨骼点）
    function drawFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制视频帧（可选）
        // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 模拟绘制一些点（实际项目中会用MediaPipe的真实数据）
        ctx.fillStyle = 'red';
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        requestAnimationFrame(drawFrame);
    }
    
    drawFrame();
}

// 修改摄像头开启函数，添加骨骼绘制
document.getElementById('start-camera').addEventListener('click', async function() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 } 
        });
        
        const video = document.getElementById('webcam');
        const canvas = document.getElementById('pose-canvas');
        video.srcObject = stream;
        
        // 视频加载后开始绘制
        video.onloadedmetadata = () => {
            drawSimplePose(video, canvas);
        };
        
        document.getElementById('analyze-pose').disabled = false;
        this.disabled = true;
        
    } catch (error) {
        console.error('摄像头开启失败:', error);
    }
});