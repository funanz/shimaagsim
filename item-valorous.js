/*
The MIT License (MIT)
Copyright (c) 2016 granz.fisherman@gmail.com
https://opensource.org/licenses/MIT
*/
var Valorous = {};
Valorous.displayName = "バロラス装備";
Valorous.listName = "バロラス装備（仮）";
Valorous.types = {};

Valorous.types.melee = {};
Valorous.types.melee.displayName = "近接";
Valorous.types.melee.type = "armor";
Valorous.types.melee.slot4 = {
    random: [
        { weight: 40, props: ["命中+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Valorous.types.melee.slot4h = {
    random: [
        { weight: 50, props: ["命中+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Valorous.types.melee.slot4a = {
    random: [
        { weight: 100, props: ["命中+"], min: 0, max: 15 },
    ]
};
Valorous.types.melee.slot5 = {
    random: [
        { weight: 40, props: ["攻+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Valorous.types.melee.slot5h = {
    random: [
        { weight: 50, props: ["攻+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Valorous.types.melee.slot5a = {
    random: [
        { weight: 100, props: ["攻+"], min: 0, max: 15 },
    ]
};
Valorous.types.melee.slot1f = {
    random: [
        {
            weight: 90, random: [
                {
                    weight: 40, props: ["命中+"], min: 1, max: 30, extend: [
                        Valorous.types.melee.slot5h,
                    ]
                },
                {
                    weight: 40, props: ["攻+"], min: 1, max: 30, extend: [
                        Valorous.types.melee.slot4h,
                    ]
                },
                {
                    weight: 20, props: ["命中+", "攻+"], min: 1, max: 25, extend: [
                        Valorous.types.melee.slot4a,
                        Valorous.types.melee.slot5a,
                    ]
                },
            ]
        },
        {
            weight: 10, random: [
                {
                    weight: 40, props: ["魔命+"], min: 1, max: 25, extend: [
                        Valorous.types.melee.slot4,
                        Valorous.types.melee.slot5,
                    ]
                },
                {
                    weight: 40, props: ["魔攻+"], min: 1, max: 25, extend: [
                        Valorous.types.melee.slot4,
                        Valorous.types.melee.slot5,
                    ]
                },
                {
                    weight: 20, props: ["魔命+", "魔攻+"], min: 1, max: 15, extend: [
                        Valorous.types.melee.slot4,
                        Valorous.types.melee.slot5,
                    ]
                },
            ]
        },
    ]
};
Valorous.types.melee.slot1 = {
    random: [
        {
            weight: 60, extend: [Valorous.types.melee.slot1f]
        },
        {
            weight: 40, extend: [
                Valorous.types.melee.slot4,
                Valorous.types.melee.slot5,
            ]
        },
    ]
};
Valorous.types.melee.slot2f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["ダブルアタック+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["クリティカルヒット+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["クリティカルヒットダメージ+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ウェポンスキルダメージ+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ウェポンスキルの命中+"], min: 1, max: 15, bonus: 5, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ストアTP+"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["連携ダメージ+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被ダメージ-"], min: 1, max: 4, dist: "slope" },
                { weight: 1, props: ["敵対心+"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
    ]
};
Valorous.types.melee.slot2 = {
    random: [
        { weight: 60, extend: [Valorous.types.melee.slot2f] },
        { weight: 40 },
    ]
};
Valorous.types.melee.slot3f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["STR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["DEX+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["AGI+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["VIT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["INT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["MND+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["CHR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
    ]
};
Valorous.types.melee.slot3 = {
    random: [
        { weight: 60, extend: [Valorous.types.melee.slot3f] },
        { weight: 40 },
    ]
};
Valorous.types.melee.cond1 = [
    { name: "命中+", value: 20, min: 1, max: 40 },
    { name: "魔命+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Valorous.types.melee.cond2 = [
    { name: "攻+", value: 20, min: 1, max: 40 },
    { name: "魔攻+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Valorous.types.melee.cond3 =
    createConditionsWithNone(Valorous.types.melee.slot2);
Valorous.types.melee.cond4 =
    createConditionsWithNone(Valorous.types.melee.slot3);
Valorous.types.melee.cond5 =
    [{ name: "なし", value: 0, min: 0, max: 0 }];
