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

  return Math.trunc(nbreDays);
};


const covid19ImpactEstimator = (data) => {
  /** Normaliezd request time */
  const time = normalizePeriod(data.periodType, data.timeToElapse);

  /** Impact computation */
  const impactCurrentlyInfected = Math.trunc(data.reportedCases * 10);
  const impactInfectionsByRequestedTime = Math.trunc(impactCurrentlyInfected
                                         * (2 ** Math.trunc(time / 3)));
  const impactSevereCasesByRequestedTime = Math.trunc(impactInfectionsByRequestedTime * 0.15);
  const impactHospitalBedsByRequestedTime = Math.trunc((data.totalHospitalBeds * 0.35)
                                  - (impactInfectionsByRequestedTime * 0.15));
  const impactCasesForICUByRequestedTime = Math.trunc(impactInfectionsByRequestedTime * 0.05);
  const impactCasesForVentilatorsByRequestedTime = Math.trunc(
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
  const severeimpactCurrentlyInfected = Math.trunc(data.reportedCases * 50);
  const severeimpactInfectionsByRequestedTime = Math.trunc(severeimpactCurrentlyInfected
                                                * (2 ** Math.trunc(time / 3)));
  const severeimpactSevereCasesByRequestedTime = Math.trunc(
    severeimpactInfectionsByRequestedTime * 0.15
  );
  const severeImpactHospitalBedsByRequestedTime = Math.trunc((data.totalHospitalBeds * 0.35)
                                        - (severeimpactInfectionsByRequestedTime * 0.15));
  const severeimpactCasesForICUByRequestedTime = Math.trunc(
    severeimpactInfectionsByRequestedTime * 0.05
  );
  const severeimpactCasesForVentilatorsByRequestedTime = Math.trunc(
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
