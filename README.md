# Google Popular Times

A simple crawler for Google Maps "Popular Times" data.

<p align="center">
    <img width="256" alt="Picard popular times" src="https://raw.githubusercontent.com/yeganemehr/popular-times/master/misc/Picard.png">
</p>

This package allows you to fetch the popular times (busyness by hour for each day of the week) for a place using its Google Maps Place ID.

## Features
- Fetches popular times data from Google Maps for a given place ID
- Returns a structured week-by-hour busyness object

## Installation

```
npm install popular-times
```

## Usage

```typescript
import getPopularTimes from "popular-times";

const placeId = "ChIJodUeqA9MlUcRs4CJYoKzbvc";

getPopularTimes(placeId).then((week) => {
    console.log(week);
}, (e) => {
    console.error(e);
});
```

## API

### `getPopularTimes(placeId: string): Promise<IWeek>`

- `placeId`: Google Maps Place ID
- Returns: Promise of an array of 7 objects (one per weekday), each with an optional `hours` object mapping hour (0-23) to busyness (0-1)

#### Example return value
```js
[
  { hours: { 8: 0.2, 9: 0.5, ... } }, // Sunday
  { hours: { 8: 0.1, 9: 0.3, ... } }, // Monday
  ...
]
```

## License
MIT
