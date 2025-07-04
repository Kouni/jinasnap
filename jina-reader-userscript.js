// ==UserScript==
// @name         Jina Reader - Copy LLM Format
// @namespace    https://github.com/kouni/jinasnap
// @version      2.1.3
// @description  Copy current page as LLM-friendly format using Jina Reader API
// @author       Kouni
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// @connect      r.jina.ai
// ==/UserScript==

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        API_ENDPOINT: 'https://r.jina.ai/',
        TIMEOUT: 30000,
        NOTIFICATION_DURATION: 3000,
        FADE_DURATION: 300,
        MIN_CONTENT_LENGTH: 10
    };
    
    // State management
    let isProcessing = false;
    let currentNotification = null;
    
    // Register menu command
    GM_registerMenuCommand('📄 Copy as LLM Format', copyCurrentPage);
    
    // Main function to copy current page
    function copyCurrentPage() {
        // Prevent multiple simultaneous requests
        if (isProcessing) {
            showNotification('⚠️ Request already in progress...', 'warning');
            return;
        }
        
        isProcessing = true;
        const currentUrl = window.location.href;
        
        showNotification('🔄 Converting page...', 'info');
        logDebug('Starting conversion for URL:', currentUrl);
        
        GM_xmlhttpRequest({
            method: 'GET',
            url: CONFIG.API_ENDPOINT + currentUrl,
            headers: {
                'Accept': 'text/plain',
                'User-Agent': 'Mozilla/5.0 (compatible; Jina-Reader-UserScript/2.1)'
            },
            timeout: CONFIG.TIMEOUT,
            onload: function(response) {
                isProcessing = false;
                handleApiResponse(response);
            },
            onerror: function(error) {
                isProcessing = false;
                logError('Network error:', error);
                showNotification('❌ Network error occurred', 'error');
            },
            ontimeout: function() {
                isProcessing = false;
                logError('Request timeout for URL:', currentUrl);
                showNotification('❌ Request timeout', 'error');
            }
        });
    }
    
    // Handle API response
    function handleApiResponse(response) {
        logDebug('API response status:', response.status);
        
        if (response.status === 200) {
            const content = response.responseText;
            
            // Validate content
            if (!isValidContent(content)) {
                logError('Invalid content received:', content.substring(0, 100));
                showNotification('❌ Invalid or empty response', 'error');
                return;
            }
            
            GM_setClipboard(content);
            showNotification('✅ Content copied to clipboard!', 'success');
            logDebug('Content copied successfully, length:', content.length);
        } else {
            logError('API error, status:', response.status);
            showNotification(`❌ Failed to convert page (${response.status})`, 'error');
        }
    }
    
    // Validate content
    function isValidContent(content) {
        if (!content || typeof content !== 'string') {
            return false;
        }
        
        const trimmed = content.trim();
        const lowerContent = trimmed.toLowerCase();
        
        // Check minimum length
        if (trimmed.length < CONFIG.MIN_CONTENT_LENGTH) {
            return false;
        }
        
        // Only reject obvious error/protected pages
        const rejectPatterns = [
            'page not found',
            'error 404',
            'error 403', 
            'error 500',
            'access denied',
            'unauthorized',
            'forbidden',
            'protected by recaptcha',
            'captcha verification required',
            'please verify you are human',
            'authentication required',
            'login required'
        ];
        
        for (const pattern of rejectPatterns) {
            if (lowerContent.includes(pattern)) {
                return false;
            }
        }
        
        return true;
    }
    
    // Debug logging
    function logDebug(message, ...args) {
        console.log(`[Jina Reader] ${message}`, ...args);
    }
    
    // Error logging
    function logError(message, ...args) {
        console.error(`[Jina Reader] ${message}`, ...args);
    }
    
    // Show notification with deduplication
    function showNotification(message, type = 'info') {
        // Clear existing notification
        if (currentNotification && document.body.contains(currentNotification)) {
            document.body.removeChild(currentNotification);
        }
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            opacity: 1;
            ${getNotificationStyles(type)}
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Store reference to current notification
        currentNotification = notification;
        
        // Auto-dismiss after configured duration
        setTimeout(() => {
            if (currentNotification === notification) {
                notification.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                    if (currentNotification === notification) {
                        currentNotification = null;
                    }
                }, CONFIG.FADE_DURATION);
            }
        }, CONFIG.NOTIFICATION_DURATION);
    }
    
    // Get notification styles based on type
    function getNotificationStyles(type) {
        const styles = {
            success: 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;',
            error: 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;',
            warning: 'background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;',
            info: 'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;'
        };
        return styles[type] || styles.info;
    }
    
    // Keyboard shortcut (Ctrl/Cmd + Shift + R)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            copyCurrentPage();
        }
    });
})();