/*
The MIT License (MIT)
Copyright (c) 2016 granz.fisherman@gmail.com
https://opensource.org/licenses/MIT
*/
var Chironic = {};
Chironic.displayName = "カイロン装備";
Chironic.types = {};

Chironic.types.melee = {};
Chironic.types.melee.displayName = "近接";
Chironic.types.melee.type = "armor";
Chironic.types.melee.slot4 = {
    random: [
        { weight: 40, props: ["命中+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Chironic.types.melee.slot4h = {
    random: [
        { weight: 50, props: ["命中+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Chironic.types.melee.slot4a = {
    random: [
        { weight: 100, props: ["命中+"], min: 0, max: 15 },
    ]
};
Chironic.types.melee.slot5 = {
    random: [
        { weight: 40, props: ["攻+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Chironic.types.melee.slot5h = {
    random: [
        { weight: 50, props: ["攻+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Chironic.types.melee.slot5a = {
    random: [
        { weight: 100, props: ["攻+"], min: 0, max: 15 },
    ]
};
Chironic.types.melee.slot1f = {
    random: [
        {
            weight: 90, random: [
                {
                    weight: 40, props: ["命中+"], min: 1, max: 25, extend: [
                        Chironic.types.melee.slot5h,
                    ]
                },
                {
                    weight: 40, props: ["攻+"], min: 1, max: 25, extend: [
                        Chironic.types.melee.slot4h,
                    ]
                },
                {
                    weight: 20, props: ["命中+", "攻+"], min: 1, max: 20, extend: [
                        Chironic.types.melee.slot4a,
                        Chironic.types.melee.slot5a,
                    ]
                },
            ]
        },
        {
            weight: 10, random: [
                {
                    weight: 40, props: ["魔命+"], min: 1, max: 25, extend: [
                        Chironic.types.melee.slot4,
                        Chironic.types.melee.slot5,
                    ]
                },
                {
                    weight: 40, props: ["魔攻+"], min: 1, max: 25, extend: [
                        Chironic.types.melee.slot4,
                        Chironic.types.melee.slot5,
                    ]
                },
                {
                    weight: 20, props: ["魔命+", "魔攻+"], min: 1, max: 20, extend: [
                        Chironic.types.melee.slot4,
                        Chironic.types.melee.slot5,
                    ]
                },
            ]
        },
    ]
};
Chironic.types.melee.slot1 = {
    random: [
        {
            weight: 60, extend: [Chironic.types.melee.slot1f]
        },
        {
            weight: 40, extend: [
                Chironic.types.melee.slot4,
                Chironic.types.melee.slot5,
            ]
        },
    ]
};
Chironic.types.melee.slot2f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["ダブルアタック+"], min: 1, max: 3, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["二刀流+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ウェポンスキルの命中+"], min: 1, max: 15, bonus: 5, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["盾発動率+"], min: 1, max: 3, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["モクシャ+"], min: 1, max: 3, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ファストキャスト+"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["詠唱中断率-"], min: 1, max: 8, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["コンサーブMP+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被ダメージ-"], min: 1, max: 3, dist: "slope" },
            ]
        },
    ]
};
Chironic.types.melee.slot2 = {
    random: [
        { weight: 60, extend: [Chironic.types.melee.slot2f] },
        { weight: 40 },
    ]
};
Chironic.types.melee.slot3f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["STR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["MND+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["CHR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["DEX+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["AGI+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["VIT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["INT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
    ]
};
Chironic.types.melee.slot3 = {
    random: [
        { weight: 60, extend: [Chironic.types.melee.slot3f] },
        { weight: 40 },
    ]
};
Chironic.types.melee.cond1 = [
    { name: "命中+", value: 20, min: 1, max: 35 },
    { name: "魔命+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Chironic.types.melee.cond2 = [
    { name: "攻+", value: 20, min: 1, max: 35 },
    { name: "魔攻+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Chironic.types.melee.cond3 =
    createConditionsWithNone(Chironic.types.melee.slot2);
Chironic.types.melee.cond4 =
    createConditionsWithNone(Chironic.types.melee.slot3);
Chironic.types.melee.cond5 =
    [{ name: "なし", value: 0, min: 0, max: 0 }];

Chironic.types.healing = {};
Chironic.types.healing.displayName = "回復";
Chironic.types.healing.type = "armor";
Chironic.types.healing.slot4 = {
    random: [
        { weight: 40, props: ["魔命+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Chironic.types.healing.slot4h = {
    random: [
        { weight: 50, props: ["魔命+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Chironic.types.healing.slot4a = {
    random: [
        { weight: 100, props: ["魔命+"], min: 0, max: 15 },
    ]
};
Chironic.types.healing.slot5 = {
    random: [
        { weight: 40, props: ["魔攻+"], min: 1, max: 15 },
        { weight: 60 },
    ]
}
Chironic.types.healing.slot5h = {
    random: [
        { weight: 50, props: ["魔攻+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Chironic.types.healing.slot5a = {
    random: [
        { weight: 100, props: ["魔攻+"], min: 0, max: 15 },
    ]
};
Chironic.types.healing.slot1f = {
    random: [
        {
            weight: 90, random: [
                {
                    weight: 40, props: ["魔命+"], min: 1, max: 25, extend: [
                        Chironic.types.healing.slot5h,
                    ]
                },
                {
                    weight: 40, props: ["魔攻+"], min: 1, max: 25, extend: [
                        Chironic.types.healing.slot4h,
                    ]
                },
                {
                    weight: 20, props: ["魔攻+", "魔命+"], min: 1, max: 20, extend: [
                        Chironic.types.healing.slot4a,
                        Chironic.types.healing.slot5a,
                    ]
                },
            ]
        },
        {
            weight: 10, random: [
                {
                    weight: 40, props: ["命中+"], min: 1, max: 25, extend: [
                        Chironic.types.healing.slot4,
                        Chironic.types.healing.slot5,
                    ]
                },
                {
                    weight: 40, props: ["攻+"], min: 1, max: 25, extend: [
                        Chironic.types.healing.slot4,
                        Chironic.types.healing.slot5,
                    ]
                },
                {
                    weight: 20, props: ["命中+", "攻+"], min: 1, max: 20, extend: [
                        Chironic.types.healing.slot4,
                        Chironic.types.healing.slot5,
                    ]
                },
            ]
        },
    ]
};
Chironic.types.healing.slot1 = {
    random: [
        {
            weight: 60, extend: [Chironic.types.healing.slot1f]
        },
        {
            weight: 40, extend: [
                Chironic.types.healing.slot4,
                Chironic.types.healing.slot5,
            ]
        },
    ]
};
Chironic.types.healing.slot2f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["ケアル回復量+"], min: 1, max: 10, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ケアル詠唱時間-"], min: 1, max: 10, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ファストキャスト+"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["敵対心-"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ヘイスト+"], min: 1, max: 3, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["レジストサイレス+"], min: 1, max: 9, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ドレインとアスピル吸収量+"], min: 1, max: 10, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["詠唱中断率-"], min: 1, max: 8, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["コンサーブMP+"], min: 1, max: 4, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5, dist: "slope" },
                { weight: 1, props: ["被ダメージ-"], min: 1, max: 3, dist: "slope" },
            ]
        },
    ]
};
Chironic.types.healing.slot2 = {
    random: [
        { weight: 60, extend: [Chironic.types.healing.slot2f] },
        { weight: 40 },
    ]
};
Chironic.types.healing.slot3f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["MND+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["INT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["CHR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["STR+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["DEX+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["VIT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["AGI+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
            ]
        },
    ]
};
Chironic.types.healing.slot3 = {
    random: [
        { weight: 60, extend: [Chironic.types.healing.slot3f] },
        { weight: 40 },
    ]
};
Chironic.types.healing.cond1 = [
    { name: "魔命+", value: 20, min: 1, max: 35 },
    { name: "命中+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Chironic.types.healing.cond2 = [
    { name: "魔攻+", value: 20, min: 1, max: 35 },
    { name: "攻+", value: 20, min: 1, max: 25 },
    { name: "なし", value: 0, min: 0, max: 0 },
];
Chironic.types.healing.cond3 =
    createConditionsWithNone(Chironic.types.healing.slot2);
Chironic.types.healing.cond4 =
    createConditionsWithNone(Chironic.types.healing.slot3);
Chironic.types.healing.cond5 =
    [{ name: "なし", value: 0, min: 0, max: 0 }];
