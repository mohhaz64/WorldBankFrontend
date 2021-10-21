import MainSearchCountrySelection from "./MainSearchCountrySelection"
import MainSearchIndicatorSelection from "./MainSearchIndicatorSelection"
import MainSearchYearSelection from "./MainSearchYearSelection"
import MainSearchButton from "./MainSearchButton"
import Results from "./Results"
import ResultsTwoCountries from "./ResultsTwoCountries"
import { useState, useEffect } from "react"
const axios = require("axios")

function MainSearch() {
    const [countries, setCountries] = useState(null)
    const [indicators, setIndicators] = useState(null)
    const [years, setYears] = useState(null)
    //
    const [countryOnlySearch, setCountryOnlySearch] = useState(true)
    const [twoCountrySearch, setTwoCountrySearch] = useState(false)
    const [yearRangeSearch, setYearRangeSearch] = useState(false)
    //
    const [topCountrySelection, setTopCountrySelection] = useState(null)
    const [bottomCountrySelection, setBottomCountrySelection] = useState(null)
    const [indicatorSelection, setIndicatorSelection] = useState(null)
    const [topYearSelection, setTopYearSelection] = useState(null)
    const [bottomYearSelection, setBottomYearSelection] = useState(null)
    //
    const [numberOfCountriesCompared, setNumberOfCountriesCompared] = useState(1)
    const [graphData, setGraphData] = useState(null)
    const [country1Data, setCountry1Data] = useState(null)
    const [country2Data, setCountry2Data] = useState(null)
    //
    const [displayMainSearch, setDisplayMainSearch] = useState("block")
    //
    useEffect(() => {
        fetchCountries(setCountries)
        fetchIndicators(setIndicators)
        fetchYears(setYears)
    }, [])

    return (
        <div>
            <div style={{ display: displayMainSearch }}>
                {countries ? (
                    <MainSearchCountrySelection
                        data={countries}
                        decisions={{
                            setCountryOnlySearch: setCountryOnlySearch,
                            countryOnlySearch: countryOnlySearch,
                            twoCountrySearch: twoCountrySearch,
                            setTwoCountrySearch: setTwoCountrySearch,
                        }}
                        selections={{
                            setTopCountrySelection: setTopCountrySelection,
                            setBottomCountrySelection: setBottomCountrySelection,
                        }}
                    />
                ) : null}
                {indicators ? (
                    <MainSearchIndicatorSelection
                        data={indicators}
                        selections={{
                            setIndicatorSelection: setIndicatorSelection,
                        }}
                    />
                ) : null}
                {years && !countryOnlySearch ? (
                    <MainSearchYearSelection
                        data={years}
                        decisions={{
                            yearRangeSearch: yearRangeSearch,
                            setYearRangeSearch: setYearRangeSearch,
                        }}
                        selections={{
                            setTopYearSelection: setTopYearSelection,
                            setBottomYearSelection: setBottomYearSelection,
                        }}
                    />
                ) : null}
                <br />
                <br />
                <br />
                <MainSearchButton
                    decisions={{
                        countryOnlySearch: countryOnlySearch,
                        twoCountrySearch: twoCountrySearch,
                        yearRangeSearch: yearRangeSearch,
                    }}
                    selections={{
                        topCountrySelection: topCountrySelection,
                        bottomCountrySelection: bottomCountrySelection,
                        indicatorSelection: indicatorSelection,
                        topYearSelection: topYearSelection,
                        bottomYearSelection: bottomYearSelection,
                    }}
                    setData={{
                        setGraphData: setGraphData,
                        setNumberOfCountriesCompared: setNumberOfCountriesCompared,
                        setCountry1Data: setCountry1Data,
                        setCountry2Data: setCountry2Data,
                    }}
                    display={{ setDisplayMainSearch: setDisplayMainSearch }}
                />
            </div>
            <div>
                {graphData && numberOfCountriesCompared === 1 ? (
                    <Results data={{ graphData: graphData, setGraphData: setGraphData }} display={{ setDisplayMainSearch: setDisplayMainSearch }} />
                ) : null}
                {country1Data && country2Data && numberOfCountriesCompared === 2 ? (
                    <ResultsTwoCountries
                        data={{
                            country1Data: country1Data,
                            setCountry1Data: setCountry1Data,
                            country2Data: country2Data,
                            setCountry2Data: setCountry2Data,
                        }}
                        display={{ setDisplayMainSearch: setDisplayMainSearch }}
                    />
                ) : (
                    <h2>yo</h2>
                )}
            </div>
        </div>
    )
}

async function fetchCountries(setCountries) {
    const response = await axios.get("http://localhost:8080/distinctCountries")
    const data = await response.data
    setCountries(data)
}

async function fetchIndicators(setIndicators) {
    const response = await axios.get("http://localhost:8080/distinctIndicators")
    const data = await response.data
    setIndicators(data)
}

async function fetchYears(setYears) {
    const response = await axios.get("http://localhost:8080/distinctYears")
    const data = await response.data
    setYears(data)
}

export default MainSearch
