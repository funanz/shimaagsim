/*
The MIT License (MIT)
Copyright (c) 2016 granz.fisherman@gmail.com
https://opensource.org/licenses/MIT
*/
var Colada = {};
Colada.displayName = "コラーダ";
Colada.listName = "コラーダ（仮）";
Colada.types = {};

Colada.types.melee = {};
Colada.types.melee.displayName = "近接";
Colada.types.melee.type = "weapon";
Colada.types.melee.slot1f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["ダブルアタック+"], min: 1, max: 3, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["クリティカルヒット+"], min: 1, max: 2, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ウェポンスキルのダメージ+"], min: 1, max: 2, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ストアTP+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["魔命+"], min: 1, max: 15, bonus: 5, stone: Stone.GREEN },
                { weight: 1, props: ["魔攻+"], min: 1, max: 15, bonus: 5, stone: Stone.GREEN },
                { weight: 1, props: ["敵対心+"], min: 1, max: 2, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ヘイスト+"], min: 1, max: 2, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["被物理ダメージ+"], min: 1, max: 2, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
    ]
};
Colada.types.melee.slot1 = {
    random: [
        { weight: 60, extend: [Colada.types.melee.slot1f] },
        { weight: 40 },
    ]
};
Colada.types.melee.slot2f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["STR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["DEX+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["VIT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["AGI+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["INT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["MND+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["CHR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
    ]
};
Colada.types.melee.slot2 = {
    random: [
        { weight: 60, extend: [Colada.types.melee.slot2f] },
        { weight: 40 },
    ]
};
Colada.types.melee.slot3 = {
    random: [
        { weight: 60, props: ["命中+"], min: 1, max: 25, bonus: 5, stone: Stone.WHITE },
        { weight: 40 },
    ]
};
Colada.types.melee.slot4 = {
    random: [
        { weight: 60, props: ["攻+"], min: 1, max: 25, bonus: 5, stone: Stone.WHITE },
        { weight: 40 },
    ]
};
Colada.types.melee.slot5 = {
    random: [
        { weight: 60, props: ["D+"], min: 1, max: 20 },
        { weight: 40 },
    ]
};
Colada.types.melee.cond1 =
    createConditionsWithNone(Colada.types.melee.slot3);
Colada.types.melee.cond2 =
    createConditionsWithNone(Colada.types.melee.slot4);
Colada.types.melee.cond3 =
    createConditionsWithNone(Colada.types.melee.slot1);
Colada.types.melee.cond4 =
    createConditionsWithNone(Colada.types.melee.slot2);
Colada.types.melee.cond5 =
    createConditionsWithNone(Colada.types.melee.slot5);
