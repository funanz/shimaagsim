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
Settings.item = null;
Settings.running = false;

window.onload = function () {
    onChangeItem();
}

function onChangeItem() {
    var name = getSelectListString("item");
    var item = Items[name];
    Settings.item = item;

    var list = [];
    for (var name in item.types)
        list.push({ value: name, text: item.types[name].displayName });
    setSelectList("type", list);

    onChangeType();
}

function onChangeType() {
    var name = getSelectListString("type");
    var type = Settings.item.types[name];

    setCondition("cond1", "cond1value", "cond1range", type.cond1);
    setCondition("cond2", "cond2value", "cond2range", type.cond2);
    setCondition("cond3", "cond3value", "cond3range", type.cond3);
    setCondition("cond4", "cond4value", "cond4range", type.cond4);

    updateConditionValueRange();
}

function onChangeStone() {
    updateConditionValueRange();
}

function onChangeCondition(idList, idValue, idRange) {
    var cond = getSelectedCondition(idList);
    setInputString(idValue, cond.value);

    updateConditionValueRange();
}

function onStart(waitSuperBingo) {
    if (Settings.running) return;
    Settings.running = true;

    clampConditionValues();

    var args = {};
    args.times = 0;
    args.item = Settings.item;
    args.type = Settings.item.types[getSelectListString("type")];
    args.stone = getInputValue("stone");
    args.cond1 = { name: getSelectListString("cond1"), value: getInputValue("cond1value") };
    args.cond2 = { name: getSelectListString("cond2"), value: getInputValue("cond2value") };
    args.cond3 = { name: getSelectListString("cond3"), value: getInputValue("cond3value") };
    args.cond4 = { name: getSelectListString("cond4"), value: getInputValue("cond4value") };
    args.slice = 127;
    args.ag = null;

    timerLoop(runSimulation, args, args.slice);
}

function setCondition(idList, idValue, idRange, conds) {
    var list = [];
    for (var i = 0; i < conds.length; i++) {
        var cond = conds[i];
        list.push({ value: cond.name, text: cond.name });
    }
    setSelectList(idList, list);

    setInputString(idValue, conds[0].value);
}

function updateConditionValueRange() {
    var stone = getSelectListValue("stone");
    var bonus3 = (stone == Stone.GREEN) ? 1 : 0;
    var bonus4 = (stone == Stone.BLACK) ? 5 : 0;

    setConditionValueRange("cond1", "cond1range", 0);
    setConditionValueRange("cond2", "cond2range", 0);
    setConditionValueRange("cond3", "cond3range", bonus3);
    setConditionValueRange("cond4", "cond4range", bonus4);
}

function setConditionValueRange(idList, idRange, bonus) {
    var cond = getSelectedCondition(idList);
    var max = cond.noBonus ? cond.max : cond.max + bonus;

    displayString(idRange, cond.min + "-" + max);
}

function getSelectedCondition(idList) {
    var typeName = getSelectListString("type");
    var type = Settings.item.types[typeName];
    var conds = type[idList];
    var condName = getSelectListString(idList);

    for (var i = 0; i < conds.length; i++) {
        if (conds[i].name == condName)
            return conds[i];
    }

    return null;
}

function clampConditionValues() {
    var stone = getSelectListValue("stone");
    var bonus3 = (stone == Stone.GREEN) ? 1 : 0;
    var bonus4 = (stone == Stone.BLACK) ? 5 : 0;

    clampConditionValue("cond1", "cond1value", 0);
    clampConditionValue("cond2", "cond2value", 0);
    clampConditionValue("cond3", "cond3value", bonus3);
    clampConditionValue("cond4", "cond4value", bonus4);
}

function clampConditionValue(idList, idValue, bonus) {
    var cond = getSelectedCondition(idList);

    var max = cond.noBonus ? cond.max : cond.max + bonus;
    var value = getInputValue(idValue);
    if (value < cond.min) value = cond.min;
    if (value > max) value = max;

    setInputString(idValue, value);
}

function runSimulation() {
    this.ag = createAG(this.type, this.stone);

    this.times++;
    if (this.times % this.slice == 0)
        displayProgress(this);

    if (!checkCondition(this.ag, this.cond1)) return true;
    if (!checkCondition(this.ag, this.cond2)) return true;
    if (!checkCondition(this.ag, this.cond3)) return true;
    if (!checkCondition(this.ag, this.cond4)) return true;

    displayProgress(this);
    displayResult(this);

    Settings.running = false;
    return false;
}

function checkCondition(ag, cond) {
    if (cond.name == "なし") return true;

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

    var url = "https://twitter.com/?status=" + encodeURIComponent(msg);
    displayLink("link", "Twitterに投稿", url);
}

function makeAgString(ag) {
    var s = "";
    var keys = Object.keys(ag).sort();
    for (var i = 0; i < keys.length; i++)
        s += keys[i] + ag[keys[i]] + " ";
    return s;
}

function displayLink(id, text, url) {
    var elem = document.getElementById(id);
    elem.innerHTML = toSafeText(text);
    elem.href = url;
}

function displayString(id, s) {
    var elem = document.getElementById(id);
    elem.innerHTML = toSafeText(s);
}

function displayValue(id, value) {
    var elem = document.getElementById(id);
    elem.innerHTML = value.toLocaleString();
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

function toSafeText(s) {
    var escapeEntity = s.replace(/[&<>"]/g, function (m) {
        return escapeEntityMap[m];
    });
    var convertCrLf = escapeEntity.replace(/\r?\n/g, "<br/>");

    return convertCrLf;
}

var escapeEntityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
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

    if (item.random)
        return randomChoice(item.random);
    else
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

        if (slot.totalMax) {
            if (ag[name] > slot.totalMax)
                ag[name] = slot.totalMax;
        }
    }
}

function addProp(ag, slot, bonus) {
    if (!slot.props) return;

    if (slot.noBonus)
        bonus = 0;
    var value = randomValueFlat(slot.min, slot.max + bonus);
    addPropValue(ag, slot, value);
}

function addPropSlope(ag, slot, bonus) {
    if (!slot.props) return;

    if (slot.noBonus)
        bonus = 0;
    var value = randomValueSlope(slot.min, slot.max + bonus, 3, 100);
    addPropValue(ag, slot, value);
}

function createAG(type, stone) {
    var ag = {};

    if (stone == Stone.WHITE)
        addProp(ag, randomChoice(type.slot1f), 0);
    else
        addProp(ag, randomChoice(type.slot1), 0);

    if (stone == Stone.GREEN)
        addPropSlope(ag, randomChoice(type.slot2f), 1);
    else
        addPropSlope(ag, randomChoice(type.slot2), 0);

    if (stone == Stone.BLACK)
        addProp(ag, randomChoice(type.slot3f), 5);
    else
        addProp(ag, randomChoice(type.slot3), 0);

    addProp(ag, randomChoice(type.slot4), 0);
    addProp(ag, randomChoice(type.slot5), 0);

    return ag;
}

function createConditions(slots) {
    var conds = [];
    for (var i = 0; i < slots.length; i++) {
        var slot = slots[i];
        if (slot.random)
            conds = conds.concat(createConditions(slot.random));
        else if (slot.props && slot.props.length == 1) {
            conds.push({
                name: slot.props[0],
                value: Math.floor((slot.max - slot.min + 1) / 2),
                min: slot.min,
                max: slot.max,
                noBonus: slot.noBonus
            });
        }
    }

    return conds;
}

function createConditionsWithNone(slots) {
    var conds = createConditions(slots);
    conds.push({ name: "なし", value: 0, min: 0, max: 0, noBonus: true });
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

var Merlinic = {};
Merlinic.displayName = "マーリン装備";
Merlinic.types = {};
Merlinic.types.magic = {};
Merlinic.types.magic.displayName = "魔法";
Merlinic.types.magic.sortOrder = 1;
Merlinic.types.magic.slot1f = [
    {
        weight: 90, random: [
            { weight: 40, props: ["魔命+"], min: 1, max: 30 },
            { weight: 40, props: ["魔攻+"], min: 1, max: 30 },
            { weight: 20, props: ["魔攻+", "魔命+"], min: 1, max: 25 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 40, props: ["命中+"], min: 1, max: 30 },
            { weight: 40, props: ["攻+"], min: 1, max: 30 },
            { weight: 20, props: ["命中+", "攻+"], min: 1, max: 25 },
        ]
    },
];
Merlinic.types.magic.slot1 = [
    { weight: 60, random: Merlinic.types.magic.slot1f },
    { weight: 40 },
];
Merlinic.types.magic.slot2f = [
    {
        weight: 90, random: [
            { weight: 1, props: ["マジックバーストダメージ+"], min: 1, max: 10 },
            { weight: 1, props: ["魔法クリティカルヒットダメージ+"], min: 1, max: 10 },
            { weight: 1, props: ["魔法ダメージ+"], min: 1, max: 15 },
            { weight: 1, props: ["ファストキャスト+"], min: 1, max: 6 },
            { weight: 1, props: ["コンサーブMP+"], min: 1, max: 10 },
            { weight: 1, props: ["マジックアキュメン+"], min: 1, max: 10 },
            { weight: 1, props: ["ドレインとアスピル吸収量+"], min: 1, max: 10 },
            { weight: 1, props: ["敵対心-"], min: 1, max: 6 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5, noBonus: true },
            { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5, noBonus: true },
            { weight: 1, props: ["被ダメージ-"], min: 1, max: 4, noBonus: true },
        ]
    },
];
Merlinic.types.magic.slot2 = [
    { weight: 60, random: Merlinic.types.magic.slot2f },
    { weight: 40 },
];
Merlinic.types.magic.slot3f = [
    {
        weight: 90, random: [
            { weight: 1, props: ["INT+"], min: 1, max: 10 },
            { weight: 1, props: ["MND+"], min: 1, max: 10 },
            { weight: 1, props: ["CHR+"], min: 1, max: 10 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 1, props: ["STR+"], min: 1, max: 10 },
            { weight: 1, props: ["DEX+"], min: 1, max: 10 },
            { weight: 1, props: ["VIT+"], min: 1, max: 10 },
            { weight: 1, props: ["AGI+"], min: 1, max: 10 },
        ]
    },
];
Merlinic.types.magic.slot3 = [
    { weight: 60, random: Merlinic.types.magic.slot3f },
    { weight: 40 },
];
Merlinic.types.magic.slot4 = [
    { weight: 40, props: ["魔命+"], min: 1, max: 15, totalMax: 40 },
    { weight: 60 },
];
Merlinic.types.magic.slot5 = [
    { weight: 40, props: ["魔攻+"], min: 1, max: 15, totalMax: 40 },
    { weight: 60 },
];
Merlinic.types.magic.cond1 = [
    { name: "魔命+", value: 20, min: 1, max: 40 },
    { name: "命中+", value: 20, min: 1, max: 30 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Merlinic.types.magic.cond2 = [
    { name: "魔攻+", value: 20, min: 1, max: 40 },
    { name: "攻+", value: 20, min: 1, max: 30 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Merlinic.types.magic.cond3 =
    createConditionsWithNone(Merlinic.types.magic.slot2);
Merlinic.types.magic.cond4 =
    createConditionsWithNone(Merlinic.types.magic.slot3);

var Herculean = {};
Herculean.displayName = "ヘルクリア装備";
Herculean.types = {};

Herculean.types.melee = {};
Herculean.types.melee.displayName = "近接";
Herculean.types.melee.sortOrder = 1;
Herculean.types.melee.slot1f = [
    {
        weight: 90, random: [
            { weight: 40, props: ["命中+"], min: 1, max: 30 },
            { weight: 40, props: ["攻+"], min: 1, max: 30 },
            { weight: 20, props: ["命中+", "攻+"], min: 1, max: 25 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 40, props: ["魔命+"], min: 1, max: 25 },
            { weight: 40, props: ["魔攻+"], min: 1, max: 25 },
            { weight: 20, props: ["魔攻+", "魔命+"], min: 1, max: 20 },
        ]
    },
];
Herculean.types.melee.slot1 = [
    { weight: 60, random: Herculean.types.melee.slot1f },
    { weight: 40 },
];
Herculean.types.melee.slot2f = [
    {
        weight: 90, random: [
            { weight: 1, props: ["トリプルアタック+"], min: 1, max: 3 },
            { weight: 1, props: ["ダブルアタック+"], min: 1, max: 4 },
            { weight: 1, props: ["クリティカルヒット+"], min: 1, max: 4 },
            { weight: 1, props: ["クリティカルヒットダメージ+"], min: 1, max: 4 },
            { weight: 1, props: ["ストアTP+"], min: 1, max: 6 },
            { weight: 1, props: ["ウェポンスキルダメージ+"], min: 1, max: 4 },
            { weight: 1, props: ["二刀流+"], min: 1, max: 5 },
            { weight: 1, props: ["ワルツ回復量+"], min: 1, max: 10 },
            { weight: 1, props: ["カウンター+"], min: 1, max: 4 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5, noBonus: true },
            { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5, noBonus: true },
            { weight: 1, props: ["被ダメージ-"], min: 1, max: 4, noBonus: true },
        ]
    },
];
Herculean.types.melee.slot2 = [
    { weight: 60, random: Herculean.types.melee.slot2f },
    { weight: 40 },
];
Herculean.types.melee.slot3f = [
    {
        weight: 90, random: [
            { weight: 1, props: ["STR+"], min: 1, max: 10 },
            { weight: 1, props: ["DEX+"], min: 1, max: 10 },
            { weight: 1, props: ["AGI+"], min: 1, max: 10 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 1, props: ["VIT+"], min: 1, max: 10 },
            { weight: 1, props: ["INT+"], min: 1, max: 10 },
            { weight: 1, props: ["MND+"], min: 1, max: 10 },
            { weight: 1, props: ["CHR+"], min: 1, max: 10 },
        ]
    },
];
Herculean.types.melee.slot3 = [
    { weight: 60, random: Herculean.types.melee.slot3f },
    { weight: 40 },
];
Herculean.types.melee.slot4 = [
    { weight: 40, props: ["命中+"], min: 1, max: 15, totalMax: 40 },
    { weight: 60 },
];
Herculean.types.melee.slot5 = [
    { weight: 40, props: ["攻+"], min: 1, max: 15, totalMax: 40 },
    { weight: 60 },
];
Herculean.types.melee.cond1 = [
    { name: "命中+", value: 20, min: 1, max: 40 },
    { name: "魔命+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Herculean.types.melee.cond2 = [
    { name: "攻+", value: 20, min: 1, max: 40 },
    { name: "魔攻+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Herculean.types.melee.cond3 =
    createConditionsWithNone(Herculean.types.melee.slot2);
Herculean.types.melee.cond4 =
    createConditionsWithNone(Herculean.types.melee.slot3);


Herculean.types.magic = {};
Herculean.types.magic.displayName = "魔法";
Herculean.types.magic.sortOrder = 3;
Herculean.types.magic.slot1f = [
    {
        weight: 90, random: [
            { weight: 40, props: ["魔命+"], min: 1, max: 25 },
            { weight: 40, props: ["魔攻+"], min: 1, max: 25 },
            { weight: 20, props: ["魔攻+", "魔命+"], min: 1, max: 20 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 40, props: ["命中+"], min: 1, max: 25 },
            { weight: 40, props: ["攻+"], min: 1, max: 25 },
            { weight: 20, props: ["命中+", "攻+"], min: 1, max: 20 },
        ]
    },
];
Herculean.types.magic.slot1 = [
    { weight: 60, random: Herculean.types.magic.slot1f },
    { weight: 40 },
];
Herculean.types.magic.slot2f = [
    {
        weight: 90, random: [
            { weight: 1, props: ["マジックバーストダメージ+"], min: 1, max: 7 },
            { weight: 1, props: ["ファストキャスト+"], min: 1, max: 5 },
            { weight: 1, props: ["ダブルアタック+"], min: 1, max: 4 },
            { weight: 1, props: ["クリティカルヒット+"], min: 1, max: 4 },
            { weight: 1, props: ["クリティカルヒットダメージ+"], min: 1, max: 4 },
            { weight: 1, props: ["ストアTP+"], min: 1, max: 6 },
            { weight: 1, props: ["ウェポンスキルダメージ+"], min: 1, max: 4 },
            { weight: 1, props: ["敵対心-"], min: 1, max: 6 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5, noBonus: true },
            { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5, noBonus: true },
            { weight: 1, props: ["被ダメージ-"], min: 1, max: 4, noBonus: true },
        ]
    },
];
Herculean.types.magic.slot2 = [
    { weight: 60, random: Herculean.types.magic.slot2f },
    { weight: 40 },
];
Herculean.types.magic.slot3f = [
    {
        weight: 90, random: [
            { weight: 1, props: ["INT+"], min: 1, max: 10 },
            { weight: 1, props: ["MND+"], min: 1, max: 10 },
            { weight: 1, props: ["STR+"], min: 1, max: 10 },
        ]
    },
    {
        weight: 10, random: [
            { weight: 1, props: ["DEX+"], min: 1, max: 10 },
            { weight: 1, props: ["VIT+"], min: 1, max: 10 },
            { weight: 1, props: ["AGI+"], min: 1, max: 10 },
            { weight: 1, props: ["CHR+"], min: 1, max: 10 },
        ]
    },
];
Herculean.types.magic.slot3 = [
    { weight: 60, random: Herculean.types.magic.slot3f },
    { weight: 40 },
];
Herculean.types.magic.slot4 = [
    { weight: 40, props: ["魔命+"], min: 1, max: 15, totalMax: 35 },
    { weight: 60 },
];
Herculean.types.magic.slot5 = [
    { weight: 40, props: ["魔攻+"], min: 1, max: 15, totalMax: 35 },
    { weight: 60 },
];
Herculean.types.magic.cond1 = [
    { name: "魔命+", value: 20, min: 1, max: 35 },
    { name: "命中+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Herculean.types.magic.cond2 = [
    { name: "魔攻+", value: 20, min: 1, max: 35 },
    { name: "攻+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Herculean.types.magic.cond3 =
    createConditionsWithNone(Herculean.types.magic.slot2);
Herculean.types.magic.cond4 =
    createConditionsWithNone(Herculean.types.magic.slot3);

var Items = {};
Items.merlinic = Merlinic;
Items.herculean = Herculean;
