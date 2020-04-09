const normalizePeriod = (period, timeToElapse) => {
  let nbreDays = null;

  switch (period) {
    case 'days':
      nbreDays = timeToElapse;
      break;
    case 'weeks':
      nbreDays = 7 * timeToElapse;
      break;
    case 'months':
      nbreDays = 30 * timeToElapse;
      break;
    default:
      break;
  }

  return nbreDays;
};


const covid19ImpactEstimator = (data) => {
  /** Normaliezd request time */
  const time = normalizePeriod(data.periodType, data.timeToElapse);

  /** Impact computation */
  const impactCurrentlyInfected = Math.floor(data.reportedCases * 10);
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.floor(time / 3));
  const impactSevereCasesByRequestedTime = Math.floor(impactInfectionsByRequestedTime * 0.15);
  const impactHospitalBedsByRequestedTime = Math.floor((data.totalHospitalBeds * 0.35)
                                  - impactSevereCasesByRequestedTime);
  const impactCasesForICUByRequestedTime = Math.floor(impactInfectionsByRequestedTime * 0.05);
  const impactCasesForVentilatorsByRequestedTime = Math.floor(
    impactInfectionsByRequestedTime * 0.02
  );
  const impactDollarsInFlight = impactInfectionsByRequestedTime
              * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * time;

  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
    hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
    casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: impactDollarsInFlight.toFixed(2)
  };


  /** Severe Impact computation */
  const severeimpactCurrentlyInfected = Math.floor(data.reportedCases * 50);
  const severeimpactInfectionsByRequestedTime = severeimpactCurrentlyInfected
                                                * (2 ** Math.floor(time / 3));
  const severeimpactSevereCasesByRequestedTime = Math.floor(
    severeimpactInfectionsByRequestedTime * 0.15
  );
  const severeImpactHospitalBedsByRequestedTime = Math.floor((data.totalHospitalBeds * 0.35)
                                        - severeimpactSevereCasesByRequestedTime);
  const severeimpactCasesForICUByRequestedTime = Math.floor(
    severeimpactInfectionsByRequestedTime * 0.05
  );
  const severeimpactCasesForVentilatorsByRequestedTime = Math.floor(
    severeimpactInfectionsByRequestedTime * 0.02
  );
  const severeimpactDollarsInFlight = severeimpactInfectionsByRequestedTime
                    * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * time;

  const severeImpact = {
    currentlyInfected: severeimpactCurrentlyInfected,
    infectionsByRequestedTime: severeimpactInfectionsByRequestedTime,
    severeCasesByRequestedTime: severeimpactSevereCasesByRequestedTime,
    hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime,
    casesForICUByRequestedTime: severeimpactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: severeimpactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: severeimpactDollarsInFlight.toFixed(2)
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
