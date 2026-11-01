const jwt = require('jsonwebtoken');

const secret = 'ByoAQIGvJmX3yggydK0hqIaYtUCOH1vzE17C5rIkCxTAKdICJrKdsqAZTzudsXlHu1H8V5kRgSJSfTzLbBdBAZ';
const token = jwt.sign({ id: '66324d081a95e74e6fcf2288' }, secret, { expiresIn: 604800 });

async function testEndpoint(name, path) {
  try {
    const res = await fetch(`http://localhost:4000/api/v1${path}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const status = res.status;
    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      data = '(Non-JSON)';
    }
    const isSuccess = status >= 200 && status < 300;
    console.log(`${isSuccess ? '✓' : '✗'} [${status}] ${name.padEnd(25)} -> ${path}`);
    if (!isSuccess) {
      console.log('   Error payload:', JSON.stringify(data));
    }
    return { name, path, status, ok: isSuccess };
  } catch (err) {
    console.log(`✗ [ERR] ${name.padEnd(25)} -> ${err.message}`);
    return { name, path, status: 0, ok: false };
  }
}

async function run() {
  console.log('=== TESTING ALL LIVE API ENDPOINTS ===\n');
  await testEndpoint('Auth Me', '/auth/me');
  await testEndpoint('Dashboard', '/dashboard');
  await testEndpoint('Career Dashboard', '/career/dashboard');
  await testEndpoint('Interview Readiness', '/interview/readiness');
  await testEndpoint('Adaptive Queue', '/interview/adaptive-queue');
  await testEndpoint('Study Plan Today', '/study-plan/today');
  await testEndpoint('Progress Intelligence', '/progress/intelligence');
  await testEndpoint('Contributions', '/contributions');
  await testEndpoint('Practice Problems', '/practice/problems');
  await testEndpoint('Practice Patterns', '/practice/patterns');
  await testEndpoint('Assessments', '/assessments');
  await testEndpoint('Curriculum Roadmap', '/curriculum/roadmap');
  await testEndpoint('Curriculum Topics', '/curriculum/topics');
  await testEndpoint('Curriculum Resources', '/curriculum/resources');
  await testEndpoint('Mentor Context', '/mentor/context');
}

run();
