import React from 'react'

type Props = {}

const About = (props: Props) => {
    return (
        <div className='about'>
            <details className='flow-content'>
                <summary>About</summary>
                <ul>
                    <li>This searches all countries on <a href="https://www.movieofthenight.com/" target="_blank">Movie of the Night</a> for free/subscription streaming options</li>
                    <ul>
                        <li>All other results (Rent/Buy) are removed</li>
                        <li>API Data seems to have some inaccuracies so YMMV</li>
                    </ul>
                    <li>The goal is to simplify finding when you can use a VPN to stream from a service you already  have</li>
                    <li>Check <a href='https://www.justwatch.com' target='_blank'>JustWatch</a> first as it has more complete results including free w/ ads options</li>
                    <ul>
                        <li>If JustWatch doesn&apos;t yield results for your default country, then fallback to this site so you don&apos;t have to manually check each country on JustWatch</li>
                    </ul>
                </ul>
            </details>
        </div>
    )
}

export default About