/**
 * [arSlide description]
 * @param  object options [参考以下注释]
 * @return 返回jquery对象，以便链式调用
 */
$.prototype.arSlide = function(options){
    var defaults = {
        autoPlay:true,//自动轮播
        small:true,//是否小图，不显示小图设为false
        buttons:true,//是否显示左右按钮
        time:3000,//轮播间隔时间
        type:'fade',//轮播类型: fade:渐现, vertial:垂直滚动, horizontal:水平滚动, show:幻灯片
        index:0,//默认显示第几张图片
    }
    var opt = $.extend({},defaults,options);
    return this.each(function(){
        var $wrap = $(this);
        var $big = $('.big',$wrap);

        var $img = $big.find('li'),$small,$simg;

        var index = opt.index;
        var timer;

        init();

        // 点击左右按钮实现图片跳转
        $wrap.on('click','>span',function(){
            if($(this).hasClass('prev')){
                index--;
            }else{
                index++;
            }

            show();
        })

        //小图绑定点击事件
        .on('click','.small li',function(){
            index = $(this).index();
            show();
        });

        // 自动轮播
        if(opt.autoPlay){
            $wrap.on('mouseout',function(){
                timer = setInterval(foucs,opt.time);
            }).on('mouseover',function(){
                clearInterval(timer);
            }).triggerHandler('mouseout');
        }
        


        // 初始化函数
        function init(){
            if(opt.small){
                //复制大图到小图区域
                $small = $('<div class="small"/>');
                $simg = $img.clone();
                $small.append($simg).insertAfter($big);

            }

            // 前后按钮
            if(opt.buttons){
                $('<span class="prev"/>').html('&lt;').appendTo($wrap);
                $('<span class="next"/>').html('&gt;').appendTo($wrap);
            }
            
            show();
        }

        function foucs(){
            index++;
            show();  
        }

        // 显示图片函数
        function show(){
            //临界点的判断
            //当前index到达第一张后
            if(index<0){
                index = $img.length -1;
            }else if(index >= $img.length){
                index = 0;
            }

            $img.eq(index).animate({opacity:1}).siblings().animate({opacity:0});
           if($simg) $simg.eq(index).animate({opacity:1}).siblings().animate({opacity:0.5});
        }

    });
}