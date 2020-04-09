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

  return null;
};


const covid19ImpactEstimator = (data) => {
  /** Normaliezd request time */
  const time = normalizePeriod(data.periodType, data.timeToElapse);

  /** Impact computation */
  const impactCurrentlyInfected = data.reportedCases * 10;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.floor(time / 3));
  const impactSevereCasesByRequestedTime = Math.ceil(impactInfectionsByRequestedTime * 0.15);
  const impactTotalHospitalBeds = Math.ceil(data.totalHospitalBeds * 0.65)
                                  - impactSevereCasesByRequestedTime;
  const impactCasesForICUByRequestedTime = Math.ceil(impactInfectionsByRequestedTime * 0.05);
  const impactCasesForVentilatorsByRequestedTime = Math.ceil(
    impactInfectionsByRequestedTime * 0.02
  );
  const impactDollarsInFlight = impactInfectionsByRequestedTime
              * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * time;

  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
    totalHospitalBeds: impactTotalHospitalBeds,
    casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: impactDollarsInFlight
  };


  /** Severe Impact computation */
  const severeimpactCurrentlyInfected = data.reportedCases * 50;
  const severeimpactInfectionsByRequestedTime = severeimpactCurrentlyInfected
                                                * (2 ** Math.floor(time / 3));
  const severeimpactSevereCasesByRequestedTime = Math.ceil(
    severeimpactInfectionsByRequestedTime * 0.15
  );
  const severeimpactTotalHospitalBeds = Math.ceil((data.totalHospitalBeds * 0.65))
                                        - severeimpactSevereCasesByRequestedTime;
  const severeimpactCasesForICUByRequestedTime = Math.ceil(
    severeimpactInfectionsByRequestedTime * 0.05
  );
  const severeimpactCasesForVentilatorsByRequestedTime = Math.ceil(
    severeimpactInfectionsByRequestedTime * 0.02
  );
  const severeimpactDollarsInFlight = severeimpactInfectionsByRequestedTime
                    * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * time;

  const severeImpact = {
    currentlyInfected: severeimpactCurrentlyInfected,
    infectionsByRequestedTime: severeimpactInfectionsByRequestedTime,
    severeCasesByRequestedTime: severeimpactSevereCasesByRequestedTime,
    totalHospitalBeds: severeimpactTotalHospitalBeds,
    casesForICUByRequestedTime: severeimpactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: severeimpactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: severeimpactDollarsInFlight
  };

  /** Object returned */
  return {
    data,
    impact,
    severeImpact
  };
};

/* const TestData = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
}; */

export default covid19ImpactEstimator;
