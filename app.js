// NEW88 - Multi-Platform App Store Style
document.addEventListener('DOMContentLoaded', () => {
    console.log('NEW88 App initialized');

    // Check if running in standalone mode (app installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true;

    if (isStandalone) {
        console.log('🚀 App running in standalone mode - Auto redirecting to game...');

        // Show loading screen
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 999999;
            ">
                <img src="icon-192.png" alt="NEW88" style="
                    width: 120px;
                    height: 120px;
                    border-radius: 24px;
                    margin-bottom: 24px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                ">
                <h2 style="
                    color: white;
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 16px;
                    text-align: center;
                ">NEW88</h2>
                <p style="
                    color: rgba(255,255,255,0.9);
                    font-size: 16px;
                    margin-bottom: 32px;
                ">Đang khởi động...</p>
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <style>
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;

        // Redirect after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'https://m.new88ok1.com';
        }, 1500);

        return; // Stop initialization
    }

    // Normal mode (browser) - continue with regular initialization
    console.log('Browser mode - showing install page');

    // Detect device and show appropriate layout
    detectDeviceAndShowLayout();

    // Initialize features
    initCarousel();
    initButtons();
    initScrollAnimations();
    initNotifications();
});

// Detect Device and Show Layout
function detectDeviceAndShowLayout() {
    const iosLayout = document.getElementById('ios-layout');
    const androidLayout = document.getElementById('android-layout');

    if (isIOS()) {
        // Show iOS App Store layout
        iosLayout.style.display = 'block';
        androidLayout.style.display = 'none';
        document.body.classList.add('ios-style');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f2f2f7');
        console.log('Using iOS App Store layout');
    } else {
        // Show Android Play Store layout (Android + Desktop)
        iosLayout.style.display = 'none';
        androidLayout.style.display = 'block';
        document.body.classList.add('android-style');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#01875f');
        console.log('Using Android Play Store layout');
    }
}

// Carousel with Dots Indicator
function initCarousel() {
    // Handle iOS carousel
    const carouselIOS = document.getElementById('carouselIOS');
    const dotsIOS = document.querySelectorAll('#carouselDotsIOS .dot');

    if (carouselIOS && dotsIOS.length > 0) {
        initCarouselForElement(carouselIOS, dotsIOS);
    }

    // Android carousel (promo section) - auto-scroll only
    const promoSection = document.querySelector('.promo-section');
    if (promoSection && !isIOS()) {
        initPromoAutoScroll(promoSection);
    }
}

function initCarouselForElement(carousel, dots) {
    if (!carousel || !dots || dots.length === 0) return;

    // Update active dot on scroll
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.querySelector('.promo-card').offsetWidth + 12; // card width + gap
        const activeIndex = Math.round(scrollLeft / cardWidth);

        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });

    // Click on dot to scroll
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = carousel.querySelector('.promo-card').offsetWidth + 12;
            carousel.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        });
    });

    // Auto-scroll carousel
    let autoScrollInterval;
    let isUserScrolling = false;

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            if (!isUserScrolling) {
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                const currentScroll = carousel.scrollLeft;
                const cardWidth = carousel.querySelector('.promo-card').offsetWidth + 12;

                if (currentScroll >= maxScroll - 10) {
                    // Reset to beginning
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }
        }, 4000);
    };

    // Detect user scrolling
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 1500);
    });

    startAutoScroll();
}

// Initialize Promo Auto-scroll for Android
function initPromoAutoScroll(promoSection) {
    let isUserScrolling = false;

    const autoScroll = setInterval(() => {
        if (!isUserScrolling && promoSection) {
            const maxScroll = promoSection.scrollWidth - promoSection.clientWidth;
            const currentScroll = promoSection.scrollLeft;

            if (currentScroll >= maxScroll - 10) {
                promoSection.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                promoSection.scrollBy({ left: 300, behavior: 'smooth' });
            }
        }
    }, 3000);

    let scrollTimeout;
    promoSection.addEventListener('scroll', () => {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 1000);
    });
}

// Button Handlers
function initButtons() {
    // iOS buttons
    const getBtn = document.getElementById('getBtn');
    const shareBtnIOS = document.getElementById('shareBtnIOS');
    const seeAllBtn = document.querySelector('.see-all-btn');

    // Android buttons
    const installBtnAndroid = document.getElementById('installBtnAndroid');
    const shareBtnAndroid = document.getElementById('shareBtnAndroid');
    const favoriteBtnAndroid = document.getElementById('favoriteBtnAndroid');
    const helpfulButtons = document.querySelectorAll('.helpful-btn');

    // iOS Get button
    if (getBtn) {
        // Check if already installed
        checkAndUpdateGetButton(getBtn);

        getBtn.addEventListener('click', handleGet);
    }

    // Share buttons (both iOS and Android)
    if (shareBtnIOS) {
        shareBtnIOS.addEventListener('click', handleShare);
    }
    if (shareBtnAndroid) {
        shareBtnAndroid.addEventListener('click', handleShare);
    }

    // Android Install button
    if (installBtnAndroid) {
        // Check if already installed
        checkAndUpdateInstallButton(installBtnAndroid);

        installBtnAndroid.addEventListener('click', handleAndroidInstallClick);
    }

    // Android Favorite button
    if (favoriteBtnAndroid) {
        favoriteBtnAndroid.addEventListener('click', handleFavorite);
    }

    // Helpful buttons (Android)
    helpfulButtons.forEach(btn => {
        btn.addEventListener('click', (e) => handleHelpful(e));
    });

    // See all button (iOS)
    if (seeAllBtn) {
        seeAllBtn.addEventListener('click', () => {
            showNotification('Xem tất cả', 'Hiển thị tất cả đánh giá');
        });
    }

    // See details button (Android)
    const seeDetailsBtn = document.querySelector('.see-details-btn');
    if (seeDetailsBtn) {
        seeDetailsBtn.addEventListener('click', () => {
            showNotification('Chi tiết', 'Thông tin an toàn dữ liệu chi tiết');
        });
    }
}

// Check and Update Install Button
function checkAndUpdateInstallButton(btn) {
    // Check if running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true;

    // Check localStorage for installed state
    const wasInstalled = localStorage.getItem('pwaInstalled') === 'true';

    if (isStandalone || wasInstalled) {
        // App is already installed - change button to "CHƠI NGAY"
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            CHƠI NGAY
        `;
        btn.style.background = 'linear-gradient(135deg, #34C759 0%, #30D158 100%)';
        btn.dataset.installed = 'true';
    } else {
        // Not installed yet - keep install button
        btn.dataset.installed = 'false';
    }
}

// Android Install Click Handler
function handleAndroidInstallClick() {
    const btn = document.getElementById('installBtnAndroid');

    console.log('Button clicked, installed state:', btn.dataset.installed);

    // Check if already installed
    if (btn.dataset.installed === 'true') {
        console.log('App installed, redirecting to game...');
        // Show loading state
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
            </svg>
            Đang tải...
        `;
        btn.disabled = true;

        // Redirect to game URL
        setTimeout(() => {
            window.location.href = 'https://m.new88ok1.com';
        }, 500);
        return;
    }

    // Not installed - proceed with install
    console.log('Starting install process...');
    handleAndroidInstall(btn);
}

// Favorite Handler
function handleFavorite() {
    const btn = document.getElementById('favoriteBtnAndroid');
    const svg = btn.querySelector('svg');

    // Toggle favorite state
    const isFavorited = btn.classList.toggle('favorited');

    if (isFavorited) {
        // Filled heart
        svg.innerHTML = '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#01875f"/>';
        btn.style.background = '#e8f5e9';
        showNotification('Đã thêm yêu thích', 'NEW88 đã được thêm vào danh sách yêu thích');
    } else {
        // Outline heart
        svg.innerHTML = '<path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" fill="#01875f"/>';
        btn.style.background = 'white';
        showNotification('Đã xóa yêu thích', 'NEW88 đã được xóa khỏi danh sách yêu thích');
    }
}

// Helpful Review Handler
function handleHelpful(e) {
    const btn = e.target;
    const isYes = btn.textContent === 'Có';

    // Animate button
    btn.style.background = '#e8f5e9';
    btn.style.borderColor = '#01875f';
    btn.style.transform = 'scale(1.1)';

    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);

    // Show feedback
    const message = isYes ? 'Cảm ơn phản hồi của bạn!' : 'Đã ghi nhận ý kiến của bạn';
    showNotification('Phản hồi', message);
}

// Check and Update GET Button (iOS)
function checkAndUpdateGetButton(btn) {
    // Check if running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true;

    // Check localStorage for installed state
    const wasInstalled = localStorage.getItem('pwaInstalled') === 'true';

    if (isStandalone || wasInstalled) {
        // App is already installed - change button to "CHƠI"
        btn.textContent = 'CHƠI';
        btn.style.background = 'linear-gradient(135deg, #34C759 0%, #30D158 100%)';
        btn.style.color = 'white';
        btn.dataset.installed = 'true';
    } else {
        // Not installed yet - keep GET button
        btn.dataset.installed = 'false';
    }
}

// Get Button Handler (iOS style)
function handleGet() {
    const btn = document.getElementById('getBtn');

    console.log('GET button clicked, installed state:', btn.dataset.installed);

    // Check if already installed
    if (btn.dataset.installed === 'true') {
        console.log('App installed, redirecting to game...');
        // Show loading state
        btn.textContent = 'Đang tải...';
        btn.disabled = true;

        // Redirect to game URL
        setTimeout(() => {
            window.location.href = 'https://m.new88ok1.com';
        }, 500);
        return;
    }

    // Haptic feedback (if supported)
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }

    // Check if iOS
    if (isIOS()) {
        // Show iOS install instructions
        showIOSInstallInstructions();
    } else {
        // Android or other browsers - try PWA install
        handleAndroidInstall(btn);
    }
}

// Show iOS Install Instructions
function showIOSInstallInstructions() {
    const iosInfo = getIOSInfo();

    // Check if already installed
    if (iosInfo.isStandalone) {
        showNotification('Đã cài đặt', 'Ứng dụng đã được thêm vào màn hình chính');
        return;
    }

    // Check if not Safari
    const notSafariWarning = !iosInfo.isSafari ? `
        <div style="
            background: linear-gradient(135deg, #FF3B30 0%, #FF6B6B 100%);
            color: white;
            padding: 18px;
            border-radius: 12px;
            margin-bottom: 20px;
            font-size: 15px;
            line-height: 1.6;
            box-shadow: 0 4px 16px rgba(255,59,48,0.4);
        ">
            <div style="font-weight: 700; font-size: 17px; margin-bottom: 10px;">🚫 KHÔNG THỂ CÀI ĐẶT</div>
            <div style="margin-bottom: 8px;">Bạn đang dùng <strong>Chrome/Firefox</strong> hoặc trình duyệt khác.</div>
            <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; margin-top: 12px;">
                <div style="font-weight: 700; margin-bottom: 6px;">✅ GIẢI PHÁP:</div>
                <div>1. Sao chép link này</div>
                <div>2. Mở bằng <strong>Safari</strong></div>
                <div>3. Làm theo hướng dẫn bên dưới</div>
            </div>
        </div>
    ` : `
        <div style="
            background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
            color: white;
            padding: 16px;
            border-radius: 12px;
            margin-bottom: 24px;
            font-size: 15px;
            line-height: 1.6;
            box-shadow: 0 4px 12px rgba(255,107,107,0.3);
        ">
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">⚠️ QUAN TRỌNG</div>
            <div>Mục <strong>"Add to Home Screen"</strong> thường bị ẨN ở phía dưới menu Share.</div>
            <div style="margin-top: 8px; font-weight: 600;">👉 Bạn phải CUỘN XUỐNG trong menu để tìm!</div>
        </div>
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.6);
        z-index: 10000;
        display: flex;
        align-items: flex-end;
        animation: fadeIn 0.3s ease-out;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px 20px 0 0;
            padding: 30px 20px 40px 20px;
            width: 100%;
            max-height: 75vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease-out;
        ">
            <div style="text-align: center; margin-bottom: 24px;">
                <img src="icon-192.png" alt="NEW88" style="width: 80px; height: 80px; border-radius: 18px; margin-bottom: 16px;">
                <h2 style="font-size: 22px; font-weight: 700; color: #000; margin-bottom: 8px;">Cài đặt ứng dụng</h2>
                <p style="font-size: 15px; color: #666;">Thêm NEW88 vào màn hình chính</p>
            </div>

            ${notSafariWarning}

            <div style="padding: 0 8px;">
                <!-- Step 1 -->
                <div style="display: flex; align-items: flex-start; margin-bottom: 28px;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 700;
                        font-size: 18px;
                        flex-shrink: 0;
                        margin-right: 14px;
                        box-shadow: 0 4px 8px rgba(102,126,234,0.3);
                    ">1</div>
                    <div style="flex: 1; padding-top: 6px;">
                        <p style="font-size: 17px; line-height: 1.6; color: #000; font-weight: 500;">
                            Nhấn nút <strong>Share</strong>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="#007AFF" style="vertical-align: middle; margin: 0 4px;">
                                <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .9 2 2z"/>
                            </svg>
                            ở thanh địa chỉ Safari
                        </p>
                        <p style="font-size: 14px; color: #666; margin-top: 6px;">
                            (Nút mũi tên hướng lên ở góc trên hoặc thanh dưới)
                        </p>
                    </div>
                </div>

                <!-- Step 2 - Critical -->
                <div style="display: flex; align-items: flex-start; margin-bottom: 28px;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 700;
                        font-size: 18px;
                        flex-shrink: 0;
                        margin-right: 14px;
                        box-shadow: 0 4px 8px rgba(102,126,234,0.3);
                    ">2</div>
                    <div style="flex: 1; padding-top: 6px;">
                        <p style="font-size: 17px; line-height: 1.6; color: #000; font-weight: 600; margin-bottom: 10px;">
                            <span style="background: #FFE066; padding: 2px 6px; border-radius: 4px;">CUỘN XUỐNG</span> trong menu Share
                        </p>
                        <p style="font-size: 15px; line-height: 1.6; color: #333;">
                            Tìm và nhấn vào:
                        </p>
                        <div style="
                            background: #f8f9fa;
                            border: 2px solid #007AFF;
                            border-radius: 10px;
                            padding: 12px;
                            margin-top: 10px;
                            display: flex;
                            align-items: center;
                            gap: 10px;
                        ">
                            <span style="
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                width: 28px;
                                height: 28px;
                                border: 2px solid #007AFF;
                                border-radius: 7px;
                                font-size: 20px;
                                font-weight: 400;
                                color: #007AFF;
                            ">+</span>
                            <strong style="font-size: 16px; color: #007AFF;">Add to Home Screen</strong>
                        </div>
                        <p style="font-size: 13px; color: #FF6B6B; margin-top: 8px; font-weight: 600;">
                            ⚠️ Nếu không thấy, tiếp tục cuộn xuống! Nó thường ở dưới cùng.
                        </p>
                    </div>
                </div>

                <!-- Step 3 -->
                <div style="display: flex; align-items: flex-start; margin-bottom: 20px;">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 700;
                        font-size: 18px;
                        flex-shrink: 0;
                        margin-right: 14px;
                        box-shadow: 0 4px 8px rgba(102,126,234,0.3);
                    ">3</div>
                    <div style="flex: 1; padding-top: 6px;">
                        <p style="font-size: 17px; line-height: 1.6; color: #000; font-weight: 500;">
                            Nhấn nút <strong style="color: #007AFF;">"Add"</strong> ở góc trên phải
                        </p>
                        <p style="font-size: 14px; color: #666; margin-top: 6px;">
                            App sẽ xuất hiện trên màn hình chính
                        </p>
                    </div>
                </div>
            </div>

            ${!iosInfo.isSafari ? `
                <!-- Copy Link Button for non-Safari browsers -->
                <div style="padding: 0 8px; margin-top: 24px;">
                    <button id="copyLinkBtn" style="
                        width: 100%;
                        padding: 16px;
                        background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-size: 17px;
                        font-weight: 600;
                        cursor: pointer;
                        box-shadow: 0 4px 12px rgba(0,122,255,0.4);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    ">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                        </svg>
                        Sao chép Link và mở bằng Safari
                    </button>
                </div>
            ` : ''}

            <!-- Close hint -->
            <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                <p style="font-size: 14px; color: #999;">Chạm bên ngoài để đóng</p>
                <div style="
                    width: 40px;
                    height: 5px;
                    background: #d1d1d6;
                    border-radius: 3px;
                    margin: 12px auto 0;
                "></div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Copy link button (only for non-Safari browsers)
    if (!iosInfo.isSafari) {
        const copyBtn = document.getElementById('copyLinkBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    copyBtn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                        </svg>
                        Đã sao chép! Giờ mở bằng Safari
                    `;
                    copyBtn.style.background = 'linear-gradient(135deg, #34C759 0%, #30D158 100%)';

                    // Show system notification
                    showNotification('Đã sao chép link', 'Mở Safari và dán link để cài đặt');

                    setTimeout(() => {
                        modal.remove();
                    }, 2000);
                } catch (error) {
                    // Fallback for older iOS
                    const input = document.createElement('input');
                    input.value = window.location.href;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);

                    copyBtn.textContent = '✓ Đã sao chép!';
                    showNotification('Đã sao chép link', 'Mở Safari và dán link để cài đặt');
                }
            });
        }
    }

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Handle Android Install
async function handleAndroidInstall(btn) {
    const originalText = btn.textContent;

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
        showNotification('Đã cài đặt', 'Ứng dụng đã được thêm vào màn hình chính');
        return;
    }

    // Try to use deferred prompt
    if (deferredPrompt) {
        btn.textContent = '⏳';
        btn.disabled = true;
        btn.style.opacity = '0.6';

        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                // IMMEDIATELY set installed state to prevent re-clicks
                btn.dataset.installed = 'true';
                // Save to localStorage so it persists across browser sessions
                localStorage.setItem('pwaInstalled', 'true');

                // Show success checkmark
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                    Đang cài đặt...
                `;
                btn.style.background = 'linear-gradient(135deg, #34C759 0%, #30D158 100%)';
                btn.style.boxShadow = '0 4px 16px rgba(52,199,89,0.4)';
                btn.disabled = true; // Keep disabled until ready

                // Wait for app to finish installing
                setTimeout(() => {
                    // Change to "CHƠI NGAY" button
                    btn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        CHƠI NGAY
                    `;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.background = 'linear-gradient(135deg, #34C759 0%, #30D158 100%)';

                    showNotification('Cài đặt thành công!', 'Nhấn CHƠI NGAY để bắt đầu');
                }, 2000);
            } else {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }

            deferredPrompt = null;
        } catch (error) {
            console.error('Install error:', error);
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    } else {
        // No deferred prompt - just show notification
        showNotification('Cài đặt ứng dụng', 'Nhấn menu (⋮) → Thêm vào màn hình chính');

        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
    }
}

// Browser detection - REMOVED (not needed)
// Android install instructions - REMOVED (not needed)

// Share Handler (iOS style)
async function handleShare() {
    const shareData = {
        title: 'NEW88 - OKVIP ALIANCE',
        text: 'Tải app NEW88 ngay! Đăng ký nhận 58K miễn phí!',
        url: window.location.href
    };

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate([10, 50, 10]);
    }

    try {
        if (navigator.share) {
            await navigator.share(shareData);
            showNotification('Đã chia sẻ', 'Cảm ơn bạn đã chia sẻ NEW88!');
        } else {
            // Fallback: Copy to clipboard
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(shareData.url);
                showNotification('Đã sao chép', 'Link đã được sao chép');
            } else {
                showIOSActionSheet(shareData);
            }
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Share error:', error);
        }
    }
}

// iOS Action Sheet (Fallback)
function showIOSActionSheet(shareData) {
    const sheet = document.createElement('div');
    sheet.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        border-radius: 16px 16px 0 0;
        padding: 20px;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideUp 0.3s ease-out;
    `;

    sheet.innerHTML = `
        <style>
            @keyframes slideUp {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
            }
        </style>
        <div style="text-align: center; margin-bottom: 16px;">
            <div style="width: 36px; height: 5px; background: #d1d1d6; border-radius: 3px; margin: 0 auto;"></div>
        </div>
        <div style="font-size: 13px; color: #8e8e93; text-align: center; margin-bottom: 16px;">Chia sẻ</div>
        <div style="font-size: 15px; margin-bottom: 16px; word-break: break-all;">${shareData.url}</div>
        <button id="copyBtn" style="width: 100%; padding: 16px; background: #007AFF; color: white; border: none; border-radius: 12px; font-size: 17px; font-weight: 600; margin-bottom: 12px;">
            Sao chép Link
        </button>
        <button id="cancelBtn" style="width: 100%; padding: 16px; background: #f2f2f7; color: #007AFF; border: none; border-radius: 12px; font-size: 17px; font-weight: 600;">
            Hủy
        </button>
    `;

    document.body.appendChild(sheet);

    // Add backdrop
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.4);
        z-index: 9999;
        animation: fadeIn 0.3s;
    `;
    document.body.appendChild(backdrop);

    // Handle buttons
    document.getElementById('copyBtn').addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(shareData.url);
            showNotification('Đã sao chép', 'Link đã được sao chép');
        } catch (error) {
            // Manual copy
            const input = document.createElement('input');
            input.value = shareData.url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            showNotification('Đã sao chép', 'Link đã được sao chép');
        }
        closeSheet();
    });

    document.getElementById('cancelBtn').addEventListener('click', closeSheet);
    backdrop.addEventListener('click', closeSheet);

    function closeSheet() {
        sheet.style.animation = 'slideUp 0.3s ease-out reverse';
        backdrop.style.animation = 'fadeIn 0.3s reverse';
        setTimeout(() => {
            sheet.remove();
            backdrop.remove();
        }, 300);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.section-container, .info-grid, .reviews-list');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(section);
    });

    // Animate rating bars on scroll
    const ratingBars = document.querySelectorAll('.bar-fill-ios');
    const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);

    ratingBars.forEach(bar => {
        barsObserver.observe(bar);
    });
}

// Notifications
function initNotifications() {
    // Check if we should show notification permission prompt
    const notificationAsked = localStorage.getItem('notificationAsked');

    if ('Notification' in window && Notification.permission === 'default' && !notificationAsked) {
        // Show notification permission prompt after a short delay
        setTimeout(() => {
            showNotificationPermissionModal();
        }, 2000);
    } else if ('Notification' in window && Notification.permission === 'granted') {
        console.log('✅ Notification permission granted');
    }
}

// Show Notification Permission Modal
function showNotificationPermissionModal() {
    const modal = document.createElement('div');
    modal.id = 'notificationPermissionModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.85);
        z-index: 20000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease-out;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 32px 24px;
            max-width: 380px;
            width: 100%;
            text-align: center;
            animation: scaleIn 0.3s ease-out;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        ">
            <!-- Icon -->
            <div style="
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
                background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 24px rgba(255,107,107,0.4);
            ">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
                </svg>
            </div>

            <!-- Title -->
            <h2 style="
                font-size: 24px;
                font-weight: 700;
                color: #000;
                margin-bottom: 12px;
                line-height: 1.3;
            ">Cho phép thông báo</h2>

            <!-- Description -->
            <p style="
                font-size: 16px;
                color: #666;
                line-height: 1.6;
                margin-bottom: 24px;
            ">
                Nhận thông báo về các khuyến mãi, sự kiện và phần thưởng hấp dẫn từ NEW88
            </p>

            <!-- Benefits -->
            <div style="
                background: #f8f9fa;
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 24px;
                text-align: left;
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="
                        width: 32px;
                        height: 32px;
                        background: linear-gradient(135deg, #34C759 0%, #30D158 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    ">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                        </svg>
                    </div>
                    <span style="font-size: 15px; color: #333;">Khuyến mãi độc quyền</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <div style="
                        width: 32px;
                        height: 32px;
                        background: linear-gradient(135deg, #34C759 0%, #30D158 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    ">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                        </svg>
                    </div>
                    <span style="font-size: 15px; color: #333;">Sự kiện đặc biệt</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="
                        width: 32px;
                        height: 32px;
                        background: linear-gradient(135deg, #34C759 0%, #30D158 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    ">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                        </svg>
                    </div>
                    <span style="font-size: 15px; color: #333;">Phần thưởng nóng hổi</span>
                </div>
            </div>

            <!-- Buttons -->
            <button id="allowNotificationBtn" style="
                width: 100%;
                padding: 16px;
                background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 17px;
                font-weight: 700;
                cursor: pointer;
                margin-bottom: 12px;
                box-shadow: 0 4px 16px rgba(255,107,107,0.4);
                transition: transform 0.2s;
            " onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">
                Cho phép thông báo
            </button>

            <button id="denyNotificationBtn" style="
                width: 100%;
                padding: 14px;
                background: transparent;
                color: #999;
                border: none;
                border-radius: 12px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
            ">
                Để sau
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Allow button
    document.getElementById('allowNotificationBtn').addEventListener('click', async () => {
        try {
            const permission = await Notification.requestPermission();
            localStorage.setItem('notificationAsked', 'true');

            if (permission === 'granted') {
                console.log('✅ Notification permission granted');

                // Show success feedback
                modal.querySelector('div > div').innerHTML = `
                    <div style="padding: 40px 0;">
                        <div style="
                            width: 80px;
                            height: 80px;
                            margin: 0 auto 20px;
                            background: linear-gradient(135deg, #34C759 0%, #30D158 100%);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            animation: scaleIn 0.3s ease-out;
                        ">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                            </svg>
                        </div>
                        <h2 style="font-size: 24px; font-weight: 700; color: #34C759; margin-bottom: 12px;">
                            Hoàn tất!
                        </h2>
                        <p style="font-size: 16px; color: #666;">
                            Bạn sẽ nhận được thông báo về các ưu đãi mới nhất
                        </p>
                    </div>
                `;

                // Send a welcome notification via service worker
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification('NEW88 - Chào mừng! 🎉', {
                            body: 'Đăng ký ngay để nhận 58K cược miễn phí!',
                            icon: '/icon-192.png',
                            badge: '/icon-192.png',
                            vibrate: [200, 100, 200],
                            tag: 'welcome',
                            requireInteraction: false
                        });
                    });
                }

                setTimeout(() => {
                    modal.style.animation = 'fadeIn 0.3s ease-out reverse';
                    setTimeout(() => modal.remove(), 300);
                }, 2000);
            } else {
                localStorage.setItem('notificationAsked', 'true');
                modal.style.animation = 'fadeIn 0.3s ease-out reverse';
                setTimeout(() => modal.remove(), 300);
            }
        } catch (error) {
            console.error('Notification permission error:', error);
            localStorage.setItem('notificationAsked', 'true');
            modal.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => modal.remove(), 300);
        }
    });

    // Deny button
    document.getElementById('denyNotificationBtn').addEventListener('click', () => {
        localStorage.setItem('notificationAsked', 'true');
        modal.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => modal.remove(), 300);
    });
}

function showNotification(title, body) {
    // iOS-style notification (in-app)
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        color: white;
        padding: 14px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        z-index: 10001;
        max-width: 90%;
        animation: slideDown 0.3s ease-out;
        font-size: 15px;
    `;

    notification.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 2px;">${title}</div>
        <div style="font-size: 13px; opacity: 0.85;">${body}</div>
    `;

    // Add animation style
    if (!document.getElementById('notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }

    // Remove after 2.5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2500);
}

// Detect iOS and get version
function getIOSInfo() {
    const ua = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) ||
                       (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (!isIOSDevice) {
        return { isIOS: false, version: null, isSafari: false, isStandalone: false };
    }

    // Check if running in Safari
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|mercury|Chrome|Firefox|Opera/.test(ua);

    // Check if already installed (running in standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true;

    // Extract iOS version
    let version = null;
    const versionMatch = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (versionMatch) {
        version = {
            major: parseInt(versionMatch[1]),
            minor: parseInt(versionMatch[2] || 0),
            patch: parseInt(versionMatch[3] || 0),
            full: `${versionMatch[1]}.${versionMatch[2] || 0}${versionMatch[3] ? '.' + versionMatch[3] : ''}`
        };
    } else {
        // Fallback for iPad on desktop mode (iPadOS 13+)
        const ipadMatch = ua.match(/Version\/(\d+)\.(\d+)/);
        if (ipadMatch && navigator.maxTouchPoints > 1) {
            version = {
                major: parseInt(ipadMatch[1]),
                minor: parseInt(ipadMatch[2] || 0),
                patch: 0,
                full: `${ipadMatch[1]}.${ipadMatch[2] || 0}`
            };
        }
    }

    return { isIOS: true, version, isSafari, isStandalone };
}

// Detect iOS (backwards compatible)
function isIOS() {
    return getIOSInfo().isIOS;
}

// iOS-specific enhancements
if (isIOS()) {
    console.log('iOS device detected');
    document.body.classList.add('ios-device');

    // Prevent overscroll bounce on body
    document.body.addEventListener('touchmove', (e) => {
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });

    // Add momentum scrolling
    const scrollableElements = document.querySelectorAll('.carousel-container, .ios-content');
    scrollableElements.forEach(el => {
        el.style.webkitOverflowScrolling = 'touch';
    });
}

// Handle viewport changes (keyboard appearing on iOS)
if (isIOS()) {
    let originalHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        if (window.innerHeight < originalHeight) {
            // Keyboard is visible
            document.querySelector('.ios-bottom-bar').style.display = 'none';
        } else {
            // Keyboard is hidden
            document.querySelector('.ios-bottom-bar').style.display = 'block';
        }
    });
}

// Log device info
console.log('Device:', isIOS() ? 'iOS' : 'Other');
console.log('Screen:', window.innerWidth + 'x' + window.innerHeight);
console.log('User Agent:', navigator.userAgent);

// PWA Install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('PWA install prompt available');
});

// Listen for app installed event
window.addEventListener('appinstalled', (e) => {
    console.log('✅ PWA installed successfully - appinstalled event fired');
    deferredPrompt = null;

    // Save to localStorage
    localStorage.setItem('pwaInstalled', 'true');

    // Delay to ensure app is fully installed
    setTimeout(() => {
        // Update buttons to "CHƠI NGAY" state
        const installBtnAndroid = document.getElementById('installBtnAndroid');
        const getBtn = document.getElementById('getBtn');

        if (installBtnAndroid) {
            console.log('Updating Android install button...');
            installBtnAndroid.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                CHƠI NGAY
            `;
            installBtnAndroid.dataset.installed = 'true';
            installBtnAndroid.disabled = false;
            installBtnAndroid.style.opacity = '1';
            installBtnAndroid.style.background = 'linear-gradient(135deg, #34C759 0%, #30D158 100%)';
        }

        if (getBtn) {
            console.log('Updating iOS GET button...');
            getBtn.textContent = 'CHƠI';
            getBtn.dataset.installed = 'true';
            getBtn.style.background = 'linear-gradient(135deg, #34C759 0%, #30D158 100%)';
            getBtn.style.color = 'white';
        }

        // Show notification
        showNotification('Cài đặt thành công!', 'Nhấn CHƠI NGAY để bắt đầu');
    }, 500);
});

// Auto install banner - DISABLED (user only wants manual install via button)
// if (!isIOS() && !window.matchMedia('(display-mode: standalone)').matches) {
//     window.addEventListener('load', () => {
//         setTimeout(() => {
//             const banner = document.createElement('div');
//             banner.style.cssText = `
//                 position: fixed;
//                 bottom: 80px;
//                 left: 16px;
//                 right: 16px;
//                 background: white;
//                 padding: 16px;
//                 border-radius: 12px;
//                 box-shadow: 0 4px 20px rgba(0,0,0,0.15);
//                 z-index: 999;
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 animation: slideUp 0.4s ease-out;
//             `;
//             banner.innerHTML = `
//                 <div style="flex: 1;">
//                     <div style="font-weight: 600; margin-bottom: 4px;">Cài đặt NEW88</div>
//                     <div style="font-size: 13px; color: #8e8e93;">Thêm vào màn hình chính</div>
//                 </div>
//                 <button id="installAppBtn" style="background: #007AFF; color: white; border: none; padding: 8px 20px; border-radius: 20px; font-weight: 600;">Cài đặt</button>
//                 <button id="closeBanner" style="background: none; border: none; margin-left: 8px; font-size: 24px; color: #8e8e93;">×</button>
//             `;
//             document.body.appendChild(banner);
//
//             document.getElementById('installAppBtn').addEventListener('click', async () => {
//                 if (deferredPrompt) {
//                     deferredPrompt.prompt();
//                     const { outcome } = await deferredPrompt.userChoice;
//                     console.log('Install prompt:', outcome);
//                     deferredPrompt = null;
//                 }
//                 banner.remove();
//             });
//
//             document.getElementById('closeBanner').addEventListener('click', () => {
//                 banner.style.animation = 'slideUp 0.4s ease-out reverse';
//                 setTimeout(() => banner.remove(), 400);
//             });
//         }, 3000);
//     });
// }
