const normalizePeriod = (period, timeToElapse) => {
  switch (period) {
    case 'days':
      return timeToElapse;

    case 'weeks':
      return (7 * timeToElapse);

    case 'months':
      return (30 * timeToElapse);

    default:
      break;
  }
};


const covid19ImpactEstimator = (data) => {

  /** Normaliezd request time */
  const time = normalizePeriod(data.periodType, data.timeToElapse);
  console.log(time)

  /** Impact computation */
  const impact_currentlyInfected = data.reportedCases * 10;
  const impact_infectionsByRequestedTime = impact_currentlyInfected * (2 ** Math.floor(time / 3));
  const impact_severeCasesByRequestedTime = Math.ceil(impact_infectionsByRequestedTime * 0.15);
  const impact_totalHospitalBeds = Math.ceil(data.totalHospitalBeds * 0.65) - impact_severeCasesByRequestedTime;
  const impact_casesForICUByRequestedTime = Math.ceil(impact_infectionsByRequestedTime * 0.05);
  const impact_casesForVentilatorsByRequestedTime = Math.ceil(impact_infectionsByRequestedTime * 0.02);
  const impact_dollarsInFlight = impact_infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * time;

  const impact = {
    currentlyInfected: impact_currentlyInfected,
    infectionsByRequestedTime: impact_infectionsByRequestedTime,
    severeCasesByRequestedTime: impact_severeCasesByRequestedTime,
    totalHospitalBeds: impact_totalHospitalBeds,
    casesForICUByRequestedTime: impact_casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impact_casesForVentilatorsByRequestedTime,
    dollarsInFlight: impact_dollarsInFlight
  };


  /** Severe Impact computation */
  const severeImpact_currentlyInfected = data.reportedCases * 50;
  const severeImpact_infectionsByRequestedTime = severeImpact_currentlyInfected * (2 ** Math.floor(time / 3));
  const severeImpact_severeCasesByRequestedTime = Math.ceil(severeImpact_infectionsByRequestedTime * 0.15);
  const severeImpact_totalHospitalBeds = Math.ceil((data.totalHospitalBeds * 0.65)) - severeImpact_severeCasesByRequestedTime;
  const severeImpact_casesForICUByRequestedTime = Math.ceil(severeImpact_infectionsByRequestedTime * 0.05);
  const severeImpact_casesForVentilatorsByRequestedTime = Math.ceil(severeImpact_infectionsByRequestedTime * 0.02);
  const severeImpact_dollarsInFlight = severeImpact_infectionsByRequestedTime * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * time;

  const severeImpact = {
    currentlyInfected: severeImpact_currentlyInfected,
    infectionsByRequestedTime: severeImpact_infectionsByRequestedTime,
    severeCasesByRequestedTime: severeImpact_severeCasesByRequestedTime,
    totalHospitalBeds: severeImpact_totalHospitalBeds,
    casesForICUByRequestedTime: severeImpact_casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: severeImpact_casesForVentilatorsByRequestedTime,
    dollarsInFlight: severeImpact_dollarsInFlight
  };

  /** Object returned */
  return {
    data,
    impact,
    severeImpact
  };
};

const TestData = {
    region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
        },
    periodType: "days",
    timeToElapse: 58,
    reportedCases: 674,
    population: 66622705,
    totalHospitalBeds: 1380614
    }

console.log(covid19ImpactEstimator(TestData))
//export default covid19ImpactEstimator;
