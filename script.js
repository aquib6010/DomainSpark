/* ============================================
   DomainSpark — Domain Generation Engine
   ============================================ */

// ---- Domain Generation Logic ----

const TLDS = ['.com', '.io', '.co', '.app', '.ai', '.dev', '.site', '.tech', '.xyz', '.me', '.org', '.net', '.online', '.store', '.club'];

const PREFIXES = ['go', 'get', 'try', 'use', 'my', 'the', 'hey', 'one', 'super', 'hyper', 'uber', 'top', 'peak', 'fast', 'snap', 'zen', 'neo', 'nova', 'prime', 'flux'];

const SUFFIXES = ['ly', 'ify', 'hub', 'lab', 'box', 'io', 'fy', 'oo', 'zy', 'er', 'ify', 'nest', 'base', 'stack', 'flow', 'wave', 'path', 'spot', 'dock', 'pad', 'hq', 'zone', 'land', 'verse', 'craft'];

const MODIFIERS = ['smart', 'swift', 'bright', 'bold', 'rapid', 'clear', 'next', 'pure', 'true', 'first', 'core', 'prime', 'blue', 'green', 'cloud', 'pixel', 'orbit', 'spark', 'dash', 'mint'];

// Industry-specific keywords that get blended in
const INDUSTRY_KEYWORDS = {
    all: [],
    tech: ['byte', 'code', 'dev', 'stack', 'sync', 'node', 'data', 'logic', 'algo', 'bit', 'wire', 'cyber', 'grid'],
    food: ['bite', 'taste', 'chef', 'yum', 'fresh', 'spice', 'plate', 'fork', 'feast', 'crave', 'munch', 'grill'],
    fashion: ['stitch', 'loom', 'drape', 'vogue', 'chic', 'luxe', 'glam', 'haute', 'silk', 'trend', 'style', 'wear'],
    health: ['heal', 'vita', 'pulse', 'care', 'well', 'fit', 'zen', 'glow', 'med', 'cure', 'life', 'bloom'],
    finance: ['coin', 'pay', 'fund', 'vault', 'ledger', 'cash', 'mint', 'wealth', 'fin', 'cap', 'equity', 'stake'],
    education: ['learn', 'tutor', 'quiz', 'skill', 'class', 'brain', 'study', 'wise', 'guru', 'academy', 'mind', 'teach'],
    travel: ['trip', 'roam', 'trek', 'wander', 'voyage', 'nomad', 'atlas', 'globe', 'drift', 'hop', 'trail', 'jet']
};

let selectedIndustry = 'all';

/**
 * Extract meaningful keywords from a business idea string
 */
function extractKeywords(idea) {
    const stopWords = new Set([
        'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'is', 'it', 'as', 'be', 'was', 'are',
        'that', 'this', 'which', 'who', 'what', 'where', 'when', 'how',
        'i', 'we', 'my', 'our', 'want', 'like', 'need', 'make', 'do',
        'app', 'website', 'platform', 'service', 'business', 'company',
        'online', 'digital', 'startup', 'based', 'about', 'will', 'can',
        'using', 'through', 'just', 'also', 'very', 'really', 'so', 'up'
    ]);

    return idea
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.has(word))
        .slice(0, 5);
}

/**
 * Generate a set of unique, brandable domain names
 */
function createDomainSuggestions(idea) {
    const keywords = extractKeywords(idea);
    if (keywords.length === 0) {
        keywords.push(idea.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8) || 'domain');
    }

    // Add industry-specific keywords
    const industryWords = INDUSTRY_KEYWORDS[selectedIndustry] || [];
    
    const domains = new Set();
    const results = [];

    function addDomain(name, tld, tag) {
        const domain = name + tld;
        if (!domains.has(domain) && name.length >= 3 && name.length <= 18) {
            domains.add(domain);
            results.push({ name, tld, tag, full: domain });
        }
    }

    const shuffled = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Strategy 1: Keyword + Suffix
    for (const keyword of shuffled(keywords).slice(0, 3)) {
        const suffix = pick(SUFFIXES);
        addDomain(keyword + suffix, pick(['.com', '.io', '.co']), 'Brandable');
    }

    // Strategy 2: Prefix + Keyword
    for (const keyword of shuffled(keywords).slice(0, 3)) {
        const prefix = pick(PREFIXES);
        addDomain(prefix + keyword, pick(['.com', '.io', '.app']), 'Short & Catchy');
    }

    // Strategy 3: Keyword blend (combine two keywords)
    if (keywords.length >= 2) {
        const pairs = [];
        for (let i = 0; i < keywords.length; i++) {
            for (let j = i + 1; j < keywords.length; j++) {
                pairs.push([keywords[i], keywords[j]]);
            }
        }
        for (const [a, b] of shuffled(pairs).slice(0, 3)) {
            addDomain(a + b, pick(TLDS), 'Creative');
        }
    }

    // Strategy 4: Modifier + Keyword
    for (const keyword of shuffled(keywords).slice(0, 2)) {
        const mod = pick(MODIFIERS);
        addDomain(mod + keyword, pick(['.com', '.io', '.co', '.ai']), 'Modern');
    }

    // Strategy 5: Keyword with trendy TLDs
    for (const keyword of shuffled(keywords).slice(0, 2)) {
        addDomain(keyword, pick(['.ai', '.dev', '.app', '.io']), 'Premium');
    }

    // Strategy 6: Truncated/abbreviated creativity
    for (const keyword of shuffled(keywords).slice(0, 2)) {
        const truncated = keyword.slice(0, Math.min(keyword.length, 5));
        const suffix = pick(['ly', 'fy', 'er', 'oo', 'zy']);
        addDomain(truncated + suffix, '.com', 'Startup Vibe');
    }

    // Strategy 7: Keyword + "hq" / "app"
    for (const keyword of shuffled(keywords).slice(0, 2)) {
        addDomain(keyword + pick(['hq', 'app', 'labs', 'works']), '.com', 'Professional');
    }

    // Strategy 8: Industry keyword + User keyword blend
    if (industryWords.length > 0) {
        for (const keyword of shuffled(keywords).slice(0, 3)) {
            const iWord = pick(industryWords);
            addDomain(keyword + iWord, pick(['.com', '.io', '.co']), 'Industry Pick');
            addDomain(iWord + keyword, pick(['.com', '.ai', '.app']), 'Industry Pick');
        }
    }

    // Shuffle and return top 10
    return shuffled([...results]).slice(0, 10);
}


// ---- Favorites (localStorage) ----

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem('domainspark_favorites') || '[]');
    } catch {
        return [];
    }
}

function saveFavorites(favs) {
    localStorage.setItem('domainspark_favorites', JSON.stringify(favs));
    updateFavCount();
    renderFavoritesPanel();
}

function toggleFavorite(domain) {
    let favs = getFavorites();
    const index = favs.indexOf(domain);
    if (index > -1) {
        favs.splice(index, 1);
    } else {
        favs.push(domain);
    }
    saveFavorites(favs);
    
    // Update heart button state in results grid
    const btns = document.querySelectorAll('.fav-btn');
    btns.forEach(btn => {
        if (btn.dataset.domain === domain) {
            if (favs.includes(domain)) {
                btn.classList.add('favorited');
                btn.textContent = '❤️';
            } else {
                btn.classList.remove('favorited');
                btn.textContent = '🤍';
            }
        }
    });
}

function isFavorited(domain) {
    return getFavorites().includes(domain);
}

function updateFavCount() {
    const count = getFavorites().length;
    const el = document.getElementById('fav-count');
    if (el) el.textContent = count;
}

function clearFavorites() {
    saveFavorites([]);
    document.querySelectorAll('.fav-btn').forEach(btn => {
        btn.classList.remove('favorited');
        btn.textContent = '🤍';
    });
}

function toggleFavorites() {
    const panel = document.getElementById('favorites-panel');
    panel.classList.toggle('visible');
    renderFavoritesPanel();
}

function renderFavoritesPanel() {
    const favs = getFavorites();
    const list = document.getElementById('favorites-list');
    const empty = document.getElementById('favorites-empty');

    if (favs.length === 0) {
        list.innerHTML = '';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    list.innerHTML = favs.map(domain => `
        <div class="fav-item">
            <span class="fav-item-name">${domain}</span>
            <div class="fav-item-actions">
                <a href="${getAffiliateLink(domain)}" target="_blank" rel="noopener" class="buy-btn" title="Buy on Namecheap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Buy
                </a>
                <button class="fav-remove-btn" onclick="removeFavorite('${domain}')">✕</button>
            </div>
        </div>
    `).join('');
}

function removeFavorite(domain) {
    let favs = getFavorites();
    favs = favs.filter(d => d !== domain);
    saveFavorites(favs);
    
    // Update heart buttons in grid
    document.querySelectorAll('.fav-btn').forEach(btn => {
        if (btn.dataset.domain === domain) {
            btn.classList.remove('favorited');
            btn.textContent = '🤍';
        }
    });
}


// ---- Affiliate Links ----

function getAffiliateLink(domain) {
    // Namecheap affiliate search link — replace YOUR_AFFILIATE_ID with your actual ID
    return `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(domain)}`;
}


// ---- Industry Selector ----

function selectIndustry(btn) {
    document.querySelectorAll('.industry-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    selectedIndustry = btn.dataset.industry;
    
    // Auto-regenerate if there's already an idea typed
    const idea = document.getElementById('idea-input').value.trim();
    if (idea && document.querySelectorAll('.domain-card').length > 0) {
        generateDomains();
    }
}


// ---- UI Logic ----

const ideaInput = document.getElementById('idea-input');
const generateBtn = document.getElementById('generate-btn');
const resultsGrid = document.getElementById('results-grid');
const resultsHeader = document.getElementById('results-header');
const resultsEmpty = document.getElementById('results-empty');
const copyToast = document.getElementById('copy-toast');

// Enter key triggers generation
ideaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        generateDomains();
    }
});

// Nav scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Initialize fav count on load
updateFavCount();

/**
 * Main generate function
 */
function generateDomains() {
    const idea = ideaInput.value.trim();
    if (!idea) {
        ideaInput.focus();
        ideaInput.classList.add('shake');
        setTimeout(() => ideaInput.classList.remove('shake'), 500);
        return;
    }

    // Loading state
    generateBtn.classList.add('loading');
    generateBtn.querySelector('.btn-text').textContent = 'Generating';

    // Simulate a brief processing delay for UX
    setTimeout(() => {
        const suggestions = createDomainSuggestions(idea);
        renderResults(suggestions);

        generateBtn.classList.remove('loading');
        generateBtn.querySelector('.btn-text').textContent = 'Generate';

        // Scroll to results
        document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
}

/**
 * Render domain suggestion cards
 */
function renderResults(suggestions) {
    resultsGrid.innerHTML = '';
    resultsHeader.classList.add('visible');
    resultsEmpty.classList.add('hidden');

    suggestions.forEach((domain, index) => {
        const card = document.createElement('div');
        card.className = 'domain-card';
        card.style.animationDelay = `${index * 0.06}s`;

        const nameParts = domain.name;
        const tld = domain.tld;
        const isFav = isFavorited(domain.full);

        card.innerHTML = `
            <div class="domain-info">
                <div class="domain-name">${nameParts}<span class="domain-tld">${tld}</span></div>
                <span class="domain-tag">${domain.tag}</span>
            </div>
            <div class="domain-actions">
                <button class="fav-btn ${isFav ? 'favorited' : ''}" data-domain="${domain.full}" onclick="toggleFavorite('${domain.full}')" title="Add to favorites">
                    ${isFav ? '❤️' : '🤍'}
                </button>
                <button class="copy-btn" id="copy-btn-${index}" onclick="copyDomain('${domain.full}', this)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    Copy
                </button>
                <a href="${getAffiliateLink(domain.full)}" target="_blank" rel="noopener" class="buy-btn" title="Check availability on Namecheap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Buy
                </a>
            </div>
        `;

        resultsGrid.appendChild(card);
    });
}

/**
 * Copy domain to clipboard and show toast
 */
function copyDomain(domain, btn) {
    navigator.clipboard.writeText(domain).then(() => {
        // Button feedback
        btn.classList.add('copied');
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copied!
        `;

        // Show toast
        showToast();

        // Reset button after 2s
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy
            `;
        }, 2000);
    });
}

/**
 * Show toast notification
 */
let toastTimeout;
function showToast() {
    clearTimeout(toastTimeout);
    copyToast.classList.add('show');
    toastTimeout = setTimeout(() => {
        copyToast.classList.remove('show');
    }, 2500);
}

// Add shake animation dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-6px); }
        40% { transform: translateX(6px); }
        60% { transform: translateX(-4px); }
        80% { transform: translateX(4px); }
    }
    .shake {
        animation: shake 0.4s ease-in-out;
    }
`;
document.head.appendChild(shakeStyle);
