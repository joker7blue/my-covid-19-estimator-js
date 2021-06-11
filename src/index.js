const submitBtn = document.getElementById('submitBtn');
const impactDiv = document.getElementById('impact');
const severeImpactDiv = document.getElementById('sevreImpact');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

submitBtn.addEventListener('click', () => {
  const population = Number(document.getElementById('population').value);
  const timeToElapse = Number(document.getElementById('timeToElapse').value);
  const reportedCases = Number(document.getElementById('reportedCases').value);
  const totalHospitalBeds = Number(document.getElementById('totalHospitalBeds').value);
  const periodType = document.getElementById('periodType').value;

  const toSend = {
    population,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    periodType,
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 4,
      
      avgDailyIncomePopulation: 0.73
    }
  };

  /* const result = covid19ImpactEstimator({
    population,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    periodType,
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 4,
      avgDailyIncomePopulation: 0.73
      https://covid19-estimator-backend.herokuapp.com/api/v1/on-covid-19/json
    }
  }); */
  errorDiv.style.display = 'none';
  impactDiv.textContent = '';
  severeImpactDiv.textContent = '';
  impactDiv.style.display = 'none';
  severeImpactDiv.style.display = 'none';
  loadingDiv.style.display = 'block';
  fetch('https://covid19-estimator-backend.herokuapp.com/api/v1/on-covid-19/json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toSend)
  }).then((response) => response.json()).then((dataResponse) => {
    loadingDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    impactDiv.style.display = 'block';
    severeImpactDiv.style.display = 'block';

    Object.keys(dataResponse.impact).forEach((key) => {
      const element = document.createElement('div');
      const h = document.createElement('h1');
      const k = document.createElement('b');
      const v = document.createElement('div');

      h.textContent = 'Impact';
      k.textContent = `${key}:`;
      v.textContent = dataResponse.impact[key];
      element.appendChild(k).appendChild(v);

      impactDiv.appendChild(element);
    });

    Object.keys(dataResponse.severeImpact).forEach((key) => {
      const element = document.createElement('div');
      const h = document.createElement('h1');
      const k = document.createElement('b');
      const v = document.createElement('div');

      h.textContent = 'Impact';
      k.textContent = `${key}:`;
      v.textContent = dataResponse.severeImpact[key];
      element.appendChild(k).appendChild(v);

      severeImpactDiv.appendChild(element);
    });
  }).catch(() => {
    loadingDiv.style.display = 'none';
    impactDiv.style.display = 'none';
    severeImpactDiv.style.display = 'none';

    /* const b = document.createElement('b');
    b.textContent = ` ====> ${err.message}`;
    document.querySelector('#error span').appendChild(b); */
    errorDiv.style.display = 'block';
  });

  // console.log({ population, timeToElapse, reportedCases, totalHospitalBeds, periodType });
});
