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
        Object.defineProperties(this,
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
        this._ctx.beginPath();
        // X 轴
        this._ctx.moveTo(0, this._canvasY - this._offsetY);
        this._ctx.lineTo(this._canvasX, this._canvasY - this._offsetY);
        // X 轴箭头
        this._ctx.moveTo(this._canvasX - 10, this._canvasY - this._offsetY - 4);
        this._ctx.lineTo(this._canvasX, this._canvasY - this._offsetY);
        this._ctx.lineTo(this._canvasX - 10, this._canvasY - this._offsetY + 4);
        // Y 轴
        this._ctx.moveTo(this._offsetX, 0);
        this._ctx.lineTo(this._offsetX, this._canvasY);
        // Y 轴箭头
        this._ctx.moveTo(this._offsetX - 4, 10);
        this._ctx.lineTo(this._offsetX, 0);
        this._ctx.lineTo(this._offsetX + 4, 10);

        this._ctx.strokeStyle = "#000000";
        this._ctx.stroke();
        this._ctx.font = "bold 18px Courier New";
        this._ctx.fillText("x", this._canvasX - 10, this._canvasY - this._offsetY - 10);
        this._ctx.fillText("y", this._offsetX + 10, 20);
        this._ctx.fillText("0", this._offsetX + 10, this._canvasY - this._offsetY + 20);
    }

    mc.prototype.drawFuncGraph = function(func, startX, endX, color = "#FF0000")
    {
        this._ctx.beginPath();
        scaleX = this._coordinateX / this._canvasX;
        scaleY = this._coordinateY / this._canvasY;
        // 把数学坐标转换为 canvas 坐标
        start = startX / scaleX + this._offsetX;
        end = endX / scaleX + this._offsetX;

        startY = this._canvasY - this._offsetY;

        var funcResult;

        for(var x = start; x < end; x++)
        {
            funcResult = -1 / scaleY * func(scaleX * (x - this._offsetX)) + startY;
            if(x == start)
            {
                this._ctx.moveTo(start, funcResult);
                continue;
            }
            this._ctx.lineTo(x, funcResult);
        }
        this._ctx.strokeStyle = color;
        this._ctx.stroke();
    }

    return mc;
})();