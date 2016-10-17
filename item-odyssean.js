/*
The MIT License (MIT)
Copyright (c) 2016 granz.fisherman@gmail.com
https://opensource.org/licenses/MIT
*/
var Odyssean = {};
Odyssean.displayName = "オディシア装備";
Odyssean.types = {};

Odyssean.types.melee = {};
Odyssean.types.melee.displayName = "近接";
Odyssean.types.melee.type = "armor";
Odyssean.types.melee.slot4 = {
    random: [
        { weight: 40, props: ["命中+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Odyssean.types.melee.slot4h = {
    random: [
        { weight: 50, props: ["命中+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Odyssean.types.melee.slot4a = {
    random: [
        { weight: 100, props: ["命中+"], min: 0, max: 15 },
    ]
};
Odyssean.types.melee.slot5 = {
    random: [
        { weight: 40, props: ["攻+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Odyssean.types.melee.slot5h = {
    random: [
        { weight: 50, props: ["攻+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Odyssean.types.melee.slot5a = {
    random: [
        { weight: 100, props: ["攻+"], min: 0, max: 15 },
    ]
};
Odyssean.types.melee.slot1f = {
    random: [
        {
            weight: 90, random: [
                {
                    weight: 40, props: ["命中+"], min: 1, max: 30, extend: [
                        Odyssean.types.melee.slot5h,
                    ]
                },
                {
                    weight: 40, props: ["攻+"], min: 1, max: 30, extend: [
                        Odyssean.types.melee.slot4h,
                    ]
                },
                {
                    weight: 20, props: ["命中+", "攻+"], min: 1, max: 25, extend: [
                        Odyssean.types.melee.slot4a,
                        Odyssean.types.melee.slot5a,
                    ]
                },
            ]
        },
        {
            weight: 10, random: [
                {
                    weight: 40, props: ["魔命+"], min: 1, max: 25, extend: [
                        Odyssean.types.melee.slot4,
                        Odyssean.types.melee.slot5,
                    ]
                },
                {
                    weight: 40, props: ["魔攻+"], min: 1, max: 25, extend: [
                        Odyssean.types.melee.slot4,
                        Odyssean.types.melee.slot5,
                    ]
                },
                {
                    weight: 20, props: ["魔命+", "魔攻+"], min: 1, max: 15, extend: [
                        Odyssean.types.melee.slot4,
                        Odyssean.types.melee.slot5,
                    ]
                },
            ]
        },
    ]
};
Odyssean.types.melee.slot1 = {
    random: [
        {
            weight: 60, extend: [Odyssean.types.melee.slot1f]
        },
        {
            weight: 40, extend: [
              Odyssean.types.melee.slot4,
              Odyssean.types.melee.slot5,
            ]
        },
    ]
};
Odyssean.types.melee.slot2f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["ダブルアタック+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ストアTP+"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ウェポンスキルダメージ+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ウェポンスキルの命中+"], min: 1, max: 15, bonus: 5, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["被ケアル回復量+"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ケアル回復量+"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ファストキャスト+"], min: 1, max: 5, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被ダメージ-"], min: 1, max: 4, dist: "slope" },
                { weight: 1, props: ["敵対心+"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
    ]
};
Odyssean.types.melee.slot2 = {
    random: [
        { weight: 60, extend: [Odyssean.types.melee.slot2f] },
        { weight: 40 },
    ]
};
Odyssean.types.melee.slot3f = {
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
Odyssean.types.melee.slot3 = {
    random: [
        { weight: 60, extend: [Odyssean.types.melee.slot3f] },
        { weight: 40 },
    ]
};
Odyssean.types.melee.cond1 = [
    { name: "命中+", value: 20, min: 1, max: 40 },
    { name: "魔命+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Odyssean.types.melee.cond2 = [
    { name: "攻+", value: 20, min: 1, max: 40 },
    { name: "魔攻+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Odyssean.types.melee.cond3 =
    createConditionsWithNone(Odyssean.types.melee.slot2);
Odyssean.types.melee.cond4 =
    createConditionsWithNone(Odyssean.types.melee.slot3);
Odyssean.types.melee.cond5 =
    [{ name: "なし", value: 0, min: 0, max: 0 }];

Odyssean.types.magic = {};
Odyssean.types.magic.displayName = "魔法";
Odyssean.types.magic.type = "armor";
Odyssean.types.magic.slot4 = {
    random: [
        { weight: 40, props: ["魔命+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Odyssean.types.magic.slot4h = {
    random: [
        { weight: 50, props: ["魔命+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Odyssean.types.magic.slot4a = {
    random: [
        { weight: 100, props: ["魔命+"], min: 0, max: 15 },
    ]
};
Odyssean.types.magic.slot5 = {
    random: [
        { weight: 40, props: ["魔攻+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Odyssean.types.magic.slot5h = {
    random: [
        { weight: 50, props: ["魔攻+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Odyssean.types.magic.slot5a = {
    random: [
        { weight: 100, props: ["魔攻+"], min: 0, max: 15 },
    ]
};
Odyssean.types.magic.slot1f = {
    random: [
        {
            weight: 90, random: [
                {
                    weight: 40, props: ["魔命+"], min: 1, max: 25, extend: [
                        Odyssean.types.magic.slot5h,
                    ]
                },
                {
                    weight: 40, props: ["魔攻+"], min: 1, max: 25, extend: [
                        Odyssean.types.magic.slot4h,
                    ]
                },
                {
                    weight: 20, props: ["魔攻+", "魔命+"], min: 1, max: 15, extend: [
                        Odyssean.types.magic.slot4a,
                        Odyssean.types.magic.slot5a,
                    ]
                },
            ]
        },
        {
            weight: 10, random: [
                {
                    weight: 40, props: ["命中+"], min: 1, max: 30, extend: [
                        Odyssean.types.magic.slot4,
                        Odyssean.types.magic.slot5,
                    ]
                },
                {
                    weight: 40, props: ["攻+"], min: 1, max: 30, extend: [
                        Odyssean.types.magic.slot4,
                        Odyssean.types.magic.slot5,
                    ]
                },
                {
                    weight: 20, props: ["命中+", "攻+"], min: 1, max: 25, extend: [
                        Odyssean.types.magic.slot4,
                        Odyssean.types.magic.slot5,
                    ]
                },
            ]
        },
    ]
};
Odyssean.types.magic.slot1 = {
    random: [
        {
            weight: 60, extend: [Odyssean.types.magic.slot1f]
        },
        {
            weight: 40, extend: [
                Odyssean.types.magic.slot4,
                Odyssean.types.magic.slot5,
            ]
        },
    ]
};
Odyssean.types.magic.slot2f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["ダブルアタック+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ストアTP+"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ウェポンスキルダメージ+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ウェポンスキルの命中+"], min: 1, max: 15, bonus: 5, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["被ケアル回復量+"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ケアル回復量+"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ファストキャスト+"], min: 1, max: 5, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被ダメージ-"], min: 1, max: 4, dist: "slope" },
                { weight: 1, props: ["敵対心+"], min: 1, max: 7, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
    ]
};
Odyssean.types.magic.slot2 = {
    random: [
        { weight: 60, extend: [Odyssean.types.magic.slot2f] },
        { weight: 40 },
    ]
};
Odyssean.types.magic.slot3f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["INT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["MND+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["CHR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["AGI+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["STR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["DEX+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["VIT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
    ]
};
Odyssean.types.magic.slot3 = {
    random: [
        { weight: 60, extend: [Odyssean.types.magic.slot3f] },
        { weight: 40 },
    ]
};
Odyssean.types.magic.cond1 = [
    { name: "魔命+", value: 20, min: 1, max: 30 },
    { name: "命中+", value: 20, min: 1, max: 30 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Odyssean.types.magic.cond2 = [
    { name: "魔攻+", value: 20, min: 1, max: 30 },
    { name: "攻+", value: 20, min: 1, max: 30 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Odyssean.types.magic.cond3 =
    createConditionsWithNone(Odyssean.types.magic.slot2);
Odyssean.types.magic.cond4 =
    createConditionsWithNone(Odyssean.types.magic.slot3);
Odyssean.types.magic.cond5 =
    [{ name: "なし", value: 0, min: 0, max: 0 }];
