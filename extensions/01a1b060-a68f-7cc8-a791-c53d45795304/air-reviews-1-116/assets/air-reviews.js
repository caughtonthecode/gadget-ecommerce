(function() {
  // const BASE_URL = 'https://avada-sales-pop-staging.firebaseapp.com';
  const BASE_URL = 'https://cdn-air-reviews.avada.io';
  /**
   */
  function injectMainBundle() {
    if (window.__airReviewsMainLoaded) return;
    window.__airReviewsMainLoaded = true;
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.async = !0;
    scriptElement.src = `${BASE_URL}/scripttag/air-reviews-main.min.js?v=${new Date().getTime()}`;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(scriptElement, firstScript);
  }

  const WIDGET_SELECTORS =
    '.AirReviews-Widget--Stars, .AirReviews-Widget--Block, .AirReviews-Widget--Carousel, ' +
    '.AirReviews-Embed-BlockWrapper, .AirReviews-Embed-BlockAllWrapper';

  /**
   *
   * @return {boolean}
   */
  function shouldLoadMainBundle() {
    const air = window.AIR_REVIEWS;
    if (!air || !air.settings) return false;

    const t = air.template || '';
    const s = air.settings;
    const rw = s.reviewWidget || {};

    if (t.indexOf('product') !== -1) return true;
    if (rw.enableSidebar) return true;
    if (s.reviewPop && s.reviewPop.enabled) return true;
    if (s.reviewCarouselWidget && s.reviewCarouselWidget.enableCarousel) return true;
    if (
      rw.enableStarRating &&
      rw.showCatalogPage &&
      (t.indexOf('collection') !== -1 || t.indexOf('search') !== -1 || t.indexOf('page') !== -1)
    ) {
      return true;
    }
    if (rw.enableStarRating && rw.showOnHomePage && t.indexOf('index') !== -1) return true;
    if (document.querySelector(WIDGET_SELECTORS)) return true;

    return false;
  }

  /**
   */
  function evaluate() {
    if (shouldLoadMainBundle()) injectMainBundle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', evaluate, {once: true});
  } else {
    evaluate();
  }
})();
