/*
The MIT License (MIT)
Copyright (c) 2016 granz.fisherman@gmail.com
https://opensource.org/licenses/MIT
*/
var Grioavolr = {};
Grioavolr.displayName = "グリオアヴァール";
Grioavolr.listName = "グリオアヴァール（仮）";
Grioavolr.types = {};

Grioavolr.types.magic = {};
Grioavolr.types.magic.displayName = "魔法";
Grioavolr.types.magic.type = "weapon";
Grioavolr.types.magic.slot1f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["マジックバーストダメージ+"], min: 1, max: 8, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ファストキャスト+"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["強化魔法時間+"], min: 1, max: 9, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["弱体魔法スキル+"], min: 1, max: 15, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["マジックアキュメン+"], min: 1, max: 9, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["詠唱中断率-"], min: 1, max: 10, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["コンサーブMP+"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["魔法クリティカルヒットダメージ+"], min: 1, max: 9, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["敵対心-"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
    ]
};
Grioavolr.types.magic.slot1 = {
    random: [
        { weight: 60, extend: [Grioavolr.types.magic.slot1f] },
        { weight: 40 },
    ]
};
Grioavolr.types.magic.slot2f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["INT+"], min: 1, max: 15, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["MND+"], min: 1, max: 15, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["CHR+"], min: 1, max: 15, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["MP+"], min: 1, max: 110, bonus: 10, stone: Stone.BLACK },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["STR+"], min: 1, max: 15, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["DEX+"], min: 1, max: 15, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["VIT+"], min: 1, max: 15, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["AGI+"], min: 1, max: 15, bonus: 5, stone: Stone.BLACK },
            ]
        },
    ]
};
Grioavolr.types.magic.slot2 = {
    random: [
        { weight: 60, extend: [Grioavolr.types.magic.slot2f] },
        { weight: 40 },
    ]
};
Grioavolr.types.magic.slot3 = {
    random: [
        { weight: 60, props: ["魔命+"], min: 1, max: 25, bonus: 5, stone: Stone.WHITE },
        { weight: 40 },
    ]
};
Grioavolr.types.magic.slot4 = {
    random: [
        { weight: 60, props: ["魔攻+"], min: 1, max: 25, bonus: 5, stone: Stone.WHITE },
        { weight: 40 },
    ]
};
Grioavolr.types.magic.slot5 = {
    random: [
        { weight: 60, props: ["魔法ダメージ+"], min: 1, max: 10 },
        { weight: 40 },
    ]
};
Grioavolr.types.magic.cond1 =
    createConditionsWithNone(Grioavolr.types.magic.slot3);
Grioavolr.types.magic.cond2 =
    createConditionsWithNone(Grioavolr.types.magic.slot4);
Grioavolr.types.magic.cond3 =
    createConditionsWithNone(Grioavolr.types.magic.slot1);
Grioavolr.types.magic.cond4 =
    createConditionsWithNone(Grioavolr.types.magic.slot2);
Grioavolr.types.magic.cond5 =
    createConditionsWithNone(Grioavolr.types.magic.slot5);
