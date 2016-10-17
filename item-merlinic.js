/*
The MIT License (MIT)
Copyright (c) 2016 granz.fisherman@gmail.com
https://opensource.org/licenses/MIT
*/
var Merlinic = {};
Merlinic.displayName = "マーリン装備";
Merlinic.types = {};
Merlinic.types.magic = {};
Merlinic.types.magic.displayName = "魔法";
Merlinic.types.magic.type = "armor";
Merlinic.types.magic.slot4 = {
    random: [
        { weight: 40, props: ["魔命+"], min: 1, max: 15 },
        { weight: 60 },
    ]
};
Merlinic.types.magic.slot4h = {
    random: [
        { weight: 50, props: ["魔命+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Merlinic.types.magic.slot4a = {
    random: [
        { weight: 100, props: ["魔命+"], min: 0, max: 15 },
    ]
};
Merlinic.types.magic.slot5 = {
    random: [
        { weight: 40, props: ["魔攻+"], min: 1, max: 15 },
        { weight: 60 },
    ]
}
Merlinic.types.magic.slot5h = {
    random: [
        { weight: 50, props: ["魔攻+"], min: 1, max: 15 },
        { weight: 50 },
    ]
};
Merlinic.types.magic.slot5a = {
    random: [
        { weight: 100, props: ["魔攻+"], min: 0, max: 15 },
    ]
};
Merlinic.types.magic.slot1f = {
    random: [
        {
            weight: 90, random: [
                {
                    weight: 40, props: ["魔命+"], min: 1, max: 30, extend: [
                        Merlinic.types.magic.slot5h,
                    ]
                },
                {
                    weight: 40, props: ["魔攻+"], min: 1, max: 30, extend: [
                        Merlinic.types.magic.slot4h,
                    ]
                },
                {
                    weight: 20, props: ["魔攻+", "魔命+"], min: 1, max: 25, extend: [
                        Merlinic.types.magic.slot4a,
                        Merlinic.types.magic.slot5a,
                    ]
                },
            ]
        },
        {
            weight: 10, random: [
                {
                    weight: 40, props: ["命中+"], min: 1, max: 30, extend: [
                        Merlinic.types.magic.slot4,
                        Merlinic.types.magic.slot5,
                    ]
                },
                {
                    weight: 40, props: ["攻+"], min: 1, max: 30, extend: [
                        Merlinic.types.magic.slot4,
                        Merlinic.types.magic.slot5,
                    ]
                },
                {
                    weight: 20, props: ["命中+", "攻+"], min: 1, max: 25, extend: [
                        Merlinic.types.magic.slot4,
                        Merlinic.types.magic.slot5,
                    ]
                },
            ]
        },
    ]
};
Merlinic.types.magic.slot1 = {
    random: [
        {
            weight: 60, extend: [Merlinic.types.magic.slot1f]
        },
        {
            weight: 40, extend: [
                Merlinic.types.magic.slot4,
                Merlinic.types.magic.slot5,
            ]
        },
    ]
};
Merlinic.types.magic.slot2f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["マジックバーストダメージ+"], min: 1, max: 10, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["魔法クリティカルヒットダメージ+"], min: 1, max: 10, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["魔法ダメージ+"], min: 1, max: 15, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ファストキャスト+"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["コンサーブMP+"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["マジックアキュメン+"], min: 1, max: 10, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["ドレインとアスピル吸収量+"], min: 1, max: 10, bonus: 1, stone: Stone.GREEN, dist: "slope" },
                { weight: 1, props: ["敵対心-"], min: 1, max: 6, bonus: 1, stone: Stone.GREEN, dist: "slope" },
            ]
        },
        {
            weight: 10, random: [
                { weight: 1, props: ["被物理ダメージ-"], min: 1, max: 5 },
                { weight: 1, props: ["被魔法ダメージ-"], min: 1, max: 5 },
                { weight: 1, props: ["被ダメージ-"], min: 1, max: 4 },
            ]
        },
    ]
};
Merlinic.types.magic.slot2 = {
    random: [
        { weight: 60, extend: [Merlinic.types.magic.slot2f] },
        { weight: 40 },
    ]
};
Merlinic.types.magic.slot3f = {
    random: [
        {
            weight: 90, random: [
                { weight: 1, props: ["INT+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
                { weight: 1, props: ["MND+"], min: 1, max: 10, bonus: 5, stone: Stone.BLACK },
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
Merlinic.types.magic.slot3 = {
    random: [
        { weight: 60, extend: [Merlinic.types.magic.slot3f] },
        { weight: 40 },
    ]
};
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
Merlinic.types.magic.cond5 =
    [{ name: "なし", value: 0, min: 0, max: 0 }];
