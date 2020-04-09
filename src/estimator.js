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
  const impactCurrentlyInfected = data.reportedCases * 10;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** Math.floor(time / 3));
  const impactSevereCasesByRequestedTime = Math.ceil(impactInfectionsByRequestedTime * 0.15);
  const impactHospitalBedsByRequestedTime = Math.ceil(data.totalHospitalBeds * 0.35)
                                  - impactSevereCasesByRequestedTime;
  const impactCasesForICUByRequestedTime = Math.floor(impactInfectionsByRequestedTime * 0.05);
  const impactCasesForVentilatorsByRequestedTime = Math.floor(
    impactInfectionsByRequestedTime * 0.02
  );
  const impactDollarsInFlight = (impactInfectionsByRequestedTime
              * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / time;

  const impact = {
    currentlyInfected: impactCurrentlyInfected,
    infectionsByRequestedTime: impactInfectionsByRequestedTime,
    severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
    hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
    casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: Math.trunc(impactDollarsInFlight)
  };


  /** Severe Impact computation */
  const severeimpactCurrentlyInfected = data.reportedCases * 50;
  const severeimpactInfectionsByRequestedTime = severeimpactCurrentlyInfected
                                                * (2 ** Math.floor(time / 3));
  const severeimpactSevereCasesByRequestedTime = Math.ceil(
    severeimpactInfectionsByRequestedTime * 0.15
  );
  const severeImpactHospitalBedsByRequestedTime = Math.ceil(data.totalHospitalBeds * 0.35)
                                        - severeimpactSevereCasesByRequestedTime;
  const severeimpactCasesForICUByRequestedTime = Math.floor(
    severeimpactInfectionsByRequestedTime * 0.05
  );
  const severeimpactCasesForVentilatorsByRequestedTime = Math.floor(
    severeimpactInfectionsByRequestedTime * 0.02
  );
  const severeimpactDollarsInFlight = (severeimpactInfectionsByRequestedTime
                  * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD) / time;

  const severeImpact = {
    currentlyInfected: severeimpactCurrentlyInfected,
    infectionsByRequestedTime: severeimpactInfectionsByRequestedTime,
    severeCasesByRequestedTime: severeimpactSevereCasesByRequestedTime,
    hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime,
    casesForICUByRequestedTime: severeimpactCasesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime: severeimpactCasesForVentilatorsByRequestedTime,
    dollarsInFlight: Math.trunc(severeimpactDollarsInFlight)
  };

  /** Object returned */
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
