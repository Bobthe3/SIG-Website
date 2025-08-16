// Premium Data Visualizations for SIG Website
// Using Chart.js for interactive charts

document.addEventListener('DOMContentLoaded', function() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded. Including CDN...');
        loadChartJS();
        return;
    }
    
    initializeCharts();
});

function loadChartJS() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js';
    script.onload = initializeCharts;
    document.head.appendChild(script);
}

function initializeCharts() {
    // Add data visualization sections to the homepage
    addVisualizationSections();
    
    // Initialize individual charts
    initMemberGrowthChart();
    initInvestmentPerformanceChart();
    initEventEngagementChart();
    initESGImpactChart();
}

function addVisualizationSections() {
    // Find the what-we-do section to add charts after it
    const whatWeDoSection = document.querySelector('.what-we-do');
    if (!whatWeDoSection) return;
    
    // Create data insights section
    const dataSection = document.createElement('section');
    dataSection.className = 'data-insights';
    dataSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Our Impact in Numbers</h2>
            
            <!-- Investment Performance Chart -->
            <div class="chart-container premium-card">
                <div class="chart-header">
                    <h3>Sustainable Investment Performance</h3>
                    <p>Year-over-year portfolio performance vs traditional benchmarks</p>
                </div>
                <div class="chart-wrapper">
                    <canvas id="investmentChart"></canvas>
                </div>
            </div>
            
            <!-- Member Growth & Event Engagement -->
            <div class="charts-grid">
                <div class="chart-container premium-card">
                    <div class="chart-header">
                        <h3>Member Growth</h3>
                        <p>Growing community of sustainable investors</p>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="memberGrowthChart"></canvas>
                    </div>
                </div>
                
                <div class="chart-container premium-card">
                    <div class="chart-header">
                        <h3>Event Engagement</h3>
                        <p>Participation across event categories</p>
                    </div>
                    <div class="chart-wrapper">
                        <canvas id="eventChart"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- ESG Impact Metrics -->
            <div class="impact-metrics">
                <h3>ESG Impact Dashboard</h3>
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-icon">🌱</div>
                        <div class="metric-value" data-target="87">0</div>
                        <div class="metric-label">ESG Score Average</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">💰</div>
                        <div class="metric-value" data-target="2.4">0</div>
                        <div class="metric-label">Million AUM (Simulated)</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">🎯</div>
                        <div class="metric-value" data-target="94">0</div>
                        <div class="metric-label">% Sustainable Allocation</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-icon">📈</div>
                        <div class="metric-value" data-target="12.8">0</div>
                        <div class="metric-label">% Annual Return</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert after what-we-do section
    whatWeDoSection.parentNode.insertBefore(dataSection, whatWeDoSection.nextSibling);
    
    // Add CSS for the new sections
    addVisualizationCSS();
    
    // Animate metric counters when they come into view
    animateMetricCounters();
}

function addVisualizationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .data-insights {
            padding: var(--spacing-20) 0;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .data-insights::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 30%, rgba(74, 155, 60, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(124, 176, 104, 0.08) 0%, transparent 50%);
            pointer-events: none;
        }
        
        .data-insights .container {
            position: relative;
            z-index: 2;
        }
        
        .data-insights .section-title {
            color: white;
            margin-bottom: var(--spacing-16);
        }
        
        .chart-container {
            margin-bottom: var(--spacing-12);
        }
        
        .premium-card {
            background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
            border-radius: var(--radius-xl);
            padding: var(--spacing-8);
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            transition: all var(--transition-medium);
        }
        
        .premium-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            border-color: rgba(74, 155, 60, 0.3);
        }
        
        .chart-header {
            text-align: center;
            margin-bottom: var(--spacing-6);
        }
        
        .chart-header h3 {
            font-size: var(--font-size-2xl);
            font-weight: 700;
            margin-bottom: var(--spacing-2);
            background: linear-gradient(45deg, #ffffff 30%, rgba(255,255,255,0.8) 70%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .chart-header p {
            color: rgba(255,255,255,0.7);
            font-size: var(--font-size-base);
        }
        
        .chart-wrapper {
            position: relative;
            height: 400px;
            margin: var(--spacing-6) 0;
        }
        
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: var(--spacing-8);
            margin-bottom: var(--spacing-16);
        }
        
        .charts-grid .chart-wrapper {
            height: 300px;
        }
        
        .impact-metrics {
            text-align: center;
            margin-top: var(--spacing-16);
        }
        
        .impact-metrics h3 {
            font-size: var(--font-size-3xl);
            font-weight: 700;
            margin-bottom: var(--spacing-12);
            background: linear-gradient(45deg, #ffffff 30%, rgba(255,255,255,0.8) 70%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-6);
        }
        
        .metric-card {
            background: linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%);
            border-radius: var(--radius-xl);
            padding: var(--spacing-8);
            border: 1px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            transition: all var(--transition-medium);
            position: relative;
            overflow: hidden;
        }
        
        .metric-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(74, 155, 60, 0.2), transparent);
            transition: left 0.6s;
        }
        
        .metric-card:hover::before {
            left: 100%;
        }
        
        .metric-card:hover {
            transform: translateY(-4px) scale(1.02);
            border-color: rgba(74, 155, 60, 0.4);
        }
        
        .metric-icon {
            font-size: 3rem;
            margin-bottom: var(--spacing-4);
        }
        
        .metric-value {
            font-size: var(--font-size-4xl);
            font-weight: 800;
            margin-bottom: var(--spacing-2);
            background: linear-gradient(45deg, #ffffff 30%, rgba(255,255,255,0.8) 70%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .metric-label {
            font-size: var(--font-size-base);
            color: rgba(255,255,255,0.8);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        @media (max-width: 768px) {
            .charts-grid {
                grid-template-columns: 1fr;
            }
            
            .chart-wrapper {
                height: 250px;
            }
            
            .metrics-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    `;
    document.head.appendChild(style);
}

function initMemberGrowthChart() {
    const ctx = document.getElementById('memberGrowthChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Total Members',
                data: [15, 28, 45, 60],
                borderColor: '#4a9b3c',
                backgroundColor: 'rgba(74, 155, 60, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4a9b3c',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 3,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255,255,255,0.9)',
                        font: { size: 14, weight: '600' }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: 'rgba(255,255,255,0.7)' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                y: {
                    ticks: { color: 'rgba(255,255,255,0.7)' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

function initInvestmentPerformanceChart() {
    const ctx = document.getElementById('investmentChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'SIG Sustainable Portfolio',
                    data: [8.5, 12.3, 15.7, 12.8],
                    backgroundColor: 'rgba(74, 155, 60, 0.8)',
                    borderColor: '#4a9b3c',
                    borderWidth: 2,
                    borderRadius: 8
                },
                {
                    label: 'S&P 500 Benchmark',
                    data: [7.2, 10.1, 13.2, 11.4],
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderColor: 'rgba(255, 255, 255, 0.7)',
                    borderWidth: 2,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255,255,255,0.9)',
                        font: { size: 14, weight: '600' }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: 'rgba(255,255,255,0.7)' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                y: {
                    ticks: { 
                        color: 'rgba(255,255,255,0.7)',
                        callback: function(value) { return value + '%'; }
                    },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

function initEventEngagementChart() {
    const ctx = document.getElementById('eventChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Workshops', 'Networking', 'Competitions', 'Guest Speakers'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    '#4a9b3c',
                    '#7cb068',
                    '#a3d492',
                    'rgba(255, 255, 255, 0.3)'
                ],
                borderColor: 'rgba(255,255,255,0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255,255,255,0.9)',
                        font: { size: 12, weight: '500' },
                        padding: 20
                    }
                }
            }
        }
    });
}

function initESGImpactChart() {
    // This would be a radar chart showing ESG scores across different categories
    // For now, we'll use the animated metric counters instead
}

function animateMetricCounters() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metricValues.forEach(metric => observer.observe(metric));
}

function animateCounter(element) {
    const target = parseFloat(element.dataset.target);
    const suffix = element.textContent.replace(/[\d.]/g, '').trim();
    const isDecimal = target % 1 !== 0;
    
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const duration = 2000;
    const frameTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
        element.textContent = displayValue + (suffix ? ' ' + suffix : '');
    }, frameTime);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCharts);
} else {
    initializeCharts();
}