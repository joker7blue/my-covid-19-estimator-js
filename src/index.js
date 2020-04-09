import covid19ImpactEstimator from './estimator';

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', () => {
  const population = Number(document.getElementById('population').value);
  const timeToElapse = Number(document.getElementById('timeToElapse').value);
  const reportedCases = Number(document.getElementById('reportedCases').value);
  const totalHospitalBeds = Number(document.getElementById('totalHospitalBeds').value);
  const periodType = document.getElementById('periodType').value;

  const result = covid19ImpactEstimator({
    population,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    periodType,
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    }
  });

  console.log(result);
  // console.log({ population, timeToElapse, reportedCases, totalHospitalBeds, periodType });
});
