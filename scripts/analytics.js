class SimpleAnalytics {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.init();
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    init() {
        this.trackPageView();
        this.trackReferrer();
        this.trackUserAgent();
        this.trackTimeOnSite();
        this.trackVisitType();
        
        // Track page interactions
        document.addEventListener('click', (e) => this.trackClick(e));
        
        // Track when user leaves
        window.addEventListener('beforeunload', () => this.trackSessionEnd());
    }

    trackPageView() {
        const data = {
            type: 'page_view',
            page: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            url: window.location.href
        };
        
        this.sendAnalytics(data);
        console.log('Page view tracked:', data);
    }

    trackReferrer() {
        const referrer = document.referrer;
        let source = 'direct';
        
        if (referrer) {
            const referrerDomain = new URL(referrer).hostname;
            const currentDomain = window.location.hostname;
            
            if (referrerDomain !== currentDomain) {
                if (referrerDomain.includes('google')) source = 'google';
                else if (referrerDomain.includes('facebook')) source = 'facebook';
                else if (referrerDomain.includes('twitter')) source = 'twitter';
                else if (referrerDomain.includes('instagram')) source = 'instagram';
                else if (referrerDomain.includes('linkedin')) source = 'linkedin';
                else source = 'external';
            } else {
                source = 'internal';
            }
        }
        
        const data = {
            type: 'visit_source',
            source: source,
            referrer: referrer,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };
        
        this.sendAnalytics(data);
        console.log('Visit source tracked:', data);
    }

    trackUserAgent() {
        const ua = navigator.userAgent;
        let device = 'desktop';
        let browser = 'unknown';
        
        // Detect device
        if (/Mobile|Android|iPhone|iPad/.test(ua)) {
            device = /iPad/.test(ua) ? 'tablet' : 'mobile';
        }
        
        // Detect browser
        if (ua.includes('Chrome')) browser = 'chrome';
        else if (ua.includes('Firefox')) browser = 'firefox';
        else if (ua.includes('Safari')) browser = 'safari';
        else if (ua.includes('Edge')) browser = 'edge';
        
        const data = {
            type: 'device_info',
            device: device,
            browser: browser,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };
        
        this.sendAnalytics(data);
        console.log('Device info tracked:', data);
    }

    trackVisitType() {
        const isReturning = localStorage.getItem('sig_visitor');
        const visitType = isReturning ? 'returning' : 'new';
        
        if (!isReturning) {
            localStorage.setItem('sig_visitor', 'true');
        }
        
        const data = {
            type: 'visit_type',
            visitType: visitType,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };
        
        this.sendAnalytics(data);
        console.log('Visit type tracked:', data);
    }

    trackClick(event) {
        const element = event.target;
        const tagName = element.tagName.toLowerCase();
        
        // Track meaningful clicks
        if (tagName === 'a' || tagName === 'button' || element.classList.contains('btn')) {
            const data = {
                type: 'click',
                element: tagName,
                text: element.textContent?.trim().substring(0, 50) || '',
                href: element.href || '',
                className: element.className || '',
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };
            
            this.sendAnalytics(data);
            console.log('Click tracked:', data);
        }
    }

    trackTimeOnSite() {
        // Track time spent every 30 seconds
        setInterval(() => {
            const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
            
            const data = {
                type: 'time_on_site',
                seconds: timeSpent,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId
            };
            
            this.sendAnalytics(data);
        }, 30000);
    }

    trackSessionEnd() {
        const totalTime = Math.floor((Date.now() - this.startTime) / 1000);
        
        const data = {
            type: 'session_end',
            totalSeconds: totalTime,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId
        };
        
        // Use sendBeacon for reliable tracking on page unload
        navigator.sendBeacon && this.sendBeacon(data);
        console.log('Session end tracked:', data);
    }

    sendAnalytics(data) {
        // Store locally for now (in a real implementation, this would send to a server)
        this.storeLocally(data);
        
        // In a real implementation, you might send to Google Analytics, or your own endpoint:
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(data) });
    }

    sendBeacon(data) {
        // Store locally for page unload events
        this.storeLocally(data);
    }

    storeLocally(data) {
        try {
            const existing = JSON.parse(localStorage.getItem('sig_analytics') || '[]');
            existing.push(data);
            
            // Keep only last 100 events to prevent storage bloat
            if (existing.length > 100) {
                existing.splice(0, existing.length - 100);
            }
            
            localStorage.setItem('sig_analytics', JSON.stringify(existing));
        } catch (e) {
            console.error('Failed to store analytics data:', e);
        }
    }

    // Method to retrieve analytics data (for admin viewing)
    static getAnalyticsData() {
        try {
            return JSON.parse(localStorage.getItem('sig_analytics') || '[]');
        } catch (e) {
            console.error('Failed to retrieve analytics data:', e);
            return [];
        }
    }

    // Method to get summary statistics
    static getAnalyticsSummary() {
        const data = SimpleAnalytics.getAnalyticsData();
        const summary = {
            totalEvents: data.length,
            pageViews: data.filter(d => d.type === 'page_view').length,
            uniqueSessions: new Set(data.map(d => d.sessionId)).size,
            visitSources: {},
            devices: {},
            browsers: {},
            popularPages: {},
            avgTimeOnSite: 0
        };

        data.forEach(event => {
            switch (event.type) {
                case 'visit_source':
                    summary.visitSources[event.source] = (summary.visitSources[event.source] || 0) + 1;
                    break;
                case 'device_info':
                    summary.devices[event.device] = (summary.devices[event.device] || 0) + 1;
                    summary.browsers[event.browser] = (summary.browsers[event.browser] || 0) + 1;
                    break;
                case 'page_view':
                    summary.popularPages[event.page] = (summary.popularPages[event.page] || 0) + 1;
                    break;
            }
        });

        // Calculate average time on site
        const sessionEndEvents = data.filter(d => d.type === 'session_end');
        if (sessionEndEvents.length > 0) {
            const totalTime = sessionEndEvents.reduce((sum, event) => sum + event.totalSeconds, 0);
            summary.avgTimeOnSite = Math.round(totalTime / sessionEndEvents.length);
        }

        return summary;
    }

    // Method to clear analytics data
    static clearAnalyticsData() {
        localStorage.removeItem('sig_analytics');
        console.log('Analytics data cleared');
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sigAnalytics = new SimpleAnalytics();
});

// Expose methods globally for admin access
window.getSIGAnalytics = SimpleAnalytics.getAnalyticsData;
window.getSIGAnalyticsSummary = SimpleAnalytics.getAnalyticsSummary;
window.clearSIGAnalytics = SimpleAnalytics.clearAnalyticsData;