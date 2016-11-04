/*
The MIT License (MIT)

Copyright (c) 2016 granz.fisherman@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
var Settings = {};
Settings.running = false;
Settings.abort = false;

window.onload = function () {
    onLoadItems();
}

function onLoadItems() {
    var list = [];
    for (var name in Items) {
        var item = Items[name];
        var displayName = item.listName ? item.listName : item.displayName;
        list.push({ value: name, text: displayName });
    }
    setSelectList("item", list);

    onChangeItem();
}

function onChangeItem() {
    var item = getSelectedItem();

    var list = [];
    for (var name in item.types)
        list.push({ value: name, text: item.types[name].displayName });
    setSelectList("type", list);

    onChangeType();
}

function onChangeType() {
    var type = getSelectedType();

    setCondition(1, type.cond1);
    setCondition(2, type.cond2);
    setCondition(3, type.cond3);
    setCondition(4, type.cond4);
    setCondition(5, type.cond5);

    updateConditionValueRange();
}

function onChangeStone() {
    updateConditionValueRange();
}

function onChangeCondition(index) {
    var id = getConditionId(index);
    var cond = getSelectedCondition(index);
    setInputString(id.value, cond.value);

    updateConditionValueRange();
}

function onStart() {
    if (Settings.running) return;
    Settings.running = true;
    Settings.abort = false;

    clampConditionValues();

    var args = {};
    args.times = 0;
    args.item = getSelectedItem();
    args.type = getSelectedType();
    args.stone = getSelectedStone();
    args.cond1 = getSelectedConditionValue(1);
    args.cond2 = getSelectedConditionValue(2);
    args.cond3 = getSelectedConditionValue(3);
    args.cond4 = getSelectedConditionValue(4);
    args.cond5 = getSelectedConditionValue(5);
    args.slice = getSelectListValue("slice");
    args.ag = null;

    timerLoop(runSimulation, args, args.slice);
}

function onAbort() {
    Settings.abort = true;
}

function getConditionId(index) {
    return {
        list: "cond" + index,
        value: "cond" + index + "value",
        range: "cond" + index + "range",
    };
}

function setCondition(index, conds) {
    var id = getConditionId(index);

    var list = [];
    for (var i = 0; i < conds.length; i++) {
        var cond = conds[i];
        list.push({ value: cond.name, text: cond.name });
    }
    setSelectList(id.list, list);

    setInputString(id.value, conds[0].value);
}

function getSelectedItem() {
    var name = getSelectListString("item");
    return Items[name];
}

function getSelectedType() {
    var item = getSelectedItem();
    var name = getSelectListString("type");
    return item.types[name];
}

function getSelectedStone() {
    return getSelectListValue("stone");
}

function updateConditionValueRange() {
    var stone = getSelectedStone();

    setConditionValueRange(1, stone);
    setConditionValueRange(2, stone);
    setConditionValueRange(3, stone);
    setConditionValueRange(4, stone);
    setConditionValueRange(5, stone);
}

function setConditionValueRange(index, stone) {
    var id = getConditionId(index);
    var cond = getSelectedCondition(index);
    var bonus = (cond.bonus && cond.stone == stone) ? cond.bonus : 0;
    var max = cond.max + bonus;

    displayString(id.range, cond.min + "-" + max);
}

function getSelectedCondition(index) {
    var id = getConditionId(index);
    var type = getSelectedType();
    var conds = type[id.list];
    var condName = getSelectListString(id.list);

    for (var i = 0; i < conds.length; i++) {
        if (conds[i].name == condName)
            return conds[i];
    }

    return null;
}

function getSelectedConditionValue(index) {
    var id = getConditionId(index);
    return {
        name: getSelectListString(id.list),
        value: getInputValue(id.value),
    };
}

function clampConditionValues() {
    var stone = getSelectedStone();

    clampConditionValue(1, stone);
    clampConditionValue(2, stone);
    clampConditionValue(3, stone);
    clampConditionValue(4, stone);
    clampConditionValue(5, stone);
}

function clampConditionValue(index, stone) {
    var id = getConditionId(index);
    var cond = getSelectedCondition(index);
    var bonus = (cond.bonus && cond.stone == stone) ? cond.bonus : 0;
    var max = cond.max + bonus;

    var value = getInputValue(id.value);
    if (value < cond.min) value = cond.min;
    if (value > max) value = max;

    setInputString(id.value, value);
}

function runSimulation() {
    if (Settings.abort) {
        displayProgress(this);
        displayAbortResult(this);

        Settings.running = false;
        return false;
    }

    this.ag = createAG(this.type, this.stone);

    this.times++;
    if (this.times % this.slice == 0)
        displayProgress(this);

    if (!checkCondition(this.ag, this.cond1)) return true;
    if (!checkCondition(this.ag, this.cond2)) return true;
    if (!checkCondition(this.ag, this.cond3)) return true;
    if (!checkCondition(this.ag, this.cond4)) return true;
    if (!checkCondition(this.ag, this.cond5)) return true;

    displayProgress(this);
    displayResult(this);

    Settings.running = false;
    return false;
}

function checkCondition(ag, cond) {
    if (cond.value == 0) return true;

    var value = ag[cond.name];
    if (isNaN(value))
        value = 0;

    return value >= cond.value;
}

function displayProgress(result) {
    displayValue("resultTimes", result.times);
}

function displayResult(result) {
    var stone = Stone.toString(result.stone);
    var times = result.times.toLocaleString();
    var item = result.item.displayName;
    var ag = makeAgString(result.ag);

    var msg = stone + "を" + times + "個消費して";
    msg += item + "にオグメを付けました。\n";
    msg += ag + "\n";
    msg += window.location.href;

    displayTextArea("message", msg);

    var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(msg);
    displayLink("link", "Twitterに投稿", url);
}

function displayAbortResult(result) {
    var stone = Stone.toString(result.stone);
    var times = result.times.toLocaleString();
    var item = result.item.displayName;
    var cond = makeCondString(result);

    var msg = stone + "を" + times + "個消費して理想の";
    msg += item + "を諦めました。\n";
    msg += "(条件: " + cond + ")\n";
    msg += window.location.href;

    displayTextArea("message", msg);

    var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(msg);
    displayLink("link", "Twitterに投稿", url);
}

function makeAgString(ag) {
    var list = [];
    var keys = Object.keys(ag).sort();
    for (var i = 0; i < keys.length; i++)
        list.push(keys[i] + ag[keys[i]]);
    return list.join(" ");
}

function makeCondString(result) {
    var conds = [result.cond1, result.cond2, result.cond3, result.cond4, result.cond5];

    var list = [];
    for (var i = 0; i < conds.length; i++) {
        var cond = conds[i];
        if (cond.value != 0)
            list.push(cond.name + cond.value);
    }

    return list.join(" ").trim();
}

function displayLink(id, text, url) {
    var elem = document.getElementById(id);
    elem.href = url;
    displayString(id, text);
}

function displayString(id, s) {
    var elem = document.getElementById(id);
    while (elem.firstChild)
        elem.removeChild(elem.firstChild);

    var lines = s.split("\n");
    if (lines.length > 0) {
        elem.appendChild(document.createTextNode(lines[0]));
        for (var i = 1; i < lines.length; i++) {
            elem.appendChild(document.createElement("br"));
            elem.appendChild(document.createTextNode(lines[i]));
        }
    }
}

function displayValue(id, value) {
    displayString(id, value.toLocaleString());
}

function displayTextArea(id, s) {
    var elem = document.getElementById(id);
    elem.value = s;
}

function displayValuePer(id, num, numAll) {
    if (numAll == 0) {
        displayString(id, "-");
    } else {
        var per = num * 100 / numAll;
        displayString(id, per.toFixed(4) + "%");
    }
}

function getSelectListString(id) {
    var select = document.getElementById(id);
    var i = select.selectedIndex;
    return select.options[i].value;
}

function getSelectListValue(id) {
    var n = parseInt(getSelectListString(id));
    return isNaN(n) ? 0 : n;
}

function setSelectList(id, list) {
    var select = document.getElementById(id);
    select.options.length = list.length;

    for (var i = 0; i < list.length; i++) {
        select.options[i].value = list[i].value;
        select.options[i].text = list[i].text;
    }
}

function getInputValue(id) {
    var input = document.getElementById(id);
    var n = parseInt(input.value);
    return isNaN(n) ? 0 : n;
}

function setInputString(id, s) {
    var input = document.getElementById(id);
    input.value = s;
}

function timerLoop(mainLoop, thisObject, slice, interval) {
    if (!slice) slice = 127;
    if (!interval) interval = 0;

    var beginLoop = function (thisObject) {
        for (var i = 0; i < slice; i++) {
            if (!mainLoop.call(thisObject))
                return;
        }
        setTimeout(arguments.callee, interval, thisObject);
    }
    beginLoop(thisObject);
}

var Random = {};

Random.mt = (function () {
    var mt = new MT19937ar();

    var keys = [];
    for (var i = 0; i < 128; i++)
        keys.push((Math.random() * 4294967296.0) >>> 0);
    mt.init_by_array(keys);

    return mt;
})();

Random.nextf = function () {
    return Random.mt.genrand_real2();
}

Random.next = function (min, max) {
    if (arguments.length == 1)
        return Random.next1(min);
    else if (arguments.length == 2)
        return Random.next2(min, max);
    else
        throw { name: "ArgumentException" };
}

Random.next1 = function (max) {
    return Math.floor(Random.mt.genrand_real2() * max);
}

Random.next2 = function (min, max) {
    return Random.next1(max - min) + min;
}

Random.shuffle = function (list, swap) {
    if (arguments.length == 1)
        return Random.shuffle1(list);
    else if (arguments.length == 2)
        return Random.shuffle2(list, swap);
    else
        throw { name: "ArgumentException" };
}

Random.shuffle1 = function (list) {
    var size = list.length;
    for (var i = 0; i < size; i++) {
        var r = Random.next(i, size);
        var temp = list[i];
        list[i] = list[r];
        list[r] = temp;
    }
}

Random.shuffle2 = function (list, swap) {
    var size = list.length;
    for (var i = 0; i < size; i++) {
        var r = Random.next(i, size);
        swap(list[i], list[r]);
    }
}

function randomChoice(list) {
    if (list.length == 0) return null;
    if (list.length == 1) return list[0];

    var totalWeight = 0;
    for (var i = 0; i < list.length; i++)
        totalWeight += list[i].weight;

    var r = Random.nextf() * totalWeight;
    var threshold = 0;
    var item;
    for (var i = 0; i < list.length; i++) {
        item = list[i];
        threshold += item.weight;
        if (threshold > r)
            break;
    }

    return item;
}

// 1-10: 10=10% 9=10% 8=10% ... 1=10%
function randomValueFlat(min, max) {
    return Random.next(min, max + 1);
}

// 1-10 (3/100): 10=3% 9=4.5% 8=6.1% ... 1=17%
function randomValueSlope(min, max, maxValueWeight, totalWeight) {
    var range = max - min + 1;
    var lowerArea = maxValueWeight * range;
    var upperArea = totalWeight - lowerArea;
    var split = range * (range - 1) / 2;
    var step = upperArea / split;

    var r = Random.nextf() * totalWeight;
    var threshold = 0;
    var value = max;
    var weight = maxValueWeight;
    for (var i = 0; i < range; i++) {
        threshold += weight;
        if (threshold > r)
            return value;
        value--;
        weight += step;
    }

    return min;
}

function addPropValue(ag, slot, value) {
    for (var i = 0; i < slot.props.length; i++) {
        var name = slot.props[i];
        if (!ag[name])
            ag[name] = value;
        else
            ag[name] += value;
    }
}

function addProp(ag, slot, stone) {
    var bonus = (slot.bonus && slot.stone == stone) ? slot.bonus : 0;

    var value;
    if (slot.dist == "slope")
        value = randomValueSlope(slot.min, slot.max + bonus, 3, 100);
    else
        value = randomValueFlat(slot.min, slot.max + bonus);

    addPropValue(ag, slot, value);
}

function applySlot(ag, slot, stone) {
    if (slot.random)
        applySlot(ag, randomChoice(slot.random), stone);

    if (slot.props)
        addProp(ag, slot, stone);

    if (slot.extend) {
        for (var i = 0; i < slot.extend.length; i++)
            applySlot(ag, slot.extend[i], stone);
    }
}

function createAG(type, stone) {
    switch (type.type) {
        case "armor":
            return createArmorAG(type, stone);
        case "weapon":
            return createWearponAG(type, stone);
    }
}

function createArmorAG(type, stone) {
    var ag = {};

    if (stone == Stone.WHITE)
        applySlot(ag, type.slot1f, stone);
    else
        applySlot(ag, type.slot1, stone);

    if (stone == Stone.GREEN)
        applySlot(ag, type.slot2f, stone);
    else
        applySlot(ag, type.slot2, stone);

    if (stone == Stone.BLACK)
        applySlot(ag, type.slot3f, stone);
    else
        applySlot(ag, type.slot3, stone);

    return ag;
}

function createWearponAG(type, stone) {
    var ag = {};

    if (stone == Stone.GREEN)
        applySlot(ag, type.slot1f, stone);
    else
        applySlot(ag, type.slot1, stone);

    if (stone == Stone.BLACK)
        applySlot(ag, type.slot2f, stone);
    else
        applySlot(ag, type.slot2, stone);

    applySlot(ag, type.slot3, stone);
    applySlot(ag, type.slot4, stone);
    applySlot(ag, type.slot5, stone);

    return ag;
}

function createConditions(slot) {
    var conds = [];

    if (slot.props && slot.props.length == 1) {
        conds.push({
            name: slot.props[0],
            value: Math.floor((slot.max - slot.min + 1) / 2) + slot.min - 1,
            min: slot.min,
            max: slot.max,
            bonus: slot.bonus,
            stone: slot.stone
        });
    }

    if (slot.random) {
        for (var i = 0; i < slot.random.length; i++)
            conds = conds.concat(createConditions(slot.random[i]));
    }

    if (slot.extend) {
        for (var i = 0; i < slot.extend.length; i++)
            conds = conds.concat(createConditions(slot.extend[i]));
    }

    return conds;
}

function createConditionsWithNone(slot) {
    var conds = createConditions(slot);
    conds.push({ name: "なし", value: 0, min: 0, max: 0 });
    return conds;
}

var Stone = {};
Stone.WHITE = 0;
Stone.GREEN = 1;
Stone.BLACK = 2;
Stone.toString = function (id) {
    switch (id) {
        case Stone.WHITE: return "白魂石";
        case Stone.GREEN: return "緑魂石";
        case Stone.BLACK: return "黒魂石";
    }
    return "unknown";
}
