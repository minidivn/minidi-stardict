var dicts = [
	{
		name: "en-vi",
		filePathDz: "en-vi/star_anhviet.dict.dz",
		filePathIndex: "en-vi/star_anhviet.idx",
		desc: "Anh-Việt"
	},
	{
		name: "vi-en",
		filePathDz: "vi-en/star_vietanh.dict.dz",
		filePathIndex: "vi-en/star_vietanh.idx",
		desc: "Việt-Anh"
	},
	{
		name: "fr-vi",
		filePathDz: "fr-vi/star_phapviet.dz",
		filePathIndex: "fr-vi/star_phapviet.idx",
		desc: "Pháp-Việt"
	},
	{
		name: "vi-fr",
		filePathDz: "vi-fr/star_vietphap.dict",
		filePathIndex: "vi-fr/star_vietphap.idx",
		desc: "Việt-Pháp"
	},
	{
		name: "ko-vi",
		filePathDz: "ko-vi/star_hanviet.dict",
		filePathIndex: "ko-vi/star_hanviet.idx",
		desc: "Hàn-Việt"
	},
	{
		name: "vi-ko",
		filePathDz: "vi-ko/star_viethan.dict",
		filePathIndex: "vi-ko/star_viethan.idx",
		desc: "Việt-Hàn"
	},
	{
		name: "ja-vi",
		filePathDz: "ja-vi/star_nhatviet.dict",
		filePathIndex: "ja-vi/star_nhatviet.idx",
		desc: "Nhật-Việt"
	},
	{
		name: "vi-ja",
		filePathDz: "vi-ja/star_vietnhat.dict",
		filePathIndex: "vi-ja/star_vietnhat.idx",
		desc: "Việt-Nhật"
	},
	{
		name: "ru-vi",
		filePathDz: "ru-vi/star_ngaviet.dict",
		filePathIndex: "ru-vi/star_ngaviet.idx",
		desc: "Nga-Việt"
	},
	{
		name: "vi-ru",
		filePathDz: "vi-ru/star_vietnga.dict",
		filePathIndex: "vi-ru/star_vietnga.idx",
		desc: "Việt-Nga"
	}
];

module.exports.list = function () {
	return dicts;
}