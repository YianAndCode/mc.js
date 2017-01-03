var mc = (function(){
    function mc(canvas, X, Y, offsetX = null, offsetY = null)
    {
        if(offsetX == null)
        {
            offsetX = canvas.width / 2;
        }
        if(offsetY == null)
        {
            offsetY = canvas.height / 2;
        }
        Object.defineProperties(mc,
            {
                '_ctx': {
                    value: canvas.getContext("2d"),
                    writable: false
                },
                // 画布的坐标大小（像素）
                '_canvasX': {
                    value: canvas.width,
                    writable: false
                },
                '_canvasY': {
                    value: canvas.height,
                    writable: false
                },
                // 数学坐标大小（多少个单位长度）
                '_coordinateX': {
                    value: X,
                    writable: false
                },
                '_coordinateY': {
                    value: Y,
                    writable: false
                },
                // 数学坐标原点偏移量
                '_offsetX': {
                    value: offsetX * canvas.width / X,
                    writable: false
                },
                '_offsetY': {
                    value: offsetY * canvas.height / Y,
                    writable: false
                }
            }
        );
    }

    mc.prototype.drawCoordinate = function(){
        mc._ctx.beginPath();
        // X 轴
        mc._ctx.moveTo(0, mc._canvasY - mc._offsetY);
        mc._ctx.lineTo(mc._canvasX, mc._canvasY - mc._offsetY);
        // X 轴箭头
        mc._ctx.moveTo(mc._canvasX - 10, mc._canvasY - mc._offsetY - 4);
        mc._ctx.lineTo(mc._canvasX, mc._canvasY - mc._offsetY);
        mc._ctx.lineTo(mc._canvasX - 10, mc._canvasY - mc._offsetY + 4);
        // Y 轴
        mc._ctx.moveTo(mc._offsetX, 0);
        mc._ctx.lineTo(mc._offsetX, mc._canvasY);
        // Y 轴箭头
        mc._ctx.moveTo(mc._offsetX - 4, 10);
        mc._ctx.lineTo(mc._offsetX, 0);
        mc._ctx.lineTo(mc._offsetX + 4, 10);

        mc._ctx.strokeStyle = "#000000";
        mc._ctx.stroke();
        mc._ctx.font = "bold 18px Microsoft YaHei light";
        mc._ctx.fillText("x", mc._canvasX - 10, mc._canvasY - mc._offsetY - 10);
        mc._ctx.fillText("y", mc._offsetX + 10, 20);
        mc._ctx.fillText("0", mc._offsetX + 10, mc._canvasY - mc._offsetY + 20);
    }

    mc.prototype.drawFuncGraph = function(func, startX, endX, color = "#FF0000")
    {
        mc._ctx.beginPath();
        scaleX = mc._coordinateX / mc._canvasX;
        scaleY = mc._coordinateY / mc._canvasY;
        // 把数学坐标转换为 canvas 坐标
        start = startX / scaleX + mc._offsetX;
        end = endX / scaleX + mc._offsetX;

        startY = mc._canvasY - mc._offsetY;

        var funcResult;

        for(var x = start; x < end; x++)
        {
            funcResult = -1 / scaleY * func(scaleX * (x - mc._offsetX)) + startY;
            if(x == start)
            {
                mc._ctx.moveTo(start, funcResult);
                continue;
            }
            mc._ctx.lineTo(x, funcResult);
        }
        mc._ctx.strokeStyle = color;
        mc._ctx.stroke();
    }

    return mc;
})();