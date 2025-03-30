export function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const paint = performance.getEntriesByType('paint');
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      console.info('Performance Metrics:', {
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
        domInteractive: navigation.domInteractive,
        domComplete: navigation.domComplete,
        loadComplete: navigation.loadEventEnd,
      });
    });
  }
}