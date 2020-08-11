/**
 * 브릿지 콜백 함수 목록
 * onScanResult() - 비콘 UUID
 * onNetworkTypeResult() - 네트워크 타입 요청
 * onScannerResult() - 바코드 스캔 후 결과
 * closeScanner() - 바코드 취소 버튼 클릭
 * onAuthResult() - 핀/생체인증
 * onWifiConnectResult() -WI-FI로 연결하기
 * onWifiDisconnectResult() - WI-FI로 연결끊기
 * onBlossomLoginResult() - 블라썸 로그인 호출
 * onTabletResult() - 패드 유무 확인
 * onStatusBarHeight() - 상단 네이티브영역 높이
 * onPushIdResullt() - push ID
 */

/**
 * 비콘 UUID
 * callback : onScanResult
 */
function fn_nativeScanBeacon() {
	if(isAndroid && typeof SmartOffice != 'undefined') {
		SmartOffice.scanBeacon();
	}
	if(isIOS && typeof webkit != 'undefined' 
	        && typeof webkit.messageHandlers != 'undefined' 
	        && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
		webkit.messageHandlers.SmartOffice.postMessage("scanBeacon");
	}
}

/**
 * 네트워크 타입 요청
 * callback : onNetworkTypeResult(lte) - lte
 *            onNetworkTypeResult(wifi) - wifi
 */
function fn_nativeGetNetworkType() {
    if(isAndroid && typeof SSG != 'undefined') {
		SSG.getNetworkType();
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
		webkit.messageHandlers.SSG.postMessage("getNetworkType");
	}
}

/**
 * 스캐너 호출
 * callback : onScannerResult
 * callback : closeScanner
 * @param skuNmFlag
 */
function fn_nativeCallScanner(skuNmFlag) {
    if(isAndroid && typeof SmartOffice != 'undefined') {
		SmartOffice.callScanner(skuNmFlag);
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
		webkit.messageHandlers.SmartOffice.postMessage("callScanner|" + skuNmFlag);
	}
}

/**
 * 핀/생체인증
 * callback : onAuthResult
 */
function fn_nativeCallAuthScreen() {
    if(isAndroid && typeof SmartOffice != 'undefined') {
        SmartOffice.callAuthScreen(1);
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
        webkit.messageHandlers.SmartOffice.postMessage("callAuthScreen|1");
	}
}

/**
 * WIFI 연결/끊기
 * callback : onWifiConnectResult
 * callback : onWifiDisconnectResult
 * @param flag : 연결값(disconnect/connect)
 */
function fn_nativeChangeWifi(flag) {
    if(isAndroid && typeof SmartOffice != 'undefined') {
		SmartOffice.changeWifi(flag);
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
		webkit.messageHandlers.SmartOffice.postMessage("changeWifi|" + flag);
	}
}

/**
 * PDF VIEWER
 * @param type : 1.url, 2.binary
 * @param val
 */
function fn_nativeCallPdfViewer(type, val) {
    if(isAndroid && typeof SSG != 'undefined') {
    	SSG.callPdfViewer(type, val);
    }
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
    	webkit.messageHandlers.SSG.postMessage("callPdfViewer|" + type + "|" + val);
    }
}

/**
 * 통합ESL(전자쇼카드) 링크
 */
function fn_nativeLinkNEWESLApps(strCode, userCode) {
    if(isAndroid && typeof SmartOffice != 'undefined') {
		SmartOffice.linkNEWESLApps(strCode, userCode);
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
		webkit.messageHandlers.SmartOffice.postMessage("linkNEWESLApps|" + strCode + "|" + userCode);
	}
}

/**
 * 터치원 링크
 */
function fn_nativeLinkTouchApps() {
    //alert("터치원 링크 bridge.js")
    if(isAndroid && typeof SmartOffice != 'undefined') {
        //alert("터치원 링크 bridge.js Android")
        SmartOffice.linkTouchApps();
    }
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
        webkit.messageHandlers.SmartOffice.postMessage("linkTouchApps");
    }
}

/**
 * 외부 브라우저 호출
 * @param url
 */
function fn_nativeCallExtBrowser(url) {
    if(isAndroid && typeof SSG != 'undefined') {
    	SSG.callExtBrowser(url);
    }
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
    	webkit.messageHandlers.SSG.postMessage("callExtBrowser|" + url);
    }
}

/**
 * 화면회전 : 가로 <-> 세로 자동 토글
 */
function fn_nativeChangeOrientation() {
    if(isAndroid && typeof SSG != 'undefined') {
		SSG.changeOrientation("toggle");
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
		webkit.messageHandlers.SSG.postMessage("changeOrientation|toggle");
	}
}

/**
 * 화면회전 : 세로로
 */
function fn_nativeChangeOrientationPortrait() {
    if(isAndroid && typeof SSG != 'undefined') {
		SSG.changeOrientation("portrait");
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
		webkit.messageHandlers.SSG.postMessage("changeOrientation|portrait");
	}
}

/**
 * 화면회전 : 가로로
 */
function fn_nativeChangeOrientationLandscape() {
    if(isAndroid && typeof SSG != 'undefined') {
		SSG.changeOrientation("landscape");
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
		webkit.messageHandlers.SSG.postMessage("changeOrientation|landscape");
	}
}

/**
 * 블라썸 로그인 호출
 * callback : onBlossomLoginResult()
 */
function fn_nativeLoginBlossom() {
    if(isAndroid && typeof SmartOffice != 'undefined') {
		SmartOffice.loginBlossom();
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
		webkit.messageHandlers.SmartOffice.postMessage("loginBlossom");
	}
}

/**
 * 패드 유무 확인
 * callback : onTabletResult(true) - 패드 맞음
 *          : onTabletResult(false) - 패드 아님
 */
function fn_nativeIsTablet() {
    if(isAndroid && typeof SSG != 'undefined') {
		SSG.isTablet();
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
		webkit.messageHandlers.SSG.postMessage("isTablet");
	}
}

/**
 * 앱 재시작
 */
function fn_nativeRestartApp() {
    if(isAndroid && typeof SmartOffice != 'undefined') {
		SmartOffice.restartApp();
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
		webkit.messageHandlers.SmartOffice.postMessage("callSplashScreen");
	}
}

/**
 * 앱 종료
 */
function fn_nativeFinishApp() {
    if(isAndroid && typeof SSG != 'undefined') {
		SSG.finishApp();
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
		webkit.messageHandlers.SSG.postMessage("finishApp");
	}
}

/**
 * 스마트 비서 호출
 */
function fn_nativeCallMiniBrowser(url) {
    if(isAndroid && typeof SSGApp != 'undefined') {
		//SmartOffice.callMiniBrowser(url);
        SSGApp.callMiniBrowser(url, 'paramString');
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSGApp != 'undefined') {
		//webkit.messageHandlers.SmartOffice.postMessage("callMiniBrowser|" + url);
        webkit.messageHandlers.SSGApp.postMessage("callMiniBrowser|" + url + "|action=1");
	}
}

/**
 * 화면 상단(header - 스캐너, 전체메뉴 표시 영역) 색상 변경
 */
function fn_nativeSetStatusBarColor(color) {
    if(isAndroid && typeof SmartOffice != 'undefined') {
		SmartOffice.setStatusBarColor(color);
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SmartOffice != 'undefined') {
		webkit.messageHandlers.SmartOffice.postMessage("setStatusBarColor|" + color);
	}
}

/**
 * 디바이스 상단(statusbar - 시계, 네트워크 표시 영역) 네이티브영역 높이
 * callback : onStatusBarHeight()
 */
function fn_nativeGetStatusBarHeight() {
    if(isAndroid && typeof SSG != 'undefined') {
		SSG.getStatusBarHeight();
	}
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSG != 'undefined') {
		webkit.messageHandlers.SSG.postMessage("getStatusBarHeight");
	}
}

/**
 * 스마트비서용 inappbrowser open
 */
function fn_nativeSmartSso(url, jwt) {
    if(isAndroid && typeof SSGApp != 'undefined') {
        SSGApp.callMiniBrowser(url, jwt);
    }
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSGApp != 'undefined') {
        webkit.messageHandlers.SSGApp.postMessage('callMiniBrowser|'+url+'|'+jwt)
    }
}

/**
 * native popup
 */
function fn_nativePopup(url, param) {
    if(isAndroid && typeof SSGApp != 'undefined') {
        SSGApp.callMiniBrowser(url, param);
    }
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSGApp != 'undefined') {
        webkit.messageHandlers.SSGApp.postMessage('callMiniBrowser|'+url+'|'+param)
    }
}

/**
 * native popup
 */
function fn_nativePopupJson(url, param) {
    if(isAndroid && typeof SSGApp != 'undefined') {
        SSGApp.callMiniBrowserJson(url, param);
    }
    if(isIOS && typeof webkit != 'undefined' 
            && typeof webkit.messageHandlers != 'undefined' 
            && typeof webkit.messageHandlers.SSGApp != 'undefined') {
        webkit.messageHandlers.SSGApp.postMessage('callMiniBrowserJson|'+url+'|'+param)
    }
}

/**
 * 이미지 에디터 - 현재 오픈소스이며 추후 변경 예정
 */
function fn_imageEditorCall() {
	if(isAndroid) {
		window.location="/js_editor/example03-mobile.html";
    }
    if(isIOS) {
    	location.href="/js_editor/example03-mobile.html";
    }
}

/**
 * 푸시용 ID 추출
 */
//function fn_getUuidString3() {
//    if(isAndroid && typeof SSGApp != 'undefined') {
//		SSGApp.getUuidString3();
//    }
//    if(isIOS && typeof webkit != 'undefined' 
//            && typeof webkit.messageHandlers != 'undefined' 
//            && typeof webkit.messageHandlers.SSGApp != 'undefined') {
//        webkit.messageHandlers.SSGApp.postMessage("getUuidString3");
//    }
//}

/**
 * PC에서 개발 - 임시
 */
function fn_nativePopup(url, param) {
	/*
	if(isAndroid) {
		SSGApp.callMiniBrowser(url, param);
	}
	if(isIOS) {
		webkit.messageHandlers.SSGApp.postMessage('callMiniBrowser|'+url+'|'+param);
	}
	*/
	window.open(url + "?" + param, "");
}

