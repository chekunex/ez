var CONTENT = {};
CONTENT['mirage-guide'] = mirageGuide;
CONTENT['awp-guide'] = awpGuide;
CONTENT['niveus-guide'] = niveusGuide;
CONTENT['bhop-guide'] = bhopGuide;
CONTENT['valera-guide'] = valeraGuide;
CONTENT['ak47-guide'] = ak47Guide;
CONTENT['shooting-guide'] = shootingGuide;
CONTENT['deagle-guide'] = deagleGuide;
CONTENT['full-guide'] = fullGuide;
CONTENT['secrets-guide'] = secretsGuide;

function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.nav a').forEach(function(a) { a.classList.remove('active'); });
  var el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function navigate(page, guideId) {
  var sub = document.getElementById('subHeader');
  var breadTitle = document.getElementById('breadTitle');
  var breadSep = document.getElementById('breadSepTitle');

  if (page === 'profile') {
    showPage('pageProfile');
    document.getElementById('nav-profile').classList.add('active');
    sub.classList.remove('visible');
    window.location.hash = '#profile';
  } else if (page === 'guides') {
    showPage('pageGuides');
    document.getElementById('nav-guides').classList.add('active');
    document.getElementById('breadGuidesLink').classList.add('current');
    sub.classList.add('visible');
    breadTitle.textContent = '';
    breadSep.style.display = 'none';
    renderList('guidesListFull');
    window.location.hash = '#guides';
  } else if (page === 'guide' && guideId && CONTENT[guideId]) {
    showPage('pageGuideView');
    document.getElementById('nav-guides').classList.add('active');
    document.getElementById('breadGuidesLink').classList.remove('current');
    window.scrollTo(0,0);
    document.getElementById('guideContent').innerHTML = CONTENT[guideId];
    var guide = GUIDE_DATA.find(function(g) { return g.id === guideId; });
    if (guide) {
      var goldSpan = document.querySelector('.guide-header-meta .meta-item.gold');
      if (goldSpan) {
        goldSpan.textContent = guide.rating + ' ' + guide.stars;
      }
      breadTitle.textContent = guide.title;
    }
    breadSep.style.display = 'inline';
    sub.classList.add('visible');
    window.location.hash = '#' + guideId;
    document.querySelectorAll('.back-to-guides').forEach(function(el) {
      el.onclick = function() { navigate('guides'); };
    });
    addCommentForm();
    addGuideReviews();
  }
}

function addCommentForm() {
  var existing = document.getElementById('fakeCommentForm');
  if (existing) existing.remove();
  var html = '<div id="fakeCommentForm" class="comment-section">'
    + '<h3>\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439</h3>'
    + '<div class="comment-row"><input class="comment-field" id="fakeNick" placeholder="\u0412\u0430\u0448 \u043d\u0438\u043a\u043d\u0435\u0439\u043c *" maxlength="32"></div>'
    + '<input class="comment-field" id="fakeEmail" placeholder="\u0412\u0430\u0448\u0430 \u043f\u043e\u0447\u0442\u0430 (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)" maxlength="64">'
    + '<textarea class="comment-field comment-textarea" id="fakeText" placeholder="\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439... *"></textarea>'
    + '<button class="comment-submit" id="fakeSubmit">\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c</button>'
    + '<div class="comment-error" id="fakeError"><span>\u274c \u041e\u0448\u0438\u0431\u043a\u0430 <span class="err-code" id="fakeErrCode">0</span>: \u0441\u0435\u0440\u0432\u0435\u0440 \u0432\u0440\u0435\u043c\u0435\u043d\u043d\u043e \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u043e\u0437\u0436\u0435.</span></div>'
    + '</div>';
  var guideContent = document.getElementById('guideContent');
  guideContent.insertAdjacentHTML('beforeend', html);
  document.getElementById('fakeSubmit').onclick = function() {
    document.getElementById('fakeError').style.display = 'block';
    document.getElementById('fakeErrCode').textContent = 'ERR_' + Math.floor(Math.random() * 9000000000 + 1000000000);
  };
}

function addGuideReviews() {
  var REVIEWS_BY_GUIDE = {
    'mirage-guide': [
      { author:'Vlados', text:'\u0410\u043d\u0442\u043e\u0445\u0430 \u043a\u0440\u0430\u0441\u0430\u0432\u0430 \u0434\u0430\u043b \u043d\u043e\u0440\u043c \u0433\u0430\u0438\u0434', stars:5, profanity:false, date:'7 \u0438\u044e\u043d 2026' },
      { author:'s1mple_fan', text:'\u041b\u0443\u0447\u0448\u0438\u0439 \u0433\u0430\u0439\u0434 \u043f\u043e \u043c\u0438\u0440\u0430\u0436\u0438\u043a\u0443. \u0420\u0430\u0437\u0431\u043e\u0440 \u043f\u043e\u0437\u0438\u0446\u0438\u0439 \u043a\u043e\u0441\u043c\u043e\u0441!', stars:5, profanity:false, date:'5 \u0438\u044e\u043d 2026' },
      { author:'pixel_clicker', text:'\u0445\u0443\u0439\u043d\u044f \u0430 \u043d\u0435 \u0433\u0430\u0439\u0434. \u043d\u0438\u0445\u0443\u044f \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442. \u0438\u0434\u0438 \u043d\u0430\u0445\u0443\u0439', stars:1, profanity:true, date:'30 \u043c\u0430\u0439 2026' },
      { author:'cs_teacher', text:'\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044e \u0434\u043b\u044f \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0438 \u0443\u0447\u0435\u043d\u0438\u043a\u043e\u0432. \u0412\u0441\u0451 \u0447\u0451\u0442\u043a\u043e.', stars:5, profanity:false, date:'28 \u043c\u0430\u0439 2026' },
      { author:'crybaby_228', text:'\u0447\u0435 \u0437\u0430 \u0431\u0440\u0435\u0434 \u0442\u044b \u043d\u0430\u043f\u0438\u0441\u0430\u043b?? \u043f\u0438\u0437\u0434\u0435\u0442\u044c \u043d\u0435 \u043c\u0435\u0448\u043a\u0438 \u0432\u043e\u0440\u043e\u0447\u0430\u0442\u044c', stars:1, profanity:true, date:'25 \u043c\u0430\u0439 2026' },
      { author:'mirage_main', text:'700 \u0447\u0430\u0441\u043e\u0432 \u043d\u0430 \u043c\u0438\u0440\u0430\u0436\u0435, \u0443\u0437\u043d\u0430\u043b \u043d\u043e\u0432\u044b\u0435 \u0444\u0438\u0448\u043a\u0438!', stars:5, profanity:false, date:'20 \u043c\u0430\u0439 2026' },
      { author:'ShadowLink_99', text:'Great guide for Mirage, helped a lot!', stars:4, profanity:false, date:'15 \u043c\u0430\u0439 2026' }
    ],
    'awp-guide': [
      { author:'awp_noob', text:'21 \u044d\u0442\u0430\u043f \u044d\u0442\u043e \u0436\u0435\u0441\u0442\u044c! \u0421\u0442\u0430\u043b \u043b\u0443\u0447\u0448\u0435 \u0438\u0433\u0440\u0430\u0442\u044c \u043d\u0430 AWP', stars:5, profanity:false, date:'1 \u0438\u044e\u043d 2026' },
      { author:'kennyS_fan', text:'\u042d\u0442\u0430\u043f \u043f\u0440\u043e \u0444\u043b\u0438\u043a\u0438 \u044d\u0442\u043e \u0438\u043c\u0431\u0430. \u0422\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u0430\u043b\u0441\u044f \u043d\u0435\u0434\u0435\u043b\u044e', stars:5, profanity:false, date:'25 \u043c\u0430\u0439 2026' },
      { author:'bot_aimer', text:'\u0434\u0430 \u0442\u044b \u0441\u0430\u043c \u0431\u043e\u0442 \u0435\u0431\u0430\u043d\u044b\u0439. \u043a\u043e\u0433\u043e \u0442\u044b \u0443\u0447\u0438\u0448\u044c? \u043f\u0438\u0437\u0434\u0435\u0446', stars:1, profanity:true, date:'22 \u043c\u0430\u0439 2026' },
      { author:'JohnWickCS', text:'Best AWP guide I have found. Stage 4-7 are gold!', stars:5, profanity:false, date:'18 \u043c\u0430\u0439 2026' },
      { author:'tox1c_mf', text:'\u0445\u0443\u0435\u0442\u0430 \u043f\u043e\u043b\u043d\u0430\u044f. \u0430\u0432\u0442\u043e\u0440 \u0435\u0431\u043b\u0430\u043d. \u0438\u0434\u0438 \u043d\u0430\u0445\u0443\u0439', stars:1, profanity:true, date:'15 \u043c\u0430\u0439 2026' },
      { author:'cs_old_school', text:'\u0418\u0433\u0440\u0430\u044e \u0441 1.6, \u0438 \u043c\u043d\u0435 \u0431\u044b\u043b\u043e \u043f\u043e\u043b\u0435\u0437\u043d\u043e. \u0410\u0432\u0442\u043e\u0440 \u0448\u0430\u0440\u0438\u0442.', stars:5, profanity:false, date:'10 \u043c\u0430\u0439 2026' }
    ],
    'niveus-guide': [
      { author:'champion_inc', text:'\u041b\u0443\u0447\u0448\u0438\u0439 \u0433\u0430\u0439\u0434 \u043f\u043e CS2. \u0420\u0430\u0437\u0431\u043e\u0440 \u043e\u0448\u0438\u0431\u043e\u043a \u0432 \u0442\u043e\u0447\u043a\u0443!', stars:5, profanity:false, date:'5 \u0438\u044e\u043d 2026' },
      { author:'\u0414\u043c\u0438\u0442\u0440\u0438\u0439_\u0422\u043e\u043f', text:'\u041f\u043e\u0434\u043d\u044f\u043b \u0440\u0430\u043d\u0433 \u043f\u043e\u0441\u043b\u0435 \u043f\u0440\u043e\u0447\u0442\u0435\u043d\u0438\u044f. \u0420\u0435\u0430\u043b\u044c\u043d\u043e \u043f\u043e\u043c\u043e\u0433\u043b\u043e!', stars:5, profanity:false, date:'30 \u043c\u0430\u0439 2026' },
      { author:'rage_gamer', text:'\u0437\u0430\u043b\u0443\u043f\u0430 \u043a\u0430\u043a\u0430\u044f-\u0442\u043e. 5 \u043c\u0438\u043d\u0443\u0442 \u0436\u0438\u0437\u043d\u0438 \u043f\u043e\u0442\u0440\u0430\u0442\u0438\u043b \u0437\u0440\u044f. \u0441\u043e\u0441\u0430\u0442\u044c', stars:1, profanity:true, date:'27 \u043c\u0430\u0439 2026' },
      { author:'toxic_no_more', text:'\u041f\u0435\u0440\u0435\u0441\u0442\u0430\u043b \u0442\u0438\u043b\u044c\u0442\u043e\u0432\u0430\u0442\u044c \u0438 \u043f\u043e\u0434\u043d\u044f\u043b\u0441\u044f \u0434\u043e LE. \u0421\u043f\u0430\u0441\u0438\u0431\u043e!', stars:5, profanity:false, date:'22 \u043c\u0430\u0439 2026' },
      { author:'no_skill', text:'\u0441\u0430\u043c\u044b\u0439 \u0442\u0443\u043f\u043e\u0439 \u0433\u0430\u0439\u0434. \u0430\u0432\u0442\u043e\u0440 \u0434\u043e\u043b\u0431\u043e\u0451\u0431. \u0437\u0430\u0447\u0435\u043c \u0432\u044b\u043b\u043e\u0436\u0438\u043b?', stars:1, profanity:true, date:'18 \u043c\u0430\u0439 2026' },
      { author:'eco_king', text:'\u041d\u0430\u043a\u043e\u043d\u0435\u0446 \u043f\u0440\u043e \u044d\u043a\u043e\u043d\u043e\u043c\u0438\u043a\u0443 \u043e\u0431\u044a\u044f\u0441\u043d\u0438\u043b\u0438 \u043d\u043e\u0440\u043c\u0430\u043b\u044c\u043d\u043e! \u0420\u0435\u0441\u043f\u0435\u043a\u0442!', stars:5, profanity:false, date:'12 \u043c\u0430\u0439 2026' }
    ],
    'bhop-guide': [
      { author:'bhop_lover', text:'\u041f\u043e\u043d\u044f\u043b \u043a\u0430\u043a \u0434\u0435\u043b\u0430\u0442\u044c \u0431\u0430\u043d\u0438\u0445\u043e\u043f! \u0422\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u0430\u043b\u0441\u044f 3 \u0434\u043d\u044f \u2014 \u043b\u0435\u0442\u0430\u044e!', stars:5, profanity:false, date:'3 \u0438\u044e\u043d 2026' },
      { author:'kz_runner', text:'\u0421\u043e\u0432\u0435\u0442 \u043f\u0440\u043e A \u0438 D \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442. \u041f\u0440\u043e\u0431\u043b\u0435\u043c\u0430 \u0431\u044b\u043b\u0430 \u0432 \u0441\u0438\u043d\u0445\u0440\u043e\u043d\u0438\u0437\u0430\u0446\u0438\u0438', stars:5, profanity:false, date:'28 \u043c\u0430\u0439 2026' },
      { author:'wasted_time', text:'11 \u043c\u0438\u043d\u0443\u0442 \u0436\u0438\u0437\u043d\u0438 \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043b \u044d\u0442\u043e\u0442 \u0448\u043b\u0430\u043a. \u0430\u0432\u0442\u043e\u0440 \u0438\u0434\u0438 \u043d\u0430\u0445\u0443\u0439', stars:1, profanity:true, date:'25 \u043c\u0430\u0439 2026' },
      { author:'movement_god', text:'\u0412\u0441\u0451 \u043f\u043e\u043d\u044f\u0442\u043d\u043e \u043e\u0431\u044a\u044f\u0441\u043d\u0438\u043b. \u041b\u0443\u0447\u0448\u0438\u0439 \u0433\u0430\u0439\u0434 \u043f\u043e bhop \u043d\u0430 \u0440\u0443\u0441\u0441\u043a\u043e\u043c!', stars:5, profanity:false, date:'15 \u043c\u0430\u0439 2026' },
      { author:'static_void', text:'\u0433\u0430\u0439\u0434 \u043a\u043e\u0440\u043e\u0442\u043a\u0438\u0439. \u043d\u0435 \u0445\u0432\u0430\u0442\u0438\u043b\u043e \u0441\u0441\u044b\u043b\u043e\u043a \u043d\u0430 \u043a\u0430\u0440\u0442\u044b \u0431\u043b\u044f\u0442\u044c', stars:2, profanity:true, date:'10 \u043c\u0430\u0439 2026' },
      { author:'cyber_hop', text:'7\u043a \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u043e\u0432 \u043d\u0435 \u043f\u0440\u043e\u0441\u0442\u043e \u0442\u0430\u043a. \u0417\u0430\u043a\u043e\u043d\u043e\u043c\u0435\u0440\u043d\u043e!', stars:5, profanity:false, date:'5 \u043c\u0430\u0439 2026' }
    ],
    'valera-guide': [
      { author:'\u041a\u0438\u0431\u0435\u0440\u041a\u043e\u0442', text:'\u041e\u0442\u043b\u0438\u0447\u043d\u043e\u0435 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e! \u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0440\u0435\u0430\u043b\u044c\u043d\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u044e\u0442!', stars:5, profanity:false, date:'1 \u0438\u044e\u043d 2026' },
      { author:'noob_to_pro', text:'\u041f\u043e\u0441\u0442\u0430\u0432\u0438\u043b 4:3 \u043a\u0430\u043a \u0441\u043a\u0430\u0437\u0430\u043d\u043e \u2014 \u0438\u0433\u0440\u0430\u0442\u044c \u0441\u0442\u0430\u043b\u043e \u043b\u0435\u0433\u0447\u0435!', stars:5, profanity:false, date:'28 \u043c\u0430\u0439 2026' },
      { author:'silver_master', text:'\u0442\u0438\u043f\u0438\u0447\u043d\u044b\u0439 \u0433\u0430\u0439\u0434 \u043e\u0442 \u043f\u0435\u0442\u0443\u0448\u0438\u043b\u044b. \u0438\u0434\u0438 \u043d\u0430\u0445\u0435\u0440', stars:1, profanity:true, date:'25 \u043c\u0430\u0439 2026' },
      { author:'ProPlayerOne', text:'Mental tips section is actually useful. Nice work!', stars:4, profanity:false, date:'20 \u043c\u0430\u0439 2026' },
      { author:'\u0422\u0440\u0435\u043d\u0435\u0440_CS', text:'\u041e\u0447\u0435\u043d\u044c \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439 \u043a\u043e\u043d\u0442\u0435\u043d\u0442. \u0410\u0432\u0442\u043e\u0440 \u0440\u0435\u0430\u043b\u044c\u043d\u043e \u0448\u0430\u0440\u0438\u0442!', stars:5, profanity:false, date:'15 \u043c\u0430\u0439 2026' },
      { author:'GabenFan', text:'Good guide for improving mental game. Recommended.', stars:4, profanity:false, date:'10 \u043c\u0430\u0439 2026' }
    ],
    'ak47-guide': [
      { author:'Xx_ProGamer_xX', text:'Spray pattern section is exactly what I needed!', stars:5, profanity:false, date:'2 \u0438\u044e\u043d 2026' },
      { author:'\u0422\u0440\u0435\u043d\u0435\u0440_CS', text:'\u0421\u043f\u0440\u0435\u0439 \u0410\u041a \u0440\u0430\u0441\u043f\u0438\u0441\u0430\u043d \u043e\u0442\u043b\u0438\u0447\u043d\u043e. \u0411\u0443\u0434\u0443 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f!', stars:5, profanity:false, date:'28 \u043c\u0430\u0439 2026' },
      { author:'\u0421\u0438\u043d\u0438\u0439_\u0427\u0438\u0442\u0435\u0440', text:'\u0431\u043e\u0442 \u0435\u0431\u0430\u043d\u044b\u0439 \u043d\u0430\u043f\u0438\u0441\u0430\u043b \u0433\u0430\u0439\u0434. \u043a\u043e\u0433\u043e \u0442\u044b \u0443\u0447\u0438\u0448\u044c \u043f\u0438\u0437\u0434\u0435\u0446', stars:1, profanity:true, date:'25 \u043c\u0430\u0439 2026' },
      { author:'noob_to_pro', text:'\u041a\u043e\u043d\u0442\u0440-\u0441\u0442\u0440\u0430\u0444 + \u0410\u041a = \u0438\u043c\u0431\u0430. \u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0433\u0430\u0439\u0434!', stars:4, profanity:false, date:'20 \u043c\u0430\u0439 2026' },
      { author:'pixel_clicker', text:'\u043d\u0438\u0445\u0443\u044f \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u044d\u0442\u043e\u0442 \u0441\u043f\u0440\u0435\u0439. \u0441\u0430\u043c \u0442\u044b \u0434\u043e\u043b\u0431\u043e\u0451\u0431', stars:1, profanity:true, date:'15 \u043c\u0430\u0439 2026' }
    ],
    'shooting-guide': [
      { author:'silver_4ever', text:'\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043f\u043e\u043d\u044f\u0442\u043d\u043e. \u0412\u0440\u0435\u043c\u044f \u043f\u043e\u0442\u0435\u0440\u044f\u043b \u0437\u0440\u044f.', stars:2, profanity:false, date:'1 \u0438\u044e\u043d 2026' },
      { author:'CS_Master', text:'\u0411\u0430\u0437\u043e\u0432\u044b\u0435 \u0432\u0435\u0449\u0438, \u043d\u043e \u0434\u043b\u044f \u043d\u043e\u0432\u0438\u0447\u043a\u043e\u0432 \u0441\u0430\u043c\u043e\u0435 \u0442\u043e!', stars:4, profanity:false, date:'28 \u043c\u0430\u0439 2026' },
      { author:'aimbot_off', text:'\u041d\u043e\u0440\u043c \u0433\u0430\u0439\u0434, \u043d\u043e \u043c\u043e\u0433\u043b\u043e \u0431\u044b\u0442\u044c \u0438 \u043b\u0443\u0447\u0448\u0435. \u041c\u0430\u043b\u043e \u043f\u0440\u0438\u043c\u0435\u0440\u043e\u0432.', stars:3, profanity:false, date:'20 \u043c\u0430\u0439 2026' },
      { author:'wasted_time69', text:'11 \u043c\u0438\u043d\u0443\u0442 \u0436\u0438\u0437\u043d\u0438 \u043f\u0440\u043e\u0447\u0438\u0442\u0430\u043b \u044d\u0442\u043e\u0442 \u0448\u043b\u0430\u043a. \u0430\u0432\u0442\u043e\u0440 \u0438\u0434\u0438 \u043d\u0430\u0445\u0443\u0439', stars:1, profanity:true, date:'15 \u043c\u0430\u0439 2026' },
      { author:'JohnWickCS', text:'Good fundamentals guide. Perfect for beginners!', stars:4, profanity:false, date:'10 \u043c\u0430\u0439 2026' }
    ],
    'deagle-guide': [
      { author:'JohnWickCS', text:'Deagle flick practice tips are amazing!', stars:5, profanity:false, date:'3 \u0438\u044e\u043d 2026' },
      { author:'bobrichok', text:'\u043d\u0430\u0439\u0441 +\u0440\u0435\u043f. \u0413\u0430\u0439\u0434 \u0440\u0435\u0430\u043b\u044c\u043d\u043e \u043f\u043e\u043c\u043e\u0433 \u0441 \u0434\u0438\u0433\u043b\u043e\u043c!', stars:5, profanity:false, date:'28 \u043c\u0430\u0439 2026' },
      { author:'toxic_mf', text:'\u0445\u0443\u0435\u0442\u0430 \u043f\u043e\u043b\u043d\u0430\u044f. \u0430\u0432\u0442\u043e\u0440 \u0435\u0431\u043b\u0430\u043d. \u0438\u0434\u0438 \u043d\u0430\u0445\u0443\u0439', stars:1, profanity:true, date:'25 \u043c\u0430\u0439 2026' },
      { author:'cs_teacher', text:'\u0425\u043e\u0440\u043e\u0448\u0430\u044f \u043c\u0435\u0442\u043e\u0434\u0438\u043a\u0430 \u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u043a\u0438. \u0411\u0443\u0434\u0443 \u043f\u0440\u0438\u043c\u0435\u043d\u044f\u0442\u044c.', stars:4, profanity:false, date:'18 \u043c\u0430\u0439 2026' },
      { author:'rage_quit_228', text:'\u0437\u0430\u043b\u0443\u043f\u0430 \u043a\u0430\u043a\u0430\u044f-\u0442\u043e. \u0441\u043e\u0441\u0430\u0442\u044c', stars:1, profanity:true, date:'12 \u043c\u0430\u0439 2026' }
    ],
    'full-guide': [
      { author:'CS_Master', text:'\u0421\u0430\u043c\u043e\u0435 \u043f\u043e\u043b\u043d\u043e\u0435 \u0440\u0443\u043a\u043e\u0432\u043e\u0434\u0441\u0442\u0432\u043e \u043f\u043e CS2! \u0422\u044b\u0441\u044f\u0447\u0430 \u0441\u043f\u0430\u0441\u0438\u0431\u043e!', stars:5, profanity:false, date:'1 \u0438\u044e\u043d 2026' },
      { author:'\u0414\u043c\u0438\u0442\u0440\u0438\u0439_\u0422\u043e\u043f', text:'\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 NVIDIA \u0440\u0435\u0430\u043b\u044c\u043d\u043e \u043f\u043e\u0434\u043d\u044f\u043b\u0438 FPS. \u041a\u0440\u0430\u0441\u0430\u0432\u0430!', stars:5, profanity:false, date:'28 \u043c\u0430\u0439 2026' },
      { author:'GabenFan', text:'The CFG section is incredibly detailed. Bookmarked!', stars:5, profanity:false, date:'25 \u043c\u0430\u0439 2026' },
      { author:'pixel_clicker', text:'\u0445\u0443\u0439\u043d\u044f \u0430 \u043d\u0435 \u0433\u0430\u0439\u0434. \u043d\u0438\u0445\u0443\u044f \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442. \u0438\u0434\u0438 \u043d\u0430\u0445\u0443\u0439', stars:1, profanity:true, date:'20 \u043c\u0430\u0439 2026' },
      { author:'\u0422\u0440\u0435\u043d\u0435\u0440_CS', text:'61\u043a \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u043e\u0432 \u043d\u0435 \u043f\u0440\u043e\u0441\u0442\u043e \u0442\u0430\u043a. \u0413\u0430\u0439\u0434 \u043b\u0435\u0433\u0435\u043d\u0434\u0430!', stars:5, profanity:false, date:'15 \u043c\u0430\u0439 2026' },
      { author:'crybaby_228', text:'\u043f\u0438\u0437\u0434\u0435\u0442\u044c \u043d\u0435 \u043c\u0435\u0448\u043a\u0438 \u0432\u043e\u0440\u043e\u0447\u0430\u0442\u044c. \u0443\u0434\u0430\u043b\u0438 \u0433\u0430\u0439\u0434 \u043f\u043e\u043a\u0430 \u043d\u0435 \u043f\u043e\u0437\u043e\u0440\u043d\u043e', stars:1, profanity:true, date:'10 \u043c\u0430\u0439 2026' }
    ],
    'secrets-guide': [
      { author:'s1mple_fan', text:'\u0421\u043e\u0432\u0435\u0442 \u043f\u0440\u043e \u0441\u0442\u043e\u0439\u043a\u0443 \u0438\u0437\u043c\u0435\u043d\u0438\u043b \u043c\u043e\u044e \u0438\u0433\u0440\u0443! \u0421\u043f\u0430\u0441\u0438\u0431\u043e!', stars:5, profanity:false, date:'2 \u0438\u044e\u043d 2026' },
      { author:'Xx_ProGamer_xX', text:'Checklist for headshots is now my pre-game routine!', stars:5, profanity:false, date:'28 \u043c\u0430\u0439 2026' },
      { author:'bot_aimer', text:'\u0441\u0430\u043c \u0442\u044b \u0431\u043e\u0442 \u0435\u0431\u0430\u043d\u044b\u0439. \u043a\u043e\u0433\u043e \u0442\u044b \u0443\u0447\u0438\u0448\u044c \u043d\u0430\u0432\u043e\u0434\u043a\u0435 \u043f\u0438\u0437\u0434\u0435\u0446', stars:1, profanity:true, date:'22 \u043c\u0430\u0439 2026' },
      { author:'cs_teacher', text:'\u041e\u0442\u043b\u0438\u0447\u043d\u044b\u0435 \u0441\u043e\u0432\u0435\u0442\u044b \u043f\u043e \u0434\u0438\u0441\u0442\u0430\u043d\u0446\u0438\u044f\u043c \u0441\u0442\u0440\u0435\u043b\u044c\u0431\u044b!', stars:4, profanity:false, date:'15 \u043c\u0430\u0439 2026' },
      { author:'no_skill_ever', text:'\u0441\u0430\u043c\u044b\u0439 \u0442\u0443\u043f\u043e\u0439 \u0433\u0430\u0439\u0434. \u0430\u0432\u0442\u043e\u0440 \u0434\u043e\u043b\u0431\u043e\u0451\u0431. \u0437\u0430\u0447\u0435\u043c \u0432\u044b\u043b\u043e\u0436\u0438\u043b?', stars:1, profanity:true, date:'10 \u043c\u0430\u0439 2026' },
      { author:'ShadowLink_99', text:'Spray control section clarified so much. Great work!', stars:4, profanity:false, date:'5 \u043c\u0430\u0439 2026' }
    ]
  };

  var existing = document.getElementById('dynamicGuideReviews');
  if (existing) existing.remove();

  var currentGuideId = window.location.hash.slice(1);
  var guideEntry = GUIDE_DATA.find(function(g) { return g.slug === currentGuideId || g.id === currentGuideId; });
  var reviews = REVIEWS_BY_GUIDE[currentGuideId] || REVIEWS_BY_GUIDE[guideEntry ? guideEntry.id : 'mirage-guide'];

  var stars = {5:'\u2605\u2605\u2605\u2605\u2605',4:'\u2605\u2605\u2605\u2605\u2606',3:'\u2605\u2605\u2605\u2606\u2606',2:'\u2605\u2605\u2606\u2606\u2606',1:'\u2605\u2606\u2606\u2606\u2606'};
  var html = '<div id="dynamicGuideReviews" class="guide-reviews"><h3>\u041e\u0442\u0437\u044b\u0432\u044b</h3>';
  for (var i = 0; i < reviews.length; i++) {
    var r = reviews[i];
    if (r.profanity) {
      html += '<div class="review-prof-wrap blurred"><div class="review-item"><div class="review-header"><span class="review-author">' + r.author + '</span><span class="review-rating">' + stars[r.stars] + '</span><span class="review-date">' + r.date + '</span></div><div class="review-text">' + r.text + '</div></div><div class="review-prof-overlay"><div class="warning-text">\u041e\u0442\u0437\u044b\u0432 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u0442 \u043d\u0435\u0446\u0435\u043d\u0437\u0443\u0440\u043d\u0443\u044e \u043b\u0435\u043a\u0441\u0438\u043a\u0443</div><button class="warning-btn" onclick="this.parentElement.parentElement.classList.remove(\'blurred\')">\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u044c \u043e\u0442\u0437\u044b\u0432</button></div></div>';
    } else {
      html += '<div class="review-item"><div class="review-header"><span class="review-author">' + r.author + '</span><span class="review-rating">' + stars[r.stars] + '</span><span class="review-date">' + r.date + '</span></div><div class="review-text">' + r.text + '</div></div>';
    }
  }
  html += '</div>';
  var guideBody = document.querySelector('.guide-body');
  if (guideBody) {
    var backBtn = guideBody.querySelector('.guide-back');
    if (backBtn) {
      backBtn.insertAdjacentHTML('beforebegin', html);
    } else {
      guideBody.insertAdjacentHTML('beforeend', html);
    }
  }
}

function renderList(containerId) {
  var container = document.getElementById(containerId);
  container.innerHTML = '';
  GUIDE_DATA.forEach(function(g) {
    var row = document.createElement('div');
    row.className = 'guide-row';
    row.innerHTML = '<div class="guide-row-img"><img src="' + g.preview + '" alt="..." loading="lazy"></div><div class="guide-row-info"><div class="guide-row-title">' + g.title + '</div><div class="guide-row-meta"><span>by \u0427\u0435\u043a\u0443\u043d\u0435\u0446</span><span class="dot">·</span><span>' + g.date + '</span><span class="dot">·</span><span>' + g.views + ' \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u043e\u0432</span><span class="dot">·</span><span class="rating">' + g.rating + ' ' + g.stars + '</span></div></div><div class="guide-row-arrow">\u2192</div>';
    row.onclick = function() { navigate('guide', g.id); };
    container.appendChild(row);
  });
}

function handleHash() {
  var h = window.location.hash.slice(1);
  if (!h || h === 'profile') { navigate('profile'); return; }
  if (h === 'guides') { navigate('guides'); return; }
  var found = GUIDE_DATA.find(function(g) { return g.slug === h; });
  if (found) { navigate('guide', found.id); return; }
  navigate('profile');
}

document.getElementById('logoBtn').onclick = function() { navigate('profile'); };
document.getElementById('nav-profile').onclick = function() { navigate('profile'); };
document.getElementById('nav-guides').onclick = function() { navigate('guides'); };
window.addEventListener('hashchange', handleHash);

document.getElementById('guidesCount').textContent = '(' + GUIDE_DATA.length + ')';
document.getElementById('profileCount').textContent = GUIDE_DATA.length;

renderList('guidesList');
renderList('guidesListFull');
handleHash();
