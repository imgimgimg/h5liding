;(function($){
    $.fn.popup =function(options){
        // 默认参数
        var randomId = '#pop' + Math.floor(Math.random()*100000);
        var defaults = {
            id:randomId,//弹窗表示符
            trigger:'click',
            width:600,
            height:400,
            overlay:.5,
            title:'弹窗标题',
            drag:true,
            content:'',
            callback:null
        }
        // 合并参数
        var opt = $.extend({},defaults,options);

        // 了解this指什么
        return this.each(function(){
            // 打开弹窗事件触发
            $(this).on(opt.trigger,function(){
                show();
            })//原生对象

            // 显示弹窗
            function show(){
                init();
                $(opt.id).css({width:opt.width,height:opt.height}).show().on('click','.btn-close',function(){
                    hide();
                });

                // 事件命名空间
                $(document).on('keyup.closepopup',function(e){
                    // 按ESC键关闭弹窗
                    if(e.keyCode == 27){
                        hide();
                    }
                });

                // 拖动功能
                if(opt.title && opt.drag){
                    $(opt.id).find('.title').on('mousedown',function(evt){
                        // 先记录点击的位置
                        var offsetX = evt.offsetX;
                        var offsetY = evt.offsetY;
                        $(document).on('mousemove.drag',function(e){
                            var _left = e.clientX - offsetX;
                            var _top = e.clientY - offsetY;
                            $(opt.id).css({
                                left:_left,
                                top:_top,
                                margin:0
                            });
                            e.preventDefault();
                        });
                    }).on('mouseup',function(e){
                        $(document).off('mousemove.drag');
                    });
                }
                
                // 执行回调函数
                $.type(opt.callback)==='function' && opt.callback($(opt.id));
            }

            // 关闭弹窗
            function hide(){
                $(opt.id).remove();
                if(opt.overlay) $('.overlay').remove();
                $(document).off('keyup.closepopup');
            }

            // 初始化弹窗
            function init(){
                var html = '<div class="popover" id="'+opt.id.replace('#','')+'">\n'+
                    '<div class="btn-close"></div>\n';

                    // 是否显示标题
                if(opt.title) html += '<div class="title">弹窗标题</div>\n';
                    
                    html += '<div class="content">'+opt.content+'</div>\n'+
                '</div>';

                // 是否显示遮罩层
                if(opt.overlay) html += '<div class="overlay" style="background-color:rgba(0,0,0,'+opt.overlay+')"></div>';
                $('body').append(html);
            }
            
        });
    }
})(jQuery);

// 使用(测试驱动开发)
//$('.btn-open').popup();