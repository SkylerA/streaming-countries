# Live Site

[Live Site Here](https://streaming-countries.vercel.app/)

## About

This is a tool for all those ads that say you can easily stream movies from other countries with a VPN, but ignore the fact that it's a pain to figure out which country to choose.

[JustWatch](https://JustWatch.com) is great for finding where you can stream a video, but it only lets you check one country at a time.

This tool uses the [Movie of the Night](https://movieofthenight.com/") API to search the stream options of all countries at once and then filters for only the free-ish streaming options.

Provide a free API Key and IMDb id for the movie you want and it will display which countries might have the movie.
![Results Preview Image](./src/app/imgs/preview.png)

An additional free api can be subscribed to and then an optional `Movie Title` field will allow looking up IMDb ids by title. Clicking a result will auto search for available countries.
![Movie Title Search Preview Image](./src/app/imgs/movie-title-preview.png)

<br />
<br />

## Next.js README below

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
