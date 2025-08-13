interface IWeekDay {
	hours?: Record<number, number>
}
type IWeek = IWeekDay[];

export default async function getPopularTimes(placeId: string): Promise<IWeek> {
	const q = new URLSearchParams({
		q: "place_id:" + placeId
	});
	const response = await fetch("https://www.google.com/maps/place/?" + q.toString(), {
		headers: {
			"User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
			"Accept-Language": "en-US,en;q=1"
		}
	});
	const html = await response.text();

	const str = ['APP_INITIALIZATION_STATE=', 'window.APP_FLAGS'];
	const script = html.substring(html.lastIndexOf(str[0]) + str[0].length, html.lastIndexOf(str[1]));
	const first = eval(script);
	let payload = first[3][6] as string;
	if (!payload.startsWith(")]}'\n")) {
		throw new Error("invalid payload begining");
	}
	payload = payload.substring(5);
	const second = eval(payload);
	const rawData = second[6][84];

	if (!rawData || rawData[0] === undefined) {
		throw new Error("popular times are not provided");
	}

	const week: IWeek = [];
	for (const dayRawData of rawData[0]) {
		const day: IWeekDay = {};
		const hoursRawData = dayRawData[1];
		if (hoursRawData) {
			day.hours = {};
			for (const hourRawData of hoursRawData) {
				day.hours[hourRawData[0]] = hourRawData[1]/100;
			}
		}
		week[dayRawData[0] - 1] = day;
	}

	return week;
}
