'use strict';

//alert창 중복 호출 방지
//페이지 이동시에만 사용
let isAlertShown = false;

(function($, window) {

$.extend({

    rest : {
        
        get : function(options) {
            return this.send(options, 'get');
        },

        post : function(options) {
            return this.send(options, 'post');
        },

        send : function(options, method) {

            loadingInit.open();
            
            if(!options || !options.url) {
                throw 'url is required';
            }

            let contentType = 'application/json; charset=UTF-8';
            if(options.contentType) {
                contentType = options.contentType; 
            }
            let dataType = 'json';
            if(options.dataType) {
                dataType = options.dataType; 
            }
            
            let deferred = $.Deferred();

            $.ajax({
                type : method,
                url : CONTEXT + options.url,
                data : options.data,
                contentType : contentType,
                dataType : dataType,
                beforeSend : function(xhr) {
                    xhr.setRequestHeader('X-Ajax-call', 'true');
                    if(method == 'post' && CSRF_HEADER_NAME && CSRF_TOKEN) {
                        xhr.setRequestHeader(CSRF_HEADER_NAME, CSRF_TOKEN);
                    }
                }
            })
            .done(function(response, status, jqXHR) {
                deferred.resolve(response, status);
            })
            .fail(function(response, status, jqXHR) {
                if(status == 403 || response.status == 403) {
                    if(!isAlertShown) {
                        alert('로그인이 필요합니다.');
                        isAlertShown = true;
                    }
                    location.href = '/cm/auth/login.do';
                }else {
                    if(status == 401 || response.status == 401) {
                        alert('권한이 없는 요청입니다.');
                    }else if(status == 500 || response.status == 500) {
                        alert('요청 처리 중 오류가 발생했습니다.');
                    }
                    deferred.reject(response, status);
                }
            })
            .always(function(response, status) {
                console.log('end of ' + this.url + ' by ' + method);
                loadingInit.close();
            });

            return deferred.promise();
        }
    },

    toParam : function(param, isObject) {
        
        let resultParam = {};
        let arrParam = [];
        
        if(typeof param === 'string') {
            arrParam = $(param).serializeArray();
        }else if(typeof param === 'object') {
            $.each(param, function(name, value) {
                if(value && value.constructor == Array) {
                    for(var key in value) {
                        let paramValue = value[key];
                        if(typeof paramValue === 'boolean' || typeof paramValue === 'number') {
                            paramValue = String(paramValue);
                        }else if(typeof paramValue === 'object') {
                            for(var iKey in paramValue) {
                                let iValue = paramValue[iKey];
                                if(typeof iValue === 'boolean' || typeof iValue === 'number') {
                                    iValue = String(iValue);
                                    paramValue[iKey] = iValue;
                                }
                            }
                        }
                        if(value.length > 1) {
                            arrParam.push({
                                name : name,
                                value : paramValue
                            });
                        }else {
                            arrParam.push({
                                name : name,
                                value : [paramValue]
                            });
                        }
                    }
                }else {
                    let paramValue = value;
                    if(typeof paramValue === 'boolean' || typeof paramValue === 'number') {
                        paramValue = String(paramValue);
                    }else if(typeof paramValue === 'object') {
                        for(var iKey in paramValue) {
                            let iValue = paramValue[iKey];
                            if(typeof iValue === 'boolean' || typeof iValue === 'number') {
                                iValue = String(iValue);
                                paramValue[iKey] = iValue;
                            }
                        }
                    }
                    arrParam.push({
                        name : name,
                        value : paramValue
                    });
                }
            });
        }else {
            return;
        }

        $.each(arrParam, function(i, v) {
            if(resultParam[v.name]) {
                if(!resultParam[v.name].push) {
                    resultParam[v.name] = [resultParam[v.name]];
                }
                resultParam[v.name].push(v.value);
            }else {
                resultParam[v.name] = v.value;
            }
        });
        
        if(!resultParam) {
            return;
        }
        
        if(isObject) {
            return resultParam;
        }
        
        return JSON.stringify(resultParam);
    }
});

$.fn.extend({

    toParam : function(param, isObject) {
        
        if(!(this || this.get(0))) {
            throw 'not valid target elements';
        }
        
        let resultParam = {};
        let arrParam = [];
        
        if(param) {
            if(typeof param === 'string') {
                arrParam = $(param).serializeArray();
            }else if(typeof param === 'object') {
                $.each(param, function(name, value) {
                    if(value && value.constructor == Array) {
                        for(var key in value) {
                            let paramValue = value[key];
                            if(typeof paramValue === 'boolean' || typeof paramValue === 'number') {
                                paramValue = String(paramValue);
                            }else if(typeof paramValue === 'object') {
                                for(var iKey in paramValue) {
                                    let iValue = paramValue[iKey];
                                    if(typeof iValue === 'boolean' || typeof iValue === 'number') {
                                        iValue = String(iValue);
                                        paramValue[iKey] = iValue;
                                    }
                                }
                            }
                            if(value.length > 1) {
                                arrParam.push({
                                    name : name,
                                    value : paramValue
                                });
                            }else {
                                arrParam.push({
                                    name : name,
                                    value : [paramValue]
                                });
                            }
                        }
                    }else {
                        let paramValue = value;
                        if(typeof paramValue === 'boolean' || typeof paramValue === 'number') {
                            paramValue = String(paramValue);
                        }else if(typeof paramValue === 'object') {
                            for(var iKey in paramValue) {
                                let iValue = paramValue[iKey];
                                if(typeof iValue === 'boolean' || typeof iValue === 'number') {
                                    iValue = String(iValue);
                                    paramValue[iKey] = iValue;
                                }
                            }
                        }
                        arrParam.push({
                            name : name,
                            value : paramValue
                        });
                    }
                });
            }
        }
        
        if(this.get(0).constructor == Object) {
            $.each(this.get(0), function(name, value) {
                if(value && value.constructor == Array) {
                    for(var key in value) {
                        let paramValue = value[key];
                        if(typeof paramValue === 'boolean' || typeof paramValue === 'number') {
                            paramValue = String(paramValue);
                        }
                        if(value.length > 1) {
                            arrParam.push({
                                name : name,
                                value : paramValue
                            });
                        }else {
                            arrParam.push({
                                name : name,
                                value : [paramValue]
                            });
                        }
                    }
                }else {
                    let paramValue = value;
                    if(typeof paramValue === 'boolean' || typeof paramValue === 'number') {
                        paramValue = String(paramValue);
                    }
                    arrParam.push({
                        name : name,
                        value : paramValue
                    });
                }
            });
        }else {
            if(arrParam.length > 0) {
                $.merge(arrParam, this.serializeArray());
            }else {
                arrParam = this.serializeArray();
            }
        }
        
        $.each(arrParam, function(i, v) {
            if(resultParam[v.name]) {
                if(!resultParam[v.name].push) {
                    resultParam[v.name] = [resultParam[v.name]];
                }
                if(v.value.constructor == Array) {
                    $.merge(resultParam[v.name], v.value);
                }else {
                    resultParam[v.name].push(v.value);
                }
            }else {
                resultParam[v.name] = v.value;
            }
        });
        
        if(!resultParam) {
            return;
        }
        
        if(isObject) {
            return resultParam;
        }
        
        return JSON.stringify(resultParam);
    },

    fill : function(valueData) {
        if(this.length < 1) {
            throw 'no target';
        }
        var formSelector = this.get(0);
        if(!formSelector) {
            throw 'no target selector';
        }
        $.each(valueData, function(key, value) {
            if($(formSelector).find($('input:text[name="' + key + '"]')).length > 0) {
                $('input:text[name="' + key + '"]').val(value);
            }
            if($(formSelector).find($('input:text[id="' + key + '"]')).length > 0) {
                $('input:text[id="' + key + '"]').text(value);
            }
            if($(formSelector).find($('input:text[id="' + key + '"]')).length > 0) {
                $('input:text[id="' + key + '"]').text(value);
            }
            if($(formSelector).find($('p[name="' + key + '"]')).length > 0) {
                $('p[name="' + key + '"]').text(value);
            }
            if($(formSelector).find($('p[id="' + key + '"]')).length > 0) {
                $('p[id="' + key + '"]').text(value);
            }
            if($(formSelector).find($('span[name="' + key + '"]')).length > 0) {
                $('span[name="' + key + '"]').text(value);
            }
            if($(formSelector).find($('span[id="' + key + '"]')).length > 0) {
                $('span[id="' + key + '"]').text(value);
            }
            if($(formSelector).find($('div[name="' + key + '"]')).length > 0) {
                $('div[name="' + key + '"]').text(value);
            }
            if($(formSelector).find($('div[id="' + key + '"]')).length > 0) {
                $('div[id="' + key + '"]').text(value);
            }
            if($(formSelector).find($('textarea[name="' + key + '"]')).length > 0) {
                $('textarea[name="' + key + '"]').text(value);
                $('textarea[name="' + key + '"]').val(value);
            }
            if($(formSelector).find($('textarea[id="' + key + '"]')).length > 0) {
                $('textarea[id="' + key + '"]').text(value);
                $('textarea[id="' + key + '"]').val(value);
            }
            if($(formSelector).find($('select[name="' + key + '"]')).length > 0) {
                $('select[name="' + key + '"]').val(value);
                $('select[name="' + key + '"] option:selected').prop(
                'selected', false);
                $('select[name="' + key + '"] option').each(function(i, v) {
                    if($(v).val() == value) {
                        $(v).prop('selected', true);
                    }
                });
            }
            if($(formSelector).find($('select[id="' + key + '"]')).length > 0) {
                $('select[id="' + key + '"]').val(value);
                $('select[id="' + key + '"] option:selected').prop(
                'selected', false);
                $('select[id="' + key + '"] option').each(function(i, v) {
                    if($(v).val() == value) {
                        $(v).prop('selected', true);
                    }
                });
            }
            if($(formSelector).find($('td[id="' + key + '"]')).length > 0) {
                $('td[id="' + key + '"]').text(value);
            }
            if($(formSelector).find($('td[name="' + key + '"]')).length > 0) {
                $('td[name="' + key + '"]').text(value);
            }
        });
    },

    secureSubmit : function() {
        let $form = $(this);
        let $csrfTokenElement =
        $('<input>').attr('type', 'hidden').attr('name', CSRF_NAME).val(CSRF_TOKEN);
        $form.append($csrfTokenElement);
        $form.submit();
    },
    
    //ajax를 이용한 폼 전송
    submitAsync: function(options) {
        
        //Promise
        const $promise = $.Deferred();
        
        //폼 참조
        const $form = $(this);
        
        //폼 요소를 요청 객체에 추가
        let requestParam = new FormData();
        const formParamArray = $form.serializeArray();
        $.each(formParamArray, function(index, formParam) {
            if($('[name="' + formParam.name + '"]').data('form') == 'file') {
                const blobFile = $.transImageToFile(formParam.value);
                const fileName = $('[name="' + formParam.name + '"]').data('fileName');
                requestParam.append(formParam.name, blobFile, fileName);
            }else {
                requestParam.append(formParam.name, formParam.value);
            }
        });
        
        //파일 태그의 값을 요청 객체에 포함할지 여부
        //default는 false
        if(options.isContainsFileElements) {
            const formFileArray = $form.find(':file');
            if(formFileArray && formFileArray.length > 0) {
                $.each(formFileArray, function(index, formFile) {
                    if(formFile.value) {
                        requestParam.append(formFile.name, formFile.value);                                
                    }
                });
            }                        
        }
        
        //폼 요소 외의 파라미터가 있다면 요청 객체 추가
        if(options.data) {
            let key = '';
            for(key in options.data) {
                requestParam.append(key, options.data[key]);
            }
        }
        
        //ajax를 이용한 폼 서브밋 수행
        $.ajax({
            url : CONTEXT + options.url,
            type : 'POST',
            enctype : 'multipart/form-data',
            data : requestParam,
            processData : false,
            contentType : false,
            cache : false,
            
            //요청 전처리
            beforeSend : function(xhr) {
                
                //로딩바 열기
                loadingInit.open();
                
                //Ajax 요청 헤더
                xhr.setRequestHeader('X-Ajax-call', 'true');
                
                //CSRF 토큰 설정
                if(CSRF_HEADER_NAME && CSRF_TOKEN) {
                    xhr.setRequestHeader(CSRF_HEADER_NAME, CSRF_TOKEN);
                }
            },
            
            //200 응답 콜백
            success : function(response) {
                
                //성공
                if(response.result) {
                    if(response.result == 'success') {
                        $promise.resolve(response, 'S');
                    }else if(response.result == 'fail') {
                        $promise.reject(response, 'F');
                    }
                    
                //실패
                }else {
                    if(response == 'success') {
                        $promise.resolve(response, 'S');
                    }else if(response == 'fail') {
                        $promise.reject(response, 'F');
                    }
                }
            },
            
            //에러 콜백
            error : function(response) {
                $promise.reject(response);
            },
            
            //완료 콜백
            complete : function () {
                
                //로딩 이미지 숨기기
                loadingInit.close();
            }
        });
        
        //Promise
        return $promise.promise();
    },
    
    appendFile: function(fileParam) {
        
        //폼 참조
        const $form = $(this);
        
        //기존 파라미터 제거
        if($('input[name="' + fileParam.name + '"]') 
                && $('input[name="' + fileParam.name + '"]').length > 0) {
            $('input[name="' + fileParam.name + '"]').remove(); 
        }
        
        //파일 파라미터 추가
        let $param = $('<input>').attr('type', 'text').attr('name', fileParam.name).hide();
        $param.data('form', 'file').data('fileName', fileParam.fileName).val(fileParam.value);
        
        //폼에 추가 
        //$form.append($param);
    }
});

})(jQuery, this || window);















