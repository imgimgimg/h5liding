;(function($){
    $.fn.tips = function(options) {
        var defaults = {
            trigger: 'mouseover',
            attr: 'title'
        };
        // 扩展default对象
        var opt = $.extend({}, defaults, options);

        // 这里的this指向jquery对象,$('a[title]')
        this.on(opt.trigger, function(e) {
            if($('.tips')[0]){
                $('.tips').remove();
                $(this).attr(opt.attr, $(this).data('temp'));
            }else{
                $('<div class="tips">' + $(this).attr(opt.attr) + '<span class="arrow"></span><span class="arrow inner"></span></div>').css({
                    left: e.clientX - 20,
                    top: e.clientY + 40
                }).appendTo('body');

                // 利用data方法保存数据
                $(this).data('temp', $(this).attr(opt.attr));

                // 删除title属性
                $(this).removeAttr(opt.attr);
            }
            
        })

        // 鼠标移开后删除提示信息
        // 恢复title属性
        // .on('mouseout', function() {
        //     $('.tips').remove();

        //     $(this).attr(opt.attr, $(this).data('temp'));
        // })

        // .on('mousemove', function(e) {
        //     $('.tips').css({
        //         left: e.clientX - 20,
        //         top: e.clientY + 40
        //     })
        // });
    }
})(jQuery);