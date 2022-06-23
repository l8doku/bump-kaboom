function $cf8cbfeb7a27e10c$export$2e2bcd8739ae039(value, name) {
    if (isNaN(value) || value <= 0) throw new Error(`"${name}" must be a positive integer, but was ${value} (${typeof value})`);
}


const $c9ea38e06f6b67c3$export$d971781c6009eb20 = 1e-10; // floating-point margin of error


function $19bb49a1a30b2b3a$export$2e2bcd8739ae039(x, a, b) {
    return Math.abs(a - x) < Math.abs(b - x) ? a : b;
}


function $f24ba20eaa648c59$export$f653518feb1a7300(x, y, w, h, px, py) {
    return {
        x: (0, $19bb49a1a30b2b3a$export$2e2bcd8739ae039)(px, x, x + w),
        y: (0, $19bb49a1a30b2b3a$export$2e2bcd8739ae039)(py, y, y + h)
    };
}
function $f24ba20eaa648c59$export$a3b9375a9680aa1a(x, y, w, h, x1, y1, x2, y2, ti1, ti2) {
    let _ti1 = isNaN(ti1) ? 0 : ti1;
    let _ti2 = isNaN(ti2) ? 1 : ti2;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let nx;
    let ny;
    let nx1 = 0;
    let ny1 = 0;
    let nx2 = 0;
    let ny2 = 0;
    let p, q, r;
    for (const side of [
        1,
        2,
        3,
        4
    ]){
        // left
        if (side === 1) {
            nx = -1;
            ny = 0;
            p = -dx;
            q = x1 - x;
        } else if (side === 2) {
            nx = 1;
            ny = 0;
            p = dx;
            q = x + w - x1;
        } else if (side === 3) {
            nx = 0;
            ny = -1;
            p = -dy;
            q = y1 - y;
        } else {
            nx = 0;
            ny = 1;
            p = dy;
            q = y + h - y1;
        }
        if (p === 0) {
            if (q <= 0) return [
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined, 
            ];
        } else {
            r = q / p;
            if (p < 0) {
                if (r > _ti2) return [
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined, 
                ];
                else if (r > _ti1) {
                    _ti1 = r;
                    nx1 = nx;
                    ny1 = ny;
                }
            } else {
                if (r < _ti1) return [
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined, 
                ];
                else if (r < _ti2) {
                    _ti2 = r;
                    nx2 = nx;
                    ny2 = ny;
                }
            }
        }
    }
    return [
        _ti1,
        _ti2,
        nx1,
        ny1,
        nx2,
        ny2
    ];
}
function $f24ba20eaa648c59$export$41d8adf939ed37ff(x1, y1, w1, h1, x2, y2, w2, h2) {
    return {
        x: x2 - x1 - w1,
        y: y2 - y1 - h1,
        w: w1 + w2,
        h: h1 + h2
    };
}
function $f24ba20eaa648c59$export$29c11b0e5eb0387a(x, y, w, h, px, py) {
    return px - x > (0, $c9ea38e06f6b67c3$export$d971781c6009eb20) && py - y > (0, $c9ea38e06f6b67c3$export$d971781c6009eb20) && x + w - px > (0, $c9ea38e06f6b67c3$export$d971781c6009eb20) && y + h - py > (0, $c9ea38e06f6b67c3$export$d971781c6009eb20);
}
function $f24ba20eaa648c59$export$a298d70a4ea5c38c(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1;
}
function $f24ba20eaa648c59$export$dc5a28bb7d6b43c(x1, y1, w1, h1, x2, y2, w2, h2) {
    const dx = x1 - x2 + (w1 - w2) / 2;
    const dy = y1 - y2 + (h1 - h2) / 2;
    return dx * dx + dy * dy;
}
function $f24ba20eaa648c59$export$d5885a9399d7595f(x1, y1, w1, h1, x2, y2, w2, h2, goalX, goalY) {
    const _goalX = isNaN(goalX) ? x1 : goalX;
    const _goalY = isNaN(goalY) ? y1 : goalY;
    let dx = _goalX - x1;
    let dy = _goalY - y1;
    const { x: x , y: y , w: w , h: h  } = $f24ba20eaa648c59$export$41d8adf939ed37ff(x1, y1, w1, h1, x2, y2, w2, h2);
    let overlaps;
    let nx, ny;
    let ti;
    // If the item was intersecting other
    if ($f24ba20eaa648c59$export$29c11b0e5eb0387a(x, y, w, h, 0, 0)) {
        let { x: px , y: py  } = $f24ba20eaa648c59$export$f653518feb1a7300(x, y, w, h, 0, 0);
        let wi = Math.min(w1, Math.abs(px)); // area of intersection
        let hi = Math.min(h1, Math.abs(py)); // area of intersection
        ti = -wi * hi; // `ti` is the negative area of intersection
        overlaps = true;
    } else {
        let [ti1, ti2, nx1, ny1] = $f24ba20eaa648c59$export$a3b9375a9680aa1a(x, y, w, h, 0, 0, dx, dy, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
        ti1;
        // item tunnels into other
        if (!isNaN(ti1) && ti1 < 1 && Math.abs(ti1 - (ti2 || 0)) >= (0, $c9ea38e06f6b67c3$export$d971781c6009eb20) && (0 < ti1 + (0, $c9ea38e06f6b67c3$export$d971781c6009eb20) || 0 === ti1 && (ti2 || 0) > 0)) {
            ti = ti1;
            nx = nx1;
            ny = ny1;
            overlaps = false;
        }
    }
    if (isNaN(ti)) return;
    let tx, ty;
    if (overlaps) {
        if (dx === 0 && dy === 0) {
            //intersecting and not moving - use minimum displacement vector
            let { x: px , y: py  } = $f24ba20eaa648c59$export$f653518feb1a7300(x, y, w, h, 0, 0);
            if (Math.abs(px) < Math.abs(py)) py = 0;
            else px = 0;
            nx = Math.sign(px);
            ny = Math.sign(py);
            tx = x1 + px;
            ty = y1 + py;
        } else {
            //intersecting and moving - move in the opposite direction
            // @ts-ignore
            let [ti1, _, _nx, _ny] = $f24ba20eaa648c59$export$a3b9375a9680aa1a(x, y, w, h, 0, 0, dx, dy, -Number.MAX_SAFE_INTEGER, 1);
            nx = _nx;
            ny = _ny;
            if (!ti1) return;
            tx = x1 + dx * ti1;
            ty = y1 + dy * ti1;
        }
    } else {
        // @ts-ignore
        tx = x1 + dx * ti;
        // @ts-ignore
        ty = y1 + dy * ti;
    }
    return {
        overlaps: overlaps,
        ti: // @ts-ignore
        ti,
        move: {
            x: dx,
            y: dy
        },
        normal: {
            x: nx,
            y: ny
        },
        touch: {
            x: tx,
            y: ty
        },
        itemRect: {
            x: x1,
            y: y1,
            w: w1,
            h: h1
        },
        otherRect: {
            x: x2,
            y: y2,
            w: w2,
            h: h2
        }
    };
}


function $8fc6ccbc1f1af223$export$a28cf8d4b8e18f55(cellSize, cx, cy) {
    return [
        (cx - 1) * cellSize,
        (cy - 1) * cellSize
    ];
}
function $8fc6ccbc1f1af223$export$8369d06a70f95b44(cellSize, x, y) {
    return [
        Math.floor(x / cellSize) + 1,
        Math.floor(y / cellSize) + 1
    ];
}
function $8fc6ccbc1f1af223$export$dae871fd9623cca5(cellSize, ct, t1, t2) {
    const v = t2 - t1;
    if (v > 0) return [
        1,
        cellSize / v,
        ((ct + v) * cellSize - t1) / v
    ];
    else if (v < 0) return [
        -1,
        -cellSize / v,
        ((ct + v - 1) * cellSize - t1) / v
    ];
    else return [
        0,
        Number.MAX_SAFE_INTEGER,
        Number.MAX_SAFE_INTEGER
    ];
}
function $8fc6ccbc1f1af223$export$c32d83d2523ad1a6(cellSize, x1, y1, x2, y2, traverseFunction) {
    const [cx1, cy1] = $8fc6ccbc1f1af223$export$8369d06a70f95b44(cellSize, x1, y1);
    const [cx2, cy2] = $8fc6ccbc1f1af223$export$8369d06a70f95b44(cellSize, x2, y2);
    let [stepX, dx, tx] = $8fc6ccbc1f1af223$export$dae871fd9623cca5(cellSize, cx1, x1, x2);
    let [stepY, dy, ty] = $8fc6ccbc1f1af223$export$dae871fd9623cca5(cellSize, cy1, y1, y2);
    let [cx, cy] = [
        cx1,
        cy1
    ];
    traverseFunction(cx, cy);
    // The default implementation had an infinite loop problem when
    // approaching the last cell in some occassions. We finish iterating
    // when we are *next* to the last cell.
    do if (tx < ty) {
        [tx, cx] = [
            tx + dx,
            cx + stepX
        ];
        traverseFunction(cx, cy);
    } else {
        // Addition: include both cells when going through corners
        if (tx == ty) traverseFunction(cx + stepX, cy);
        ty = ty + dy;
        cy = cy + stepY;
        traverseFunction(cx, cy);
    }
    while (Math.abs(cx - cx2) + Math.abs(cy - cy2) > 1);
    //If we have not arrived to the last cell, use it
    if (cx != cx2 || cy != cy2) traverseFunction(cx2, cy2);
}
function $8fc6ccbc1f1af223$export$d14a64bab45dab8a(cellSize, x, y, w, h) {
    let [cx, cy] = $8fc6ccbc1f1af223$export$8369d06a70f95b44(cellSize, x, y);
    const cr = Math.ceil((x + w) / cellSize);
    const cb = Math.ceil((y + h) / cellSize);
    return [
        cx,
        cy,
        cr - cx + 1,
        cb - cy + 1
    ];
}



function $47667b5a51279041$export$2e2bcd8739ae039(desiredType, value, name) {
    if (typeof value !== desiredType) throw new Error(`"${name}" must be a ${desiredType}, but was a ${value} (${typeof value})`);
}


function $3e883dd0bc8c61b8$export$2e2bcd8739ae039(x, y, w, h) {
    (0, $47667b5a51279041$export$2e2bcd8739ae039)("number", x, "x");
    (0, $47667b5a51279041$export$2e2bcd8739ae039)("number", y, "y");
    (0, $cf8cbfeb7a27e10c$export$2e2bcd8739ae039)(w, "w");
    (0, $cf8cbfeb7a27e10c$export$2e2bcd8739ae039)(h, "h");
}


function $f4687a288c50c26e$export$d0b7ea69ab6056df(_world, column, _x, _y, _w, _h, _goalX, _goalY, _filter) {
    return {
        x: column.touch.x,
        y: column.touch.y,
        collisions: []
    };
}
function $f4687a288c50c26e$export$bb646b20bb93d339(world, column, x, y, w, h, goalX, goalY, filter) {
    const collisions = world.project(column.item, x, y, w, h, goalX, goalY, filter);
    return {
        x: goalX,
        y: goalY,
        collisions: collisions
    };
}
function $f4687a288c50c26e$export$c1742949d0193489(world, column, x, y, w, h, goalX, goalY, filter) {
    let _goalX = isNaN(goalX) ? x : goalX;
    let _goalY = isNaN(goalY) ? y : goalY;
    const tch = column.touch;
    const move = column.move;
    if (move.x !== 0 || move.y !== 0) {
        if (column.normal.x !== 0) _goalX = tch.x;
        else _goalY = tch.y;
    }
    column.slide = {
        x: _goalX,
        y: _goalY
    };
    const _x = tch.x;
    const _y = tch.y;
    const collisions = world.project(column.item, _x, _y, w, h, _goalX, _goalY, filter);
    return {
        x: _goalX,
        y: _goalY,
        collisions: collisions
    };
}
function $f4687a288c50c26e$export$e3ce947fb98643bf(world, collision, x, y, w, h, goalX, goalY, filter) {
    const _goalX = isNaN(goalX) ? x : goalX;
    const _goalY = isNaN(goalY) ? y : goalY;
    const { touch: touch1 , move: move  } = collision;
    let bx = touch1.x;
    let by = touch1.y;
    if (move.x !== 0 || move.y !== 0) {
        let bnx = _goalX - touch1.x;
        let bny = _goalY - touch1.y;
        if (collision.normal.x === 0) bny = -bny;
        else bnx = -bnx;
        bx = touch1.x + bnx;
        by = touch1.y + bny;
    }
    collision.bounce = {
        x: bx,
        y: by
    };
    const collisions = world.project(collision.item, touch1.x, touch1.y, w, h, bx, by, filter);
    return {
        x: bx,
        y: by,
        collisions: collisions
    };
}



function $29b3cec175a148c2$export$2e2bcd8739ae039(a, b) {
    if (a.ti === b.ti) {
        const ir = a.itemRect;
        const ar = a.otherRect;
        const br = b.otherRect;
        const ad = (0, $f24ba20eaa648c59$export$dc5a28bb7d6b43c)(ir.x, ir.y, ir.w, ir.h, ar.x, ar.y, ar.w, ar.h);
        const bd = (0, $f24ba20eaa648c59$export$dc5a28bb7d6b43c)(ir.x, ir.y, ir.w, ir.h, br.x, br.y, br.w, br.h);
        return ad - bd;
    }
    return a.ti - b.ti;
}


function $be1082e8fceb2f36$var$defaultFilter() {
    return "slide";
}
function $be1082e8fceb2f36$var$sortByWeight(a, b) {
    return a.weight - b.weight;
}
function $be1082e8fceb2f36$var$getCellsTouchedBySegment(self, x1, y1, x2, y2) {
    const cells = [];
    const visited = {};
    (0, $8fc6ccbc1f1af223$export$c32d83d2523ad1a6)(self.cellSize, x1, y1, x2, y2, function(cx, cy) {
        let row = self.rows[cy];
        if (!row) return;
        let cell = row[cx];
        if (!cell || visited[cell.ID]) return;
        visited[cell.ID] = true;
        cells.push(cell);
    });
    return cells;
}
function $be1082e8fceb2f36$var$getInfoAboutItemsTouchedBySegment(self, x1, y1, x2, y2, filter) {
    let cells = $be1082e8fceb2f36$var$getCellsTouchedBySegment(self, x1, y1, x2, y2);
    let rect, l, t, w, h, ti1, ti2;
    let visited = {};
    let itemInfo = [];
    for (const cell of cells){
        if (cell?.items) {
            for (const itemID of Object.keys(cell.items))if (!visited[itemID]) {
                visited[itemID] = true;
                if (!filter || filter(itemID)) {
                    // rect = self['rectsMap'].get(item)
                    rect = self["rects"][itemID];
                    l = rect.x;
                    t = rect.y;
                    w = rect.w;
                    h = rect.h;
                    const arr1 = (0, $f24ba20eaa648c59$export$a3b9375a9680aa1a)(l, t, w, h, x1, y1, x2, y2, 0, 1);
                    ti1 = arr1[0];
                    ti2 = arr1[1];
                    if (!isNaN(ti1) && (0 < ti1 && ti1 < 1 || 0 < ti2 && ti2 < 1)) {
                        // -- the sorting is according to the t of an infinite line, not the segment
                        const [tii0, tii1] = (0, $f24ba20eaa648c59$export$a3b9375a9680aa1a)(l, t, w, h, x1, y1, x2, y2, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
                        itemInfo.push({
                            item: itemID,
                            ti1: ti1,
                            ti2: ti2,
                            weight: Math.min(tii0 || 0, tii1 || 0)
                        });
                    }
                }
            }
        }
    }
    return itemInfo.sort($be1082e8fceb2f36$var$sortByWeight);
}
class $be1082e8fceb2f36$export$812cd9544993280d {
    responses = {};
    cellSize = 0;
    currentIndex = 0;
    constructor(input){
        this.cellSize = input.cellSize;
        this.rects = input.rects;
        this.rows = input.rows;
        this.nonEmptyCells = input.nonEmptyCells;
        this.responses = input.responses;
        this.rectsMap = new WeakMap();
        this.reverseIdMap = new Map();
        this.currentIndex = 0;
    }
    addResponse(name, response) {
        this.responses[name] = response;
    }
    getResponseByName(name) {
        const response = this.responses[name];
        if (!response) throw new Error(`Unknown collision type: ${name} (${typeof name})`);
        return response;
    }
    // TODO: make the function take objects (maybe, if kept public)
    project(itemID, x, y, w, h, goalX, goalY, filter) {
        (0, $3e883dd0bc8c61b8$export$2e2bcd8739ae039)(x, y, w, h);
        const _goalX = isNaN(goalX) ? x : goalX;
        const _goalY = isNaN(goalY) ? y : goalY;
        const _filter = filter || $be1082e8fceb2f36$var$defaultFilter;
        let collisions = [];
        let visited = {};
        if (itemID) visited[itemID] = true;
        // This could probably be done with less cells using a polygon raster over the cells instead of a
        // bounding rect of the whole movement.Conditional to building a queryPolygon method
        let tl = Math.min(_goalX, x);
        let tt = Math.min(_goalY, y);
        let tr = Math.max(_goalX + w, x + w);
        let tb = Math.max(_goalY + h, y + h);
        let tw = tr - tl;
        let th = tb - tt;
        let [cl, ct, cw, ch] = (0, $8fc6ccbc1f1af223$export$d14a64bab45dab8a)(this.cellSize, tl, tt, tw, th);
        let dictItemsInCellRect = this.getDictItemsInCellRect(cl, ct, cw, ch);
        for (const other of Object.keys(dictItemsInCellRect))if (!visited[other]) {
            visited[other] = true;
            const responseName = _filter(itemID, other);
            if (responseName && /* why do I have to do this extra check? */ this._hasItem(other)) {
                let otherRect = this._getRect(other);
                let collision = (0, $f24ba20eaa648c59$export$d5885a9399d7595f)(x, y, w, h, otherRect.x, otherRect.y, otherRect.w, otherRect.h, _goalX, _goalY);
                if (collision) {
                    collision.other = other;
                    collision.otherObj = this.reverseIdMap.get(other);
                    collision.item = itemID;
                    // @ts-ignore
                    collision.itemObj = this.reverseIdMap.get(itemID);
                    collision.type = responseName;
                    collisions.push(collision);
                }
            }
        }
        return collisions.sort((0, $29b3cec175a148c2$export$2e2bcd8739ae039));
    }
    countCells() {
        let count = 0;
        for (const row1 of this.rows.filter((row)=>!!row))for (const _col of row1)if (!!_col) count++;
        return count;
    }
    // public
    hasItem(item) {
        const itemID = this.rectsMap.get(item);
        if (itemID === undefined) return false;
        // return this.rectsMap.has(item);
        return !!this.rects[itemID];
    }
    _hasItem(item) {
        return !!this.rects[item];
    }
    getItems() {
        return Object.keys(this.rects).map((rectID)=>this.rects[rectID]);
    }
    countItems() {
        return Object.keys(this.rects).length;
    }
    addItemToCell(itemID, cx, cy) {
        this.rows[cy] = this.rows[cy] || [];
        const row = this.rows[cy];
        // Initialize a cell if no cell is present at this point
        if (!row[cx]) row[cx] = {
            ID: `Cell_${Math.ceil(Math.random() * Date.now()).toString(36)}`,
            x: cx,
            y: cy,
            items: {}
        };
        const cell = row[cx];
        this.nonEmptyCells[cell.ID] = true;
        if (!cell.items[itemID]) cell.items[itemID] = true;
    }
    // public
    getRect(item) {
        const itemID = this.rectsMap.get(item);
        if (itemID === undefined) throw new Error(`Item "${itemID}" must be added to the world before getting its rect. Use world:add(item, x,y,w,h) to add it first.`);
        return this._getRect(itemID);
    }
    _getRect(itemID) {
        let rect = this.rects[itemID];
        if (!rect) throw new Error(`Item "${itemID}" must be added to the world before getting its rect. Use world:add(item, x,y,w,h) to add it first.`);
        return {
            x: rect.x,
            y: rect.y,
            w: rect.w,
            h: rect.h
        };
    }
    // public
    getDictItemsInCellRect(cl, ct, cw, ch) {
        const items_dict = {};
        for(let cy = ct; cy <= ct + ch - 1; cy++){
            let row = this.rows[cy];
            if (row) for(let cx = cl; cx <= cl + cw - 1; cx++){
                let cell = row[cx];
                if (cell?.items && Object.keys(cell.items)?.length > 0) // no cell.itemCount > 1 because tunneling
                for (const itemID of Object.keys(cell.items))items_dict[itemID] = true;
            }
        }
        return items_dict;
    }
    removeItemFromCell(itemID, cx, cy) {
        let row = this.rows[cy];
        if (!row?.[cx]?.["items"]?.[itemID]) return false;
        let cell = row[cx];
        delete cell.items[itemID];
        if (Object.keys(cell.items)?.length === 0) delete this.nonEmptyCells[cell.ID];
        return true;
    }
    // public
    toWorld(cx, cy) {
        return (0, $8fc6ccbc1f1af223$export$a28cf8d4b8e18f55)(this.cellSize, cx, cy);
    }
    // public
    toCell(x, y) {
        return (0, $8fc6ccbc1f1af223$export$8369d06a70f95b44)(this.cellSize, x, y);
    }
    // public
    queryRect(x, y, w, h, filter) {
        (0, $3e883dd0bc8c61b8$export$2e2bcd8739ae039)(x, y, w, h);
        const [cl, ct, cw, ch] = (0, $8fc6ccbc1f1af223$export$d14a64bab45dab8a)(this.cellSize, x, y, w, h);
        const dictItemsInCellRect = this.getDictItemsInCellRect(cl, ct, cw, ch);
        const items = [];
        for (const itemID of Object.keys(dictItemsInCellRect))if ((!filter || filter(itemID)) && (0, $f24ba20eaa648c59$export$a298d70a4ea5c38c)(x, y, w, h, this.rects[itemID].x, this.rects[itemID].y, this.rects[itemID].w, this.rects[itemID].h)) items.push(itemID);
        return items;
    }
    // public
    queryPoint(x, y, filter) {
        const [cx, cy] = this.toCell(x, y);
        const dictItemsInCellRect = this.getDictItemsInCellRect(cx, cy, 1, 1);
        const items = [];
        for (const itemID of Object.keys(dictItemsInCellRect))if ((!filter || filter(itemID)) && (0, $f24ba20eaa648c59$export$29c11b0e5eb0387a)(this.rects[itemID].x, this.rects[itemID].y, this.rects[itemID].w, this.rects[itemID].h, x, y)) items.push(itemID);
        return items;
    }
    // public
    querySegment(x1, y1, x2, y2, filter) {
        const itemsInfo = $be1082e8fceb2f36$var$getInfoAboutItemsTouchedBySegment(this, x1, y1, x2, y2, filter);
        const items = [];
        if (itemsInfo) for (const itemInfo of itemsInfo)items.push(itemInfo.item);
        return items;
    }
    // public
    querySegmentWithCoords(x1, y1, x2, y2, filter) {
        let itemInfo = $be1082e8fceb2f36$var$getInfoAboutItemsTouchedBySegment(this, x1, y1, x2, y2, filter);
        let dx = x2 - x1;
        let dy = y2 - y1;
        let info;
        let ti1;
        let ti2;
        for (const item of itemInfo){
            info = item;
            ti1 = info.ti1;
            ti2 = info.ti2;
            info.weight = null;
            info.x1 = x1 + dx * ti1;
            info.y1 = y1 + dy * ti1;
            info.x2 = x1 + dx * ti2;
            info.y2 = y1 + dy * ti2;
        }
        return itemInfo;
    }
    getItemByIndex(itemID) {
        return this.reverseIdMap.get(itemID);
    }
    // public
    add(item, x, y, w, h) {
        if (!this.rectsMap.has(item)) {
            this.rectsMap.set(item, (++this.currentIndex).toString());
            // @ts-ignore
            this.reverseIdMap.set(this.rectsMap.get(item), item);
        }
        const itemID = this.rectsMap.get(item);
        if (itemID === undefined) throw new Error(`Something went horribly wrong, an item was added but it's not in the map`);
        const rect = this.rects[itemID];
        if (rect) throw new Error(`Item "${itemID}" added to the world twice.`);
        (0, $3e883dd0bc8c61b8$export$2e2bcd8739ae039)(x, y, w, h);
        this.rects[itemID] = {
            x: x,
            y: y,
            w: w,
            h: h
        };
        const [cl, ct, cw, ch] = (0, $8fc6ccbc1f1af223$export$d14a64bab45dab8a)(this.cellSize, x, y, w, h);
        for(let cy = ct; cy < ct + ch; cy++)for(let cx = cl; cx < cl + cw; cx++)this.addItemToCell(itemID, cx, cy);
        return itemID;
    }
    // public
    remove(item) {
        const itemID = this.rectsMap.get(item);
        if (itemID === undefined) {
            console.log("Trying to delete item that doesn't exist. Doing nothing");
            return;
        }
        this._remove(itemID);
        this.rectsMap.delete(item);
        this.reverseIdMap.delete(itemID);
    }
    _remove(itemID) {
        const itemRect = JSON.parse(JSON.stringify(this._getRect(itemID)));
        delete this.rects[itemID];
        let [cl, ct, cw, ch] = (0, $8fc6ccbc1f1af223$export$d14a64bab45dab8a)(this.cellSize, itemRect.x, itemRect.y, itemRect.w, itemRect.h);
        for(let cy = ct; cy < ct + ch; cy++)for(let cx = cl; cx < cl + cw; cx++)this.removeItemFromCell(itemID, cx, cy);
    }
    // public
    update(itemID, x2, y2, w2, h2) {
        let itemRect = this._getRect(itemID);
        w2 = isNaN(w2) ? itemRect.w : w2;
        h2 = isNaN(h2) ? itemRect.h : h2;
        (0, $3e883dd0bc8c61b8$export$2e2bcd8739ae039)(x2, y2, w2, h2);
        if (itemRect.x != x2 || itemRect.y != y2 || itemRect.w != w2 || itemRect.h != h2) {
            const [cl1, ct1, cw1, ch1] = (0, $8fc6ccbc1f1af223$export$d14a64bab45dab8a)(this.cellSize, itemRect.x, itemRect.y, itemRect.w, itemRect.h);
            const [cl2, ct2, cw2, ch2] = (0, $8fc6ccbc1f1af223$export$d14a64bab45dab8a)(this.cellSize, x2, y2, w2, h2);
            if (cl1 != cl2 || ct1 != ct2 || cw1 != cw2 || ch1 != ch2) {
                const cr1 = cl1 + cw1 - 1;
                const cb1 = ct1 + ch1 - 1;
                const cr2 = cl2 + cw2 - 1;
                const cb2 = ct2 + ch2 - 1;
                let cyOut;
                for(let cy = ct1; cy <= cb1; cy++){
                    cyOut = Number(cy) < ct2 || cy > cb2;
                    for(let cx = cl1; cx <= cr1; cx++)if (cyOut || cx < cl2 || cx > cr2) this.removeItemFromCell(itemID, cx, cy);
                }
                for(let cy1 = ct2; cy1 <= cb2; cy1++){
                    cyOut = cy1 < ct1 || cy1 > cb1;
                    for(let cx = cl2; cx <= cr2; cx++)if (cyOut || cx < cl1 || cx > cr1) this.addItemToCell(itemID, cx, cy1);
                }
            }
            const rect = this.rects[itemID];
            rect.x = x2;
            rect.y = y2;
            rect.w = w2;
            rect.h = h2;
        }
    }
    // public
    move(item, goalX, goalY, filter) {
        const itemID = this.rectsMap.get(item);
        if (itemID === undefined) throw new Error("Trying to move item that doesn't exist.");
        return this._move(itemID, goalX, goalY, filter);
    }
    _move(itemID, goalX, goalY, filter) {
        const { x: x , y: y , collisions: collisions  } = this._check(itemID, goalX, goalY, filter);
        this.update(itemID, x, y);
        return {
            x: x,
            y: y,
            collisions: collisions
        };
    }
    // public
    // TODO: make the function take objects
    check(item, goalX, goalY, filter) {
        const itemID = this.rectsMap.get(item);
        if (itemID === undefined) throw new Error("Trying to check item that doesn't exist.");
        return this._check(itemID, goalX, goalY, filter);
    }
    _check(itemID, goalX, goalY, filter) {
        let _goalX = goalX;
        let _goalY = goalY;
        const checkFilter = filter || $be1082e8fceb2f36$var$defaultFilter;
        let visited = {};
        visited[itemID] = true;
        const visitedFilter = (itm, other)=>!!visited[other] ? false : checkFilter(itm, other);
        let detectedCollisions = [];
        const itemRect = this._getRect(itemID);
        // this is returning an empty array. WHY?
        let projectedCollisions = this.project(itemID, itemRect.x, itemRect.y, itemRect.w, itemRect.h, _goalX, _goalY, visitedFilter);
        let collisionsCounter = projectedCollisions?.length || 0;
        while(collisionsCounter > 0){
            const collision = projectedCollisions[0];
            detectedCollisions.push(collision);
            visited[collision.other] = true;
            let response = this.getResponseByName(collision.type);
            const { x: x , y: y , collisions: collisions  } = response(this, collision, itemRect.x, itemRect.y, itemRect.w, itemRect.h, _goalX, _goalY, visitedFilter);
            _goalX = x;
            _goalY = y;
            projectedCollisions = collisions;
            collisionsCounter = collisions?.length || 0;
        }
        return {
            x: _goalX,
            y: _goalY,
            collisions: detectedCollisions
        };
    }
}
// Public library functions
const $be1082e8fceb2f36$var$bump = {
    newWorld: function(cellSize) {
        cellSize = cellSize || 64;
        (0, $cf8cbfeb7a27e10c$export$2e2bcd8739ae039)(cellSize, "cellSize");
        const world = new $be1082e8fceb2f36$export$812cd9544993280d({
            cellSize: cellSize,
            rects: {},
            rows: [],
            nonEmptyCells: {},
            responses: {}
        });
        world.addResponse("touch", (0, $f4687a288c50c26e$export$d0b7ea69ab6056df));
        world.addResponse("cross", (0, $f4687a288c50c26e$export$bb646b20bb93d339));
        world.addResponse("slide", (0, $f4687a288c50c26e$export$c1742949d0193489));
        world.addResponse("bounce", (0, $f4687a288c50c26e$export$e3ce947fb98643bf));
        return world;
    },
    rect: {
        getNearestCorner: (0, $f24ba20eaa648c59$export$f653518feb1a7300),
        getSegmentIntersectionIndices: (0, $f24ba20eaa648c59$export$a3b9375a9680aa1a),
        getDiff: (0, $f24ba20eaa648c59$export$41d8adf939ed37ff),
        containsPoint: (0, $f24ba20eaa648c59$export$29c11b0e5eb0387a),
        isIntersecting: (0, $f24ba20eaa648c59$export$a298d70a4ea5c38c),
        getSquareDistance: (0, $f24ba20eaa648c59$export$dc5a28bb7d6b43c),
        detectCollision: (0, $f24ba20eaa648c59$export$d5885a9399d7595f)
    },
    responses: {
        touch: $f4687a288c50c26e$export$d0b7ea69ab6056df,
        cross: $f4687a288c50c26e$export$bb646b20bb93d339,
        slide: $f4687a288c50c26e$export$c1742949d0193489,
        bounce: $f4687a288c50c26e$export$e3ce947fb98643bf
    }
};
var $be1082e8fceb2f36$export$2e2bcd8739ae039 = Object.freeze($be1082e8fceb2f36$var$bump);


// turn "a collides with b on the right side" to
// "b collides with a on the left side"
// 'touch', 'slide' and 'bounce' are incorrect,
// but in this case 'other' should never move, so they
// should never be used 
function $25a1d2e5faf07348$var$invertCollision(c) {
    return {
        other: c.item,
        item: c.other,
        otherObj: c.itemObj,
        itemObj: c.otherObj,
        type: c.type,
        overlaps: c.overlaps,
        ti: c.ti,
        move: {
            x: 0,
            y: 0
        },
        normal: {
            x: -c.normal.x,
            y: -c.normal.y
        },
        touch: c.touch,
        itemRect: c.otherRect,
        otherRect: c.itemRect,
        slide: c.slide,
        bounce: c.bounce
    };
}
// convert origin string to a vec2 offset
function $25a1d2e5faf07348$var$originPt(orig) {
    switch(orig){
        case "topleft":
            return vec2(-1, -1);
        case "top":
            return vec2(0, -1);
        case "topright":
            return vec2(1, -1);
        case "left":
            return vec2(-1, 0);
        case "center":
            return vec2(0, 0);
        case "right":
            return vec2(1, 0);
        case "botleft":
            return vec2(-1, 1);
        case "bot":
            return vec2(0, 1);
        case "botright":
            return vec2(1, 1);
        default:
            return orig;
    }
}
var $25a1d2e5faf07348$export$2e2bcd8739ae039 = (k)=>{
    // only one global collision world now 
    const world = (0, $be1082e8fceb2f36$export$2e2bcd8739ae039).newWorld(50);
    function barea() {
        // entry where key="wall", value="slide" means when colliding with
        // an object with a tag "wall" the collision response should be "slide"
        const filterCollection = {};
        let bfilter = (_, other)=>{
            for (const [key, value] of Object.entries(filterCollection)){
                const otherObj = world.getItemByIndex(other);
                if (!otherObj) continue;
                // @ts-ignore
                if (otherObj.is(key)) return value;
            }
            return undefined;
        };
        return {
            id: "barea",
            require: [
                "pos",
                "area"
            ],
            barea: {
                w: 0,
                h: 0,
                offset: vec2(0)
            },
            load () {
                let w = this.area.width ?? this.width;
                let h = this.area.height ?? this.height;
                if (w == null || h == null) throw new Error("failed to get area dimension");
                const scale = vec2(this.scale ?? 1);
                w *= scale.x;
                h *= scale.y;
                this.barea.w = w;
                this.barea.h = h;
                const orig = $25a1d2e5faf07348$var$originPt(this.origin || "topleft");
                const bareaOffset = orig.add(1, 1).scale(0.5).scale(w, h);
                const pos = (this.pos ?? vec2(0)).sub(bareaOffset);
                this.barea.offset = bareaOffset;
                world.add(this, pos.x, pos.y, w, h);
            },
            bmoveTo (dest) {
                // move within the Bump world, result is the final coordinates
                // after all the collidions
                // can safely teleport (moveTo) to them afterwards
                // apply offset
                const pos = dest.sub(this.barea.offset);
                const { x: x , y: y , collisions: collisions  } = world.move(this, pos.x, pos.y, bfilter);
                // reverse apply offset
                const goal = vec2(x, y).add(this.barea.offset);
                this.moveTo(goal.x, goal.y);
                for (const col of collisions){
                    this.trigger("bumpcollide", col.otherObj, col);
                    // @ts-ignore
                    col.otherObj.trigger("bumpcollide", this, $25a1d2e5faf07348$var$invertCollision(col));
                }
            },
            bmove (...args) {
                if (typeof args[0] === "number" && typeof args[1] === "number") return this.bmove(vec2(args[0], args[1]));
                this.bmoveTo(k.vec2(this.pos.x + args[0].x * dt(), this.pos.y + args[0].y * dt()));
            },
            addBumpCollision (tag, response) {
                filterCollection[tag] = response;
            },
            onBumpCollision (tag, f) {
                return this.on("bumpcollide", (obj, col)=>{
                    obj.is(tag) && f(obj, col);
                });
            }
        };
    }
    return {
        barea: barea
    };
};


export {$25a1d2e5faf07348$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=bump-kaboom.js.map
